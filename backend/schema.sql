-- =====================================================
-- ระบบตรวจสอบสถิติการมาเรียน : โครงสร้างฐานข้อมูล (SQLite)
-- ห้องเรียน 1 ห้อง / ครู 1 คน
-- =====================================================

PRAGMA foreign_keys = ON;

-- ผู้ใช้งาน (ครู) : ล็อกอินด้วย "เลขประจำตัวผู้ใช้"
CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  login_id      TEXT    NOT NULL UNIQUE,      -- เลขประจำตัวผู้ใช้
  display_name  TEXT    NOT NULL,
  password_hash TEXT    NOT NULL,             -- เก็บค่าที่เข้ารหัสแล้วเท่านั้น ห้ามเก็บรหัสจริง
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- นักเรียนในห้อง
CREATE TABLE IF NOT EXISTS students (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  student_code  TEXT    NOT NULL UNIQUE,      -- รหัสนักเรียน
  roll_no       INTEGER NOT NULL UNIQUE,      -- เลขที่
  full_name     TEXT    NOT NULL,             -- คำนำหน้า ชื่อ นามสกุล
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ภาคเรียน (ใช้คิดเปอร์เซ็นต์รายเทอมและรวม)
CREATE TABLE IF NOT EXISTS terms (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,             -- เช่น เทอม 1, เทอม 2
  start_date    TEXT    NOT NULL,             -- YYYY-MM-DD
  end_date      TEXT    NOT NULL,             -- YYYY-MM-DD
  CHECK (end_date >= start_date)
);

-- การมาเรียนรายวันของนักเรียนแต่ละคน (1 คน 1 แถวต่อวัน)
-- เก็บสถานะเป็นรหัสอังกฤษ ส่วนหน้าเว็บแปลงเป็นคำไทยเอง
--   present = มา, late = สาย, leave = ลา, absent = ขาด
CREATE TABLE IF NOT EXISTS attendance (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id  INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  date        TEXT    NOT NULL,               -- YYYY-MM-DD
  status      TEXT    NOT NULL CHECK (status IN ('present','late','leave','absent')),
  note        TEXT,
  created_by  INTEGER NOT NULL REFERENCES users(id),
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_by  INTEGER REFERENCES users(id),
  updated_at  TEXT,
  UNIQUE (student_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_date    ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);

-- บันทึกว่าแต่ละวันครูกดบันทึกเมื่อไหร่ และทันเวลาหรือไม่
-- ใช้แสดง "เช็คชื่อแล้วก่อนเวลา 08.30 น." บนหน้าหลัก
CREATE TABLE IF NOT EXISTS attendance_days (
  date          TEXT    PRIMARY KEY,          -- YYYY-MM-DD
  submitted_at  TEXT    NOT NULL,
  submitted_by  INTEGER NOT NULL REFERENCES users(id),
  on_time       INTEGER NOT NULL CHECK (on_time IN (0,1))
);

-- ค่าตั้งค่าระบบ (ปรับได้โดยไม่ต้องแก้โค้ด)
CREATE TABLE IF NOT EXISTS settings (
  key    TEXT PRIMARY KEY,
  value  TEXT NOT NULL
);
