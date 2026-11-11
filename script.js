// MENU NAVBAR
function toggleMenu() {
    document.getElementById("navbar").classList.toggle("active");
}

// Tutup menu setelah diklik
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function() {
        document.getElementById("navbar").classList.remove("active");
    });
});


// COUNTDOWN ACARA
function updateCountdown() {

    const target = new Date("2026-12-05T07:30:00+07:00").getTime();
    const now = new Date().getTime();

    let distance = target - now;

    if (distance < 0) {
        distance = 0;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = String(days).padStart(2, "0");
    document.getElementById("hours").innerHTML = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// PILIHAN KATEGORI LOMBA
function pilihLomba(namaLomba) {

    const pilihan = document.querySelector(
        `input[name="lomba"][value="${namaLomba}"]`
    );

    if (pilihan) {
        pilihan.checked = true;
    }

    document.getElementById("daftar").scrollIntoView({
        behavior: "smooth"
    });
}


// FORM PENDAFTARAN
const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nama = form.nama.value.trim();
    const nis = form.nis.value.trim();
    const kelas = form.kelas.value;
    const jurusan = form.jurusan.value;
    const wa = form.wa.value.trim();
    const email = form.email.value;
    const lomba = form.querySelector('input[name="lomba"]:checked');
    const persetujuan = form.persetujuan.checked;

    const message = document.getElementById("formMessage");

    if (!nama || !nis || !kelas || !jurusan || !wa || !lomba) {
        message.innerText = "Harap lengkapi semua data!";
        return;
    }

    if (!persetujuan) {
        message.innerText = "Silakan centang persetujuan!";
        return;
    }

    // Membuat kode registrasi
    const kode = "CF26-" + Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();

    const waktu = new Date().toLocaleString("id-ID", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Asia/Jakarta"
    }) + " WIB";

    // Menyimpan data pendaftaran
    const dataPeserta = {
        kode: kode,
        nama: nama,
        nis: nis,
        kelas: kelas,
        jurusan: jurusan,
        wa: wa,
        email: email,
        lomba: lomba.value,
        waktu: waktu
    };

    let dataLama = JSON.parse(
        localStorage.getItem("dataPendaftaran")
    ) || [];

    dataLama.push(dataPeserta);

    localStorage.setItem(
        "dataPendaftaran",
        JSON.stringify(dataLama)
    );

    // Menampilkan halaman berhasil
    document.getElementById("successName").innerText = nama;
    document.getElementById("regCode").innerText = kode;
    document.getElementById("receiptName").innerText = nama;
    document.getElementById("receiptNis").innerText = nis;

    document.getElementById("receiptClass").innerText =
        kelas + " - " + jurusan;

    document.getElementById("receiptCompetition").innerText =
        lomba.value;

    document.getElementById("receiptTime").innerText =
        waktu;

    // Sembunyikan konten utama
    document.querySelector("main")?.classList.add("hidden");

    // Karena elemen utama tidak dibungkus main,
    // sembunyikan bagian halaman satu per satu.
    document.querySelectorAll("body > section, body > .countdown-box")
        .forEach(section => {
            if (section.id !== "successSection") {
                section.classList.add("hidden");
            }
        });

    document.querySelector("footer").classList.add("hidden");

    document.getElementById("successSection").hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// KEMBALI KE BERANDA
function kembaliBeranda() {

    document.getElementById("successSection").hidden = true;

    document.querySelectorAll(".hidden").forEach(element => {
        element.classList.remove("hidden");
    });

    document.querySelector("footer").classList.remove("hidden");

    form.reset();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}