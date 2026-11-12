import { getRepository } from '../repositories/index.js';
import ApiError from '../utils/ApiError.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { signToken } from '../utils/token.js';

const MIN_PASSWORD_LENGTH = 10;
const store = () => getRepository('admin');

const publicProfile = (admin) => ({ id: admin._id, username: admin.username, createdAt: admin.createdAt });

const checkUsername = (value) => {
  const username = String(value || '').trim().toLowerCase();
  if (!/^[a-z0-9._-]{3,40}$/.test(username)) {
    throw ApiError.unprocessable('Please fix the highlighted fields', [
      'Username must be 3–40 characters: letters, numbers, dot, dash or underscore',
    ]);
  }
  return username;
};

const checkPassword = (value) => {
  const password = String(value || '');
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw ApiError.unprocessable('Please fix the highlighted fields', [
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    ]);
  }
  return password;
};

/** True until the first admin account has been created. */
export const needsSetup = async () => (await store().count()) === 0;

/** Creates the very first admin. Refused once any account exists. */
export const setup = async ({ username, password }) => {
  if (!(await needsSetup())) throw ApiError.forbidden('An admin account already exists');
  const admin = await store().create({
    username: checkUsername(username),
    passwordHash: hashPassword(checkPassword(password)),
  });
  return { token: signToken(admin), admin: publicProfile(admin) };
};

export const login = async ({ username, password }) => {
  const admin = await store().findOne({ username: String(username || '').trim().toLowerCase() });
  // Same message for an unknown user and a wrong password, so neither can be probed.
  if (!admin || !verifyPassword(String(password || ''), admin.passwordHash)) {
    throw ApiError.unauthorized('Incorrect username or password');
  }
  return { token: signToken(admin), admin: publicProfile(admin) };
};

export const getProfile = async (id) => {
  const admin = await store().findById(id);
  if (!admin) throw ApiError.unauthorized('Account no longer exists');
  return publicProfile(admin);
};

export const changePassword = async (id, { currentPassword, newPassword }) => {
  const admin = await store().findById(id);
  if (!admin) throw ApiError.unauthorized('Account no longer exists');
  if (!verifyPassword(String(currentPassword || ''), admin.passwordHash)) {
    throw ApiError.badRequest('Current password is incorrect');
  }
  await store().updateById(id, { passwordHash: hashPassword(checkPassword(newPassword)) });
};
