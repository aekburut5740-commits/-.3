const students = window.students;

const graph1 = document.getElementById('graph1');
const graph2 = document.getElementById('graph2');

/*เปลี่ยนสถานะนักเรียนเป็นจำนวน*/

let stu_all = students.length

let stu_miss = students.filter(function (students) {
    return students.status === 'miss'
}).length
let stu_leave = students.filter(function (students) {
    return students.status === 'leave'
}).length
let stu_late = students.filter(function (students) {
    return students.status === 'late'
}).length
let stu_come = students.filter(function (students) {
    return students.status === 'come'
}).length

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

const statusMap = {
  "1": "come",
  "2": "late",
  "3": "leave",
  "4": "miss"
};

const status_option = document.getElementById("status-option");
const stu_status_list = document.getElementById("stu-status-list");

function renderByStatus(selectedValue) {
  const targetStatus = statusMap[selectedValue];
  if (!targetStatus) return;

  const matched = students.filter((student) => student.status === targetStatus);

  stu_status_list.innerHTML = "";

  matched.forEach((student) => {
    const li = document.createElement("li");
    li.textContent = student.name;
    stu_status_list.appendChild(li);
  });
}

renderByStatus(status_option.value);

status_option.addEventListener("change", () => {
  renderByStatus(status_option.value);
});