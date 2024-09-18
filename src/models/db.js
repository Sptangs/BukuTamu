const db = require('mysql2');
const koneksi = db.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bukutamu_db",
});

koneksi.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.stack);
        return;
    }
    console.log("Berhasil Konek Ke Database");
});

module.exports = koneksi;
