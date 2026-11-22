// server.js : ตัวเซิร์ฟเวอร์หลังบ้าน
const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json()); // ให้เซิร์ฟเวอร์อ่านข้อมูลแบบ JSON ที่หน้าเว็บส่งมาได้

// ทดสอบว่าเซิร์ฟเวอร์ทำงานอยู่
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// ดึงรายชื่อนักเรียนทั้งหมดจากฐานข้อมูล
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
