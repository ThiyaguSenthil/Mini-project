// Save attendance to localStorage
function saveAttendance(roll, status) {
    let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

    if (!attendance[roll]) {
        attendance[roll] = { present: 0, absent: 0 };
    }

    // Update attendance count
    if (status === "Present") {
        attendance[roll].present++;
    } else {
        attendance[roll].absent++;
    }

    localStorage.setItem("attendance", JSON.stringify(attendance));
    document.getElementById("msg").innerHTML = "Attendance Saved!";
    setTimeout(() => (document.getElementById("msg").innerHTML = ""), 2000);
}

// Generate report page
if (document.getElementById("reportBody")) {
    let attendance = JSON.parse(localStorage.getItem("attendance")) || {};

    let students = [
        { name: "Arun Kumar", roll: "101" },
        { name: "Priya R", roll: "102" },
        { name: "Karthick", roll: "103" }
    ];

    let html = "";

    students.forEach(student => {
        let data = attendance[student.roll] || { present: 0, absent: 0 };
        let total = data.present + data.absent;
        let percent = total === 0 ? 0 : Math.round((data.present / total) * 100);

        html += `
            <tr>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${data.present}</td>
                <td>${data.absent}</td>
                <td>${percent}%</td>
            </tr>
        `;
    });

    document.getElementById("reportBody").innerHTML = html;
}
