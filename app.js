function uploadFile() {
    const file = document.getElementById('fileInput').files[0];

    if (!file) {
        alert("Please select a file!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const data = parseCSV(e.target.result);

        localStorage.setItem("csvData", JSON.stringify(data));

        displayTable(data);
    };

    reader.readAsText(file);
}

function displayTable(data) {
    let table = "<table>";

    data.forEach((row, i) => {
        table += "<tr>";
        row.forEach(col => {
            table += i === 0 
                ? `<th>${col}</th>` 
                : `<td>${col}</td>`;
        });
        table += "</tr>";
    });

    table += "</table>";

    document.getElementById("output").innerHTML = table;
}