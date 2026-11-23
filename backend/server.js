// server.js : ตัวเซิร์ฟเวอร์หลังบ้าน
const path = require('path');
const express = require('express');
const db = require('./db');
const { login, logout, requireLogin } = require('./auth');

const app = express();
app.use(express.json());

// อนุญาตให้หน้าเว็บที่เปิดจากที่อื่น (เช่น Live Server พอร์ต 5500) เรียกหลังบ้านนี้ได้
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// เปิดหน้าเว็บของเพื่อนผ่านเซิร์ฟเวอร์นี้ได้: http://localhost:3000/Web/login.html
app.use('/Web', express.static(path.join(__dirname, '..', 'Web')));

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// ---------- ล็อกอิน ----------
app.post('/api/login', (req, res) => {
  const { login_id, password } = req.body || {};

  if (!login_id || !password) {
    return res.status(400).json({ error: 'โปรดใส่เลขประจำตัวและรหัสผ่านก่อนเข้าสู่ระบบ' });
  }

  const result = login(String(login_id).trim(), String(password));
  if (!result) {
    return res.status(401).json({ error: 'เลขประจำตัวหรือรหัสผ่านไม่ถูกต้อง' });
  }

  res.json(result);
});

app.get('/api/me', requireLogin, (req, res) => {
  res.json(req.user);
});

app.post('/api/logout', requireLogin, (req, res) => {
  logout(req.token);
  res.json({ ok: true });
});

// ---------- นักเรียน ----------
app.get('/api/students', (req, res) => {
  const rows = db
    .prepare('SELECT id, student_code, roll_no, full_name FROM students ORDER BY roll_no')
    .all();
  res.json(rows);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`เซิร์ฟเวอร์รันที่ http://localhost:${PORT}`);
});