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
})