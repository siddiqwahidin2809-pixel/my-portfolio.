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
        status: "Maba"
    });
});
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
// Fungsi untuk mengambil data dari server backend
async function fetchProfilData() {
    try {
        // 1. Meminta data ke route /api/data yang kita buat di app.js
        const response = await fetch('/api/data');
        const data = await response.json();

        // 2. Mencari elemen HTML dengan ID 'nim-user' dan mengisinya dengan data NIM
        const nimElement = document.getElementById('nim-user');
        if (nimElement) {
            nimElement.innerText = data.nim;
        }

    } catch (error) {
        console.error('Gagal mengambil data dari server:', error);
    }
}

// Jalankan fungsi ini otomatis saat halaman website dibuka
fetchProfilData();