// auth.js : ระบบล็อกอิน (เข้ารหัสรหัสผ่าน + ออกบัตรผ่านชั่วคราว)
const crypto = require('crypto');
const db = require('./db');

// ---------- เข้ารหัสรหัสผ่าน ----------
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  try {
    const [salt, hash] = stored.split(':');
    const test = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), test);
  } catch (e) {
    return false;
  }
}

// ---------- บัตรผ่าน (token) ----------
const sessions = new Map();               // เก็บบัตรผ่านที่ออกไปแล้ว
const SESSION_MS = 8 * 60 * 60 * 1000;    // อยู่ได้ 8 ชั่วโมง

// ตรวจเลขประจำตัวกับรหัสผ่าน ถูก = ได้บัตรผ่าน / ผิด = null
function login(loginId, password) {
  const user = db
    .prepare('SELECT id, login_id, display_name, password_hash FROM users WHERE login_id = ?')
    .get(loginId);

  if (!user || !verifyPassword(password, user.password_hash)) return null;

  const token = crypto.randomBytes(32).toString('hex');
  const safeUser = { id: user.id, login_id: user.login_id, display_name: user.display_name };
  sessions.set(token, { user: safeUser, expires: Date.now() + SESSION_MS });
  return { token, user: safeUser };
}

function getUserFromToken(token) {
  const s = sessions.get(token);
  if (!s) return null;
  if (s.expires < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return s.user;
}

function logout(token) {
  sessions.delete(token);
}

// ด่านตรวจ: ใส่หน้า API ไหน หน้านั้นจะเข้าได้เฉพาะคนที่ล็อกอินแล้ว
function requireLogin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const user = getUserFromToken(token);
  if (!user) return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบก่อน' });
  req.user = user;
  req.token = token;
  next();
}

module.exports = { hashPassword, verifyPassword, login, logout, getUserFromToken, requireLogin };