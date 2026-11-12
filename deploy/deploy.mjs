/**
 * Deploys Nyulo Interior to Namecheap cPanel over SFTP/SSH.
 *
 *   cd deploy && npm install
 *   CP_PASS='...' node deploy.mjs              # everything
 *   CP_PASS='...' node deploy.mjs frontend     # public site        -> public_html
 *   CP_PASS='...' node deploy.mjs backend      # public API         -> ~/nyulo-api
 *   CP_PASS='...' node deploy.mjs admin        # admin panel        -> public_html/admin
 *   CP_PASS='...' node deploy.mjs admin-api    # admin API          -> ~/nyulo-admin-api
 *
 * Several targets can be given at once. Build the React apps first
 * (`npm run build` in FrontEnd and AdminFrontEnd).
 *
 * Files are uploaded one by one — no zip step, because PowerShell's
 * Compress-Archive writes backslash path separators that Linux `unzip`
 * cannot read.
 */
import { Client } from 'ssh2';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, posix, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = '162.0.235.139';
const PORT = 21098;
const USER = 'nyuldgvn';
const HOME = '/home/nyuldgvn';
const WEB_DIR = `${HOME}/public_html`;

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Static sites: a built `dist` folder copied into the web root. */
const SITES = {
  frontend: { dist: join(ROOT, 'FrontEnd', 'dist'), remote: WEB_DIR },
  admin: { dist: join(ROOT, 'AdminFrontEnd', 'dist'), remote: `${WEB_DIR}/admin` },
};

/** Node.js apps managed by the CloudLinux selector. */
const APIS = {
  backend: { local: join(ROOT, 'BackEnd'), appRoot: 'nyulo-api' },
  'admin-api': { local: join(ROOT, 'AdminBackEnd'), appRoot: 'nyulo-admin-api' },
};

const ALL = [...Object.keys(SITES), ...Object.keys(APIS)];
const requested = process.argv.slice(2);
const targets = requested.length === 0 || requested.includes('all') ? ALL : requested;
const unknown = targets.filter((t) => !ALL.includes(t));
if (unknown.length) {
  console.error(`Unknown target(s): ${unknown.join(', ')}. Use: ${ALL.join(', ')}`);
  process.exit(1);
}

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

const sftpOf = (conn) => new Promise((res, rej) => conn.sftp((e, s) => (e ? rej(e) : res(s))));

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

const selector = (conn, action, appRoot, extra = '') =>
  exec(
    conn,
    `cloudlinux-selector ${action} --json --interpreter nodejs --app-root ${appRoot} ${extra} 2>&1 | head -c 400`
  ).then((out) => out.trim());

const main = async () => {
  const conn = await connect();
  const sftp = await sftpOf(conn);
  console.log(`connected: ${USER}@${HOST}`);

  for (const target of targets) {
    if (SITES[target]) {
      const { dist, remote } = SITES[target];
      if (!existsSync(dist)) throw new Error(`${dist} missing — run \`npm run build\` first`);
      const n = await uploadDir(sftp, dist, remote);
      console.log(`${target}: ${n} files -> ${remote}`);
      continue;
    }

    const { local, appRoot } = APIS[target];
    const remote = `${HOME}/${appRoot}`;
    await new Promise((res) => sftp.mkdir(remote, () => res())); // first deploy: the app folder may not exist yet
    const n = await uploadDir(sftp, join(local, 'src'), `${remote}/src`);
    await putFile(sftp, join(local, 'package.json'), `${remote}/package.json`);
    await putFile(sftp, join(local, 'package-lock.json'), `${remote}/package-lock.json`);
    console.log(`${target}: ${n} source files -> ${remote}`);

    // --skip-web-check: the selector's before/after content-type comparison
    // always "fails" here, because the API correctly returns JSON.
    console.log(`${target}: npm install ->`, await selector(conn, 'install-modules', appRoot, '--skip-web-check'));
    console.log(`${target}: restart ->`, await selector(conn, 'restart', appRoot));
  }

  conn.end();
};

main().catch((e) => {
  console.error('DEPLOY FAILED:', e.message);
  process.exit(1);
});
