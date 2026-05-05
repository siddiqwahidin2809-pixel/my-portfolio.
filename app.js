const express = require('express');
const path = require('path');
// Ubah baris ini agar fungsi open bisa terbaca
const open = require('open').default;

const app = express();
const PORT = 3000;

// Middleware agar folder public bisa diakses
app.use(express.static(path.join(__dirname, 'public')));

// Route utama untuk memanggil index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route API Data kamu
app.get('/api/data', (req, res) => {
    res.json({
        nama: "Ahmad",
        nim: "245920109",
        jurusan: "Teknologi Informasi",
        kampus: "Universitas Deli Sumatera",
        status: "Maba",
        hobi: "bola and game"
    });
});

// Jalankan server dan otomatis buka browser
app.listen(PORT, async () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
    
    // Perintah sakti untuk langsung buka web
    await open(`http://localhost:${PORT}`);
});