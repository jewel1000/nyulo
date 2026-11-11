/**
 * Deploys Nyulo Interior to Namecheap cPanel over SFTP/SSH.
 *
 *   cd deploy && npm install ssh2
 *   CP_PASS='...' node deploy.mjs            # frontend + backend + restart
 *   CP_PASS='...' node deploy.mjs frontend   # frontend only
 *   CP_PASS='...' node deploy.mjs backend    # backend only (runs npm install)
 *
 * Build the frontend first:  cd ../FrontEnd && npm run build
 *
 * Note: the site is served straight from these uploads — no zip step, because
 * PowerShell's Compress-Archive writes backslash path separators that Linux
 * `unzip` cannot read.
 */
import { Client } from 'ssh2';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, posix, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = '162.0.235.139';
const PORT = 21098;
const USER = 'nyuldgvn';
const HOME = '/home/nyuldgvn';
const APP_ROOT = 'nyulo-api';
const WEB_DIR = `${HOME}/public_html`;
const API_DIR = `${HOME}/${APP_ROOT}`;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = process.argv[2] || 'all';
const password = process.env.CP_PASS;
if (!password) {
  console.error('Set CP_PASS to the cPanel password.');
  process.exit(1);
}

const walk = (dir, rel = '') =>
  readdirSync(dir).flatMap((name) => {
    const abs = join(dir, name);
    const relPath = rel ? posix.join(rel, name) : name;
    return statSync(abs).isDirectory()
      ? [{ dir: true, abs, relPath }, ...walk(abs, relPath)]
      : [{ dir: false, abs, relPath }];
  });

const connect = () =>
  new Promise((resolve, reject) => {
    const conn = new Client();
    conn.on('ready', () => resolve(conn));
    conn.on('error', reject);
    conn.connect({ host: HOST, port: PORT, username: USER, password, readyTimeout: 25000 });
  });

const sftpOf = (conn) =>
  new Promise((res, rej) => conn.sftp((e, s) => (e ? rej(e) : res(s))));

const exec = (conn, cmd) =>
  new Promise((resolve, reject) => {
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let out = '';
      stream.on('data', (d) => (out += d));
      stream.stderr.on('data', (d) => (out += d));
      stream.on('close', (code) => (code ? reject(new Error(`exit ${code}: ${out}`)) : resolve(out)));
    });
  });

const uploadDir = async (sftp, localRoot, remoteRoot) => {
  const mkdir = (p) => new Promise((res) => sftp.mkdir(p, () => res()));
  const put = (l, r) => new Promise((res, rej) => sftp.fastPut(l, r, {}, (e) => (e ? rej(e) : res())));
  const entries = walk(localRoot);
  await mkdir(remoteRoot);
  for (const d of entries.filter((e) => e.dir)) await mkdir(posix.join(remoteRoot, d.relPath));
  const files = entries.filter((e) => !e.dir);
  for (const f of files) await put(f.abs, posix.join(remoteRoot, f.relPath));
  return files.length;
};

const putFile = (sftp, local, remote) =>
  new Promise((res, rej) => sftp.fastPut(local, remote, {}, (e) => (e ? rej(e) : res())));

const main = async () => {
  const conn = await connect();
  const sftp = await sftpOf(conn);
  console.log(`connected: ${USER}@${HOST}`);

  if (target === 'all' || target === 'frontend') {
    const dist = join(ROOT, 'FrontEnd', 'dist');
    if (!existsSync(dist)) throw new Error('FrontEnd/dist missing — run `npm run build` first');
    const n = await uploadDir(sftp, dist, WEB_DIR);
    console.log(`frontend: ${n} files -> ${WEB_DIR}`);
  }

  if (target === 'all' || target === 'backend') {
    const n = await uploadDir(sftp, join(ROOT, 'BackEnd', 'src'), `${API_DIR}/src`);
    await putFile(sftp, join(ROOT, 'BackEnd', 'package.json'), `${API_DIR}/package.json`);
    await putFile(sftp, join(ROOT, 'BackEnd', 'package-lock.json'), `${API_DIR}/package-lock.json`);
    console.log(`backend: ${n} source files -> ${API_DIR}`);

    // --skip-web-check: the selector's before/after content-type comparison
    // always "fails" here, because the API correctly returns JSON.
    await exec(
      conn,
      `cloudlinux-selector install-modules --json --interpreter nodejs --app-root ${APP_ROOT} --skip-web-check 2>&1 | head -c 400`
    ).then((o) => console.log('npm install:', o.trim()));
  }

  await exec(
    conn,
    `cloudlinux-selector restart --json --interpreter nodejs --app-root ${APP_ROOT} 2>&1 | head -c 300`
  ).then((o) => console.log('restart:', o.trim()));

  conn.end();
};

main().catch((e) => {
  console.error('DEPLOY FAILED:', e.message);
  process.exit(1);
});
