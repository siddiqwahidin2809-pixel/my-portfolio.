const mysql = require('mysql2');

// 1. Setup Koneksi (Sama seperti tes.js)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345', // Kosongkan jika tidak ada password
    database: 'portfolio_db'
});

console.log("=== DAFTAR PESAN DI DATABASE PORTFOLIO ===\n");

// 2. Fungsi untuk Membaca Data
function tampilkanData() {
    const sql = "SELECT * FROM messages";

    db.query(sql, (err, results) => {
        if (err) {
            console.log("❌ Gagal mengambil data: " + err.message);
            return;
        }

        // 3. Looping untuk menampilkan data satu per satu
        if (results.length === 0) {
            console.log("Database masih kosong, Mad!");
        } else {
            results.forEach((row, index) => {
                console.log(`${index + 1}. [ID: ${row.id}]`);
                console.log(`   Nama  : ${row.nama}`);
                console.log(`   Pesan : ${row.pesan}`);
                console.log('---------------------------');
            });
            console.log(`\nTotal: ${results.length} pesan ditemukan.`);
        }
   
        db.end(); // Tutup koneksi setelah selesai baca
    });
}

// Jalankan fungsinya
tampilkanData();