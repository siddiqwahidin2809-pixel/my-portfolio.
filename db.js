const mysql = require('mysql2'); // BARIS INI WAJIB ADA

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',             // Password sesuai Query OK tadi
    database: 'my_portfolio_db', // Nama database kamu
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
