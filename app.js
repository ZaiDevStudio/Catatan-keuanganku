// CONFIGURATION - Ganti dengan milikmu!
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "proyekmu.firebaseapp.com",
    databaseURL: "https://proyekmu-default-rtdb.firebaseio.com",
    projectId: "proyekmu",
    storageBucket: "proyekmu.appspot.com",
    messagingSenderId: "12345678",
    appId: "1:123456:web:abcd"
};

// Inisialisasi
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Fungsi Simpan
function simpanCatatan(kategori, jumlah, keterangan) {
    db.ref('catatan').push({
        kategori,
        jumlah: parseInt(jumlah),
        keterangan,
        tanggal: new Date().toISOString()
    }).then(() => {
        alert("Berhasil disimpan!");
        window.location.href = 'index.html';
    });
}

// Rumus Saldo: (Pemasukan - Pengeluaran + Pinjaman - Piutang)
function hitungSaldo() {
    db.ref('catatan').on('value', (snapshot) => {
        let total = 0;
        snapshot.forEach((child) => {
            const data = child.val();
            if (data.kategori === 'pemasukan') total += data.jumlah;
            if (data.kategori === 'pengeluaran') total -= data.jumlah;
            if (data.kategori === 'pinjaman') total += data.jumlah;
            if (data.kategori === 'piutang') total -= data.jumlah;
        });
        const el = document.getElementById('totalSaldo');
        if(el) el.innerText = "Rp " + total.toLocaleString('id-ID');
    });
}
