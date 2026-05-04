const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000; // Kamu bisa ganti portnya kalau mau

// Baris sakti agar folder public bisa diakses browser
app.use(express.static(path.join(__dirname, 'public')));

// Route utama untuk memanggil index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/api/data', (req, res) => {
    res.json({
        nama: "Ahmad",
        nim: "245920109",
        jurusan: "Teknologi Informasi",
        kampus: "Universitas Deli Sumatera",
        status: "Maba",
        hobi : "bola and game"
    });
});
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});