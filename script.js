// 1. VARIABEL PENANDA
// Ini mencegah layar loncat-loncat atau bingung saat kita mengklik menu.
let sedangMengklikMenu = false;

// FUNGSI MEMBUKA KOTAK DETAIL (SAAT HURUF A-Z DIKLIK)
function bukaKotak(huruf) {
  // Langkah 1: Cari semua kotak detail yang ada di halaman
  let semuaKotak = document.querySelectorAll('.kotak-detail');
  for (let i = 0; i < semuaKotak.length; i++) {
    semuaKotak[i].style.display = 'none';
  }
  let kotakPilihan = document.getElementById('kotak-' + huruf);
  if (kotakPilihan) {
    kotakPilihan.style.display = 'block';
    kotakPilihan.scrollIntoView({ behavior: 'smooth' });
  }
}

// FUNGSI TOMBOL KEMBALI 
function tutupKotak(huruf) {
  sedangMengklikMenu = true; // Kunci scroll otomatis sementara
  let kotak = document.getElementById('kotak-' + huruf);
  if (kotak) {
    kotak.style.display = 'none';
  }
  let bagianAlfabet = document.getElementById('bagian-alfabet');
  if (bagianAlfabet) {
    bagianAlfabet.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  let semuaMenu = document.querySelectorAll('.nav-item');
  for (let i = 0; i < semuaMenu.length; i++) {
    semuaMenu[i].classList.remove('aktif');
  }
  let menuAlfabet = document.querySelector('.nav-item:nth-child(2)');
  if (menuAlfabet) {
    menuAlfabet.classList.add('aktif');
  }
  setTimeout(function() {
    sedangMengklikMenu = false;
  }, 800);
}

//FUNGSI TOMBOL ROKET "MULAI BELAJAR"
function mulaiBelajar() {
  let areaAlfabet = document.getElementById('grid');
  if (areaAlfabet) {
    areaAlfabet.scrollIntoView({ behavior: 'smooth' });
  }
}

//FUNGSI NAVIGASI MENU (SAAT HOME/ALFABET/TENTANG DIKLIK)
function pindahMenu(tipeMenu, elemenYangDitekan) {
  sedangMengklikMenu = true; // Kunci scroll otomatis sementara
  let semuaMenu = document.querySelectorAll('.nav-item');
  for (let i = 0; i < semuaMenu.length; i++) {
    semuaMenu[i].classList.remove('aktif');
  }
  // Berikan warna ungu hanya pada menu yang sedang diklik
  elemenYangDitekan.classList.add('aktif');
  if (tipeMenu === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (tipeMenu === 'alfabet') {
    let bagianAlfabet = document.getElementById('bagian-alfabet');
    if (bagianAlfabet) {
      bagianAlfabet.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  else if (tipeMenu === 'tentang') {
    let bagianTentang = document.getElementById('tentang');
    if (bagianTentang) {
      bagianTentang.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  setTimeout(function() {
    sedangMengklikMenu = false;
  }, 800);
}

// PEMANTAU SCROLL OTOMATIS (UBAH WARNA MENU)
window.addEventListener('scroll', function() {
  if (sedangMengklikMenu) return;
  let posisiScroll = window.scrollY;
  let menuHome = document.querySelector('.nav-item:nth-child(1)');
  let menuAlfabet = document.querySelector('.nav-item:nth-child(2)');
  let menuTentang = document.querySelector('.nav-item:nth-child(3)');
  // Tangkap elemen area Alfabet dan Tentang
  let bagianAlfabet = document.getElementById('bagian-alfabet');
  let bagianTentang = document.getElementById('tentang');
  if (!menuHome || !menuAlfabet || !menuTentang || !bagianAlfabet || !bagianTentang) return;
  let posisiAlfabet = bagianAlfabet.offsetTop;
  let posisiTentang = bagianTentang.offsetTop;
  let ambang = 200;

  // Reset semua warna menu menjadi netral 
  menuHome.classList.remove('aktif');
  menuAlfabet.classList.remove('aktif');
  menuTentang.classList.remove('aktif');

  // Logika penentuan posisi warna:
  if (posisiScroll >= posisiTentang - ambang) {
    menuTentang.classList.add('aktif');
  } else if (posisiScroll >= posisiAlfabet - ambang) {
    menuAlfabet.classList.add('aktif');
  } else {
    menuHome.classList.add('aktif');
  }
});