// create-user.js : สร้างบัญชีครู
// วิธีใช้:  node create-user.js เลขประจำตัว "ชื่อที่แสดง" รหัสผ่าน
const db = require('./db');
const { hashPassword } = require('./auth');

const [loginId, name, password] = process.argv.slice(2);

if (!loginId || !name || !password) {
  console.log('วิธีใช้: node create-user.js เลขประจำตัว "ชื่อที่แสดง" รหัสผ่าน');
  process.exit(1);
}

try {
  db.prepare('INSERT INTO users (login_id, display_name, password_hash) VALUES (?, ?, ?)')
    .run(loginId, name, hashPassword(password));
  console.log('สร้างบัญชีเรียบร้อยแล้ว');
} catch (e) {
  console.log('สร้างไม่สำเร็จ (เลขประจำตัวนี้อาจมีอยู่แล้ว)');
}