let logout = document.getElementById('logout')
let boxnone = document.getElementById('logout-box-none')
let logoutbox = document.getElementById('logout-box')
let optionno = document.getElementById('option-no')
let optionyes = document.getElementById('option-yes')
let boxshadow = document.getElementById('box-shadow')
let closebox = document.getElementById('close-box')

optionyes.addEventListener('click', function() {
    window.location.href='../login.html'
})

optionno.addEventListener('click', function() {
    boxshadow.style.display = 'none'
    logoutbox.style.display = 'none'
})

logout.addEventListener('click', function() {
    boxshadow.style.display = 'flex'
    logoutbox.style.display = 'flex'
})

closebox.addEventListener('click', function() {
    boxshadow.style.display = 'none'
    logoutbox.style.display = 'none'
})

boxshadow.addEventListener('click', function() {
    boxshadow.style.display = 'none'
    logoutbox.style.display = 'none'
})