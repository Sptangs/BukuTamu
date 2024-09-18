const db = require("./db");

// Function to create the table if it doesn't exist
const createBukuTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS bukutamu (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nama_tamu VARCHAR(60),
            no_hp VARCHAR(16),
            jabatan VARCHAR(60),
            unit_kerja VARCHAR(60),
            tujuan VARCHAR(100),
            yang_dituju VARCHAR(100),
            keterangan VARCHAR(100),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            deleted_at DATETIME NULL
        );
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error creating table:", err);
        } else {
            console.log("Table created successfully.");
        }
    });
};

// Function to select all entries
const selectBuku = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM bukutamu";
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Function to insert a new entry
const insertBuku = (nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO bukutamu (nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(query, [nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

// Function to select an entry by ID
const selectBukuById = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM bukutamu WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

// Function to update an entry by ID
const updateBuku = (id, nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE bukutamu SET nama_tamu = ?, no_hp = ?, jabatan = ?, unit_kerja = ?, tujuan = ?, yang_dituju = ?, keterangan = ? WHERE id = ?
        `;
        db.query(query, [nama_tamu, no_hp, jabatan, unit_kerja, tujuan, yang_dituju, keterangan, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const deleteBuku = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM bukutamu WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    createBukuTable,
    insertBuku,
    selectBukuById,
    updateBuku,
    deleteBuku,
    selectBuku
};
