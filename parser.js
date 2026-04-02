function parseCSV(data) {
    return data.trim().split("\n").map(row => row.split(","));
}