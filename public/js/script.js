/* ==================== 1. MENU SHOW & HIDDEN ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Tampilkan Menu */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Sembunyikan Menu */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* ==================== 2. REMOVE MENU MOBILE ==================== */
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ==================== 3. SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if(sectionsClass){
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link')
            } else {
                sectionsClass.classList.remove('active-link')
            }
        }                                                    
    })
    window.addEventListener('scroll', scrollActive)
}

// Jalankan saat REFRESH/RESTART agar element aktif kembali
window.addEventListener('load', scrollActive)

/* ==================== 4. CHANGE BACKGROUND HEADER ==================== */
const scrollHeader = () =>{
    const header = document.getElementById('header')
    if(this.scrollY >= 50) header.classList.add('scroll-header'); 
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader)
window.addEventListener('load', scrollHeader)

/* ==================== 5. SHOW SCROLL UP ==================== */
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); 
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp)
window.addEventListener('load', scrollUp)
/* ==================== 6. INISIALISASI AOS ==================== */
AOS.init({
    duration: 1200,
    once: true,
});
async function fetchProfilData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();

        // Mengisi NIM (245920109)
        const nimElement = document.getElementById('nim-user');
        if (nimElement) {
            nimElement.innerText = data.nim;
        }

        // Mengisi Hobi (bola and game)
        const hobiElement = document.getElementById('hobi-user');
        if (hobiElement) {
            hobiElement.innerText = data.hobi;
        }

    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
}

fetchProfilData();
async function fetchProfilData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();

        document.getElementById('nim-user').innerText = data.nim;
        document.getElementById('hobi-user').innerText = data.hobi;
    } catch (error) {
        console.error('Error mengambil data:', error);
    }
}
fetchProfilData();