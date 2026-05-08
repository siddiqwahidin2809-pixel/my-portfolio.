const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Kosongkan jika MariaDB kamu tidak pakai password
    database: 'nama_database_kamu', // GANTI dengan nama database kamu
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Bagian ini sangat penting: Jangan pakai .promise() 
// supaya cocok dengan cara callback di app.js
module.exports = pool;