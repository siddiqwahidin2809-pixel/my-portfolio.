const express = require('express');
const path = require('path');
const db = require('./db'); // Memanggil koneksi dari db.js
const app = express();
const PORT = 3000;

// Middleware agar Node.js bisa membaca data dari form HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Menangani pengiriman data dari send.html
app.post('/submit-pesan', (req, res) => {
    const { nama, email, isi_pesan } = req.body;
    const sql = 'INSERT INTO pesan_kontak (nama, email, isi_pesan) VALUES (?, ?, ?)';

    // Menjalankan query ke MariaDB
    db.query(sql, [nama, email, isi_pesan], (err, result) => {
        if (err) {
            console.error('Gagal simpan ke MariaDB:', err);
            return res.status(500).send('Waduh, gagal simpan ke database!');
        }
        // Respon jika berhasil
        res.send(`
            <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
                <h1>Mantap, Ahmad!</h1>
                <p>Pesan dari <b>${nama}</b> sudah tersimpan di MariaDB.</p>
                <a href="index.html">Kembali ke Portofolio</a>
            </div>
        `);
    });
});

app.listen(PORT, () => {
    console.log(`Server nyala di http://localhost:${PORT}`);
    console.log('Siap menerima pesan masuk!');
});