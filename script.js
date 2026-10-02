let attendanceRecords =
    JSON.parse(localStorage.getItem("attendanceRecords")) || [];

displayRecords();

function addAttendance() {

    let name = document.getElementById("studentName").value;
    let date = document.getElementById("attendanceDate").value;
    let status = document.getElementById("status").value;

    if (name === "" || date === "") {
        alert("Please enter student name and date");
        return;
    }

    let record = {
        name: name,
        date: date,
        status: status
    };

    attendanceRecords.push(record);

    // Save records in browser
    localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(attendanceRecords)
    );

    displayRecords();

    document.getElementById("studentName").value = "";
    document.getElementById("attendanceDate").value = "";

    alert("Attendance added successfully!");
}

function displayRecords() {

    let table = document.getElementById("attendanceTable");

    table.innerHTML = "";

    let present = 0;
    let absent = 0;

    for (let i = 0; i < attendanceRecords.length; i++) {

        let row = table.insertRow();

        row.insertCell(0).innerHTML = attendanceRecords[i].name;
        row.insertCell(1).innerHTML = attendanceRecords[i].date;
        row.insertCell(2).innerHTML = attendanceRecords[i].status;

        row.insertCell(3).innerHTML =
            "<button onclick='deleteRecord(" + i + ")'>Delete</button>";

        if (attendanceRecords[i].status === "Present") {
            present++;
        } else {
            absent++;
        }
    }

    document.getElementById("totalCount").innerHTML =
        attendanceRecords.length;

    document.getElementById("presentCount").innerHTML =
        present;

    document.getElementById("absentCount").innerHTML =
        absent;
}

function deleteRecord(index) {

    attendanceRecords.splice(index, 1);

    localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(attendanceRecords)
    );

    displayRecords();
}