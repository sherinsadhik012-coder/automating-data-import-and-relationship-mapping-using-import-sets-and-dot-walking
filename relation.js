function saveMapping() {
    console.log("Saved");
}
const data = JSON.parse(localStorage.getItem("csvData"));
const mapping = JSON.parse(localStorage.getItem("mapping"));

const deptMap = {
    "IT": "D001",
    "HR": "D002",
    "Finance": "D003"
};

if (!data || !mapping) {
    document.getElementById("result").innerHTML = "No data available. Please complete previous steps.";
} else {

    let result = "<table><tr><th>Name</th><th>Email</th><th>Department</th><th>Dept ID</th></tr>";

    for (let i = 1; i < data.length; i++) {
        let obj = {};

        data[i].forEach((val, idx) => {
            obj[mapping[idx]] = val;
        });

        let deptId = deptMap[obj.department] || "N/A";

        result += `
        <tr>
            <td>${obj.name || ""}</td>
            <td>${obj.email || ""}</td>
            <td>${obj.department || ""}</td>
            <td>${deptId}</td>
        </tr>`;
    }

    result += "</table>";

    document.getElementById("result").innerHTML = result;
}