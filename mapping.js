const data = JSON.parse(localStorage.getItem("csvData"));

const targetFields = ["name", "email", "department"];

if (!data || data.length === 0) {
    document.getElementById("mappingUI").innerHTML = "No data found. Please upload first.";
} else {
    const headers = data[0];

    let html = `
        <table border="1">
        <tr>
            <th>Source Field</th>
            <th>Map To</th>
        </tr>
    `;

    headers.forEach((header, index) => {

        let options = `<option value="">--Select--</option>`;

        targetFields.forEach(field => {
            options += `<option value="${field}">${field}</option>`;
        });

        html += `
            <tr>
                <td>${header}</td>
                <td>
                    <select id="map${index}">
                        ${options}
                    </select>
                </td>
            </tr>
        `;
    });

    html += "</table>";

    document.getElementById("mappingUI").innerHTML = html;
}

// ✅ SAVE FUNCTION (STRICT VALIDATION)
function saveMapping() {

    if (!data) {
        alert("No data available!");
        return;
    }

    const headers = data[0];
    let mapping = {};
    let usedFields = [];

    for (let i = 0; i < headers.length; i++) {

        const value = document.getElementById(`map${i}`).value;

        // ❌ Empty check
        if (!value) {
            alert(`Please select mapping for "${headers[i]}"`);
            return;
        }

        // ❌ Duplicate check
        if (usedFields.includes(value)) {
            alert(`"${value}" is already mapped. Choose different field.`);
            return;
        }

        mapping[i] = value;
        usedFields.push(value);
    }

    localStorage.setItem("mapping", JSON.stringify(mapping));

    alert("✅ Mapping saved successfully!");
}