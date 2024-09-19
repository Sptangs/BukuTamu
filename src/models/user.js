const db = require("./db");
const bcrypt = require("bcryptjs");

const createUserTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nama VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            password VARCHAR(255)  -- Increased size for hashed passwords
        );
    `;
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error creating user table:", err.stack);
            return;
        }
        console.log("User table created successfully.");
    });
};

const updateUser = (id, nama, email, password, callback) => {
    const q = "UPDATE users SET nama=?, email=?, password=? WHERE id = ?";
    db.query(q, [nama, email, password, id], callback);
};

const insertUser = (nama, email, password, callback) => {
    if (password) {
        const hashedPass = bcrypt.hashSync(password, 10);
        const query = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";
        db.query(query, [nama, email, hashedPass], (err, result) => {
            if (err) {
                console.error("Error inserting user:", err.stack);
                return callback(err);
            }
            callback(null, result);
        });
    } else {
        const err = new Error("Password is undefined");
        console.error(err.message);
        callback(err);
    }
};

const selectUserByEmail = (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error selecting user by email:", err.stack);
            return callback(err);
        }
        callback(null, results);
    });
};

const selectUserById = (id, callback) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error selecting user by ID:", err.stack);
            return callback(err);
        }
        callback(null, results);
    });
};

const deleteUser = (id, callback) => {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err.stack);
            return callback(err);
        }
        callback(null, result);
    });
};

const selectUsers = (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error selecting users:", err.stack);
            return callback(err);
        }
        callback(null, results);
    });
};

module.exports = {
    createUserTable,
    selectUserByEmail,
    selectUserById,
    selectUsers,
    insertUser,
    deleteUser,
    updateUser
};
