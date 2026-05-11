const mysql = require('mysql2');
const readline = require('readline');

// 1. Koneksi ke MariaDB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Sesuaikan user MariaDB kamu
    password: '12345',      // Masukkan password MariaDB kamu
    database: 'portfolio_db'
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let counter = 0;

console.log("=== TERMINAL TO DATABASE CONNECTOR ===");

function inputData() {
    rl.question('\nMasukkan Nama: ', (nama) => {
        rl.question('Masukkan Pesan: ', (pesan) => {
            
            // 2. Query SQL untuk simpan data
            const sql = "INSERT INTO messages (nama, pesan) VALUES (?, ?)";
            
            db.query(sql, [nama, pesan], (err, result) => {
                if (err) {
                    console.log("❌ Gagal simpan ke database: " + err.message);
                } else {
                    counter++;
                    console.log(`✅ SUKSES! Data ke-${counter} tersimpan di MariaDB (ID: ${result.insertId})`);
                }

                rl.question('Mau input lagi? (y/n): ', (ans) => {
                    if (ans.toLowerCase() === 'y') {
                        inputData();
                    } else {
                        console.log(`\nTotal sesi ini: ${counter} data tersimpan.`);
                        db.end(); // Tutup koneksi database
                        rl.close();
                    }
                });
            });
        });
    });
}

// Cek koneksi dulu sebelum mulai
db.connect(err => {
    if (err) return console.log("Gagal konek database! Pastikan MariaDB nyala.");
    inputData();
});