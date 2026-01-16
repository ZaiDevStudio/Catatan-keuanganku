import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxo9okH0fKRF-QaEfm2jYv-CGPVnl3EJg",
  authDomain: "catatan-keuanganku-602cf.firebaseapp.com",
  projectId: "catatan-keuanganku-602cf",
  // ... sisa config Anda
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Fungsi hitung saldo otomatis
async function updateSaldo(userId) {
    const q = query(collection(db, "catatan"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let total = 0;
    
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const amt = parseFloat(data.jumlah);
        if(data.tipe === 'pemasukan' || data.tipe === 'pinjaman') total += amt;
        else if(data.tipe === 'pengeluaran' || data.tipe === 'piutang') total -= amt;
    });

    document.getElementById('totalSaldo').innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// Proteksi Halaman
onAuthStateChanged(auth, (user) => {
    if (user) {
        updateSaldo(user.uid);
        document.getElementById('userName').innerText = user.displayName || user.email;
    } else {
        window.location.href = "login.html";
    }
});
