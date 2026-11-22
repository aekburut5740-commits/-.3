// db.js : เปิดฐานข้อมูล และสร้างตารางให้อัตโนมัติถ้ายังไม่มี
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite'); // SQLite ที่มากับ Node.js ไม่ต้องติดตั้งเพิ่ม

// ไฟล์ฐานข้อมูลจะถูกสร้างชื่อ attendance.db ในโฟลเดอร์ backend
const db = new DatabaseSync(path.join(__dirname, 'attendance.db'));

// สร้างตาราง (ถ้ามีอยู่แล้วจะไม่ทำซ้ำ)
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

// ถ้าฐานข้อมูลยังว่าง (ยังไม่มีค่าตั้งค่า) ให้ใส่ข้อมูลตัวอย่าง
const { n } = db.prepare('SELECT COUNT(*) AS n FROM settings').get();
if (n === 0) {
  db.exec(fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8'));
  console.log('ใส่ข้อมูลตัวอย่างลงฐานข้อมูลแล้ว');
}

module.exports = db;
