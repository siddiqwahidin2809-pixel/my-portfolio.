const express = require('express');
const app = express();
const path = require('path');
const db = require('./db'); // Pastikan file db.js kamu sudah benar (pass: 123)

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set folder 'public' sebagai folder utama file statis
app.use(express.static(path.join(__dirname, 'public')));

// --- ROUTES ---

// 1. Rute untuk menampilkan Dashboard Admin
app.get('/dashboard', (req, res) => {
    // Jalur: public -> admin -> index.html (sesuai sidebar VS Code kamu)
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// 2. Rute API untuk mengambil data pesan (Read)
app.get('/api/pesan', (req, res) => {
    const sql = "SELECT * FROM pesan ORDER BY Waktu DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 3. Rute untuk menyimpan pesan dari form (Create)
app.post('/kirim-pesan', (req, res) => {
    const { nama, pesan } = req.body;
    // Gunakan Waktu (W besar) agar sinkron dengan database kamu
    const sql = "INSERT INTO pesan (nama, pesan, Waktu) VALUES (?, ?, NOW())";

    db.query(sql, [nama, pesan], (err, result) => {
        if (err) {
            console.error('Error simpan:', err);
            return res.status(500).send('Gagal mengirim pesan');
        }
        res.redirect('/'); 
    });
}); 

// 4. Rute DELETE (Hapus Pesan)
app.delete('/api/pesan/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM pesan WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error hapus:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Pesan berhasil dihapus' });
    });
});

// Jalankan Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n--- SYSTEM READY ---`);
    console.log(`Akses Dashboard di: http://localhost:${PORT}/dashboard`);
    console.log(`Cek Data API di: http://localhost:${PORT}/api/pesan\n`);
});
