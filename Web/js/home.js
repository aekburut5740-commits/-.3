const graph1 = document.getElementById('graph1');
const graph2 = document.getElementById('graph2');

/*เปลี่ยนสถานะนักเรียนตรงนี้*/

let stu_all = 20
let stu_miss = 1
let stu_leave = 2
let stu_late = 5
let stu_come = 12
let stu_stay = stu_come + stu_late
let stu_away = stu_miss + stu_leave

document.getElementById('stu-all').textContent = stu_all
document.getElementById('stu-miss').textContent = stu_miss
document.getElementById('stu-leave').textContent = stu_leave
document.getElementById('stu-late').textContent = stu_late
document.getElementById('stu-come').textContent = stu_come 

/*กราฟวันนี้*/

new Chart(graph1, {
    type: 'pie',

    data: {
        labels: ['มา', 'สาย', 'ลา', 'ขาด'],

        datasets: [{
            label: 'ประเภทการมาเรียน',
            data: [stu_come, stu_late, stu_leave, stu_miss],
            backgroundColor: [
                '#40cf45',
                '#dacf35',
                '#f36e21',
                '#ff1100'
            ]
        }]
    }
});

new Chart(graph2, {
    type: 'pie',

    data: {
        labels: ['มา', 'ไม่มา'],

        datasets: [{
            label: 'การมาเรียน',
            data: [stu_stay, stu_away],
            backgroundColor: [
                '#459cff',
                '#b4b4b4'
            ]
        }]
    }
});