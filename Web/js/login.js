/*
let id = document.getElementById('id')
let password = document.getElementById('password')
let warning = document.getElementById('warning')
let login = document.getElementById('login')

function showwarning() {
    warning.innerHTML = 'โปรดใส่รหัสประจำตัวหรือรหัสผ่านให้ถูกต้อง'
}

login.addEventListener('click', function() {
    if (id.value === '1234' && password.value === '1234') {
        window.location.href = 'page/home.html'
    }
    else {
        showwarning()
    }
})*/
let id = document.getElementById('id')
let password = document.getElementById('password')
let warning = document.getElementById('warning')
let login = document.getElementById('login')

// ที่อยู่ของหลังบ้าน (เซิร์ฟเวอร์ที่รัน node server.js)
const API = 'http://localhost:3000'

function showwarning(message) {
    warning.innerHTML = message
}

login.addEventListener('click', async function () {
    try {
        // ส่งเลขประจำตัวกับรหัสผ่านไปให้หลังบ้านตรวจ
        const res = await fetch(API + '/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login_id: id.value, password: password.value })
        })
        const data = await res.json()

        if (res.ok) {
            // ล็อกอินสำเร็จ: เก็บบัตรผ่านไว้ใช้ในหน้าอื่น แล้วไปหน้าหลัก
            localStorage.setItem('token', data.token)
            localStorage.setItem('user_name', data.user.display_name)
            window.location.href = 'page/home.html'
        } else {
            // หลังบ้านปฏิเสธ: แสดงข้อความที่หลังบ้านส่งมา
            showwarning(data.error)
        }
    } catch (e) {
        showwarning('เชื่อมต่อหลังบ้านไม่ได้ ตรวจสอบว่าเปิดเซิร์ฟเวอร์อยู่')
    }
})