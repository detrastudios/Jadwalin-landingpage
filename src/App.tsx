import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ name: '', city: '', pkg: '' });
  const [showUrgencyPopup, setShowUrgencyPopup] = useState(false);
  const [urgencyData, setUrgencyData] = useState({ icon: '', title: '', text: '' });

  useEffect(() => {
    const triggerPopup = () => {
      const randomNames = ["Budi", "Andi", "Siti", "Fajar", "Dina", "Rizky", "Rina", "Agus", "Dewi", "Reza", "Putra", "Tari", "Kiki", "Lia", "Rangga"];
      const randomCities = ["Jakarta", "Bandung", "Surabaya", "Medan", "Semarang", "Yogyakarta", "Bali", "Makassar", "Malang", "Depok", "Bekasi", "Tangerang"];
      const randomPackages = ["Paket Jadwalin", "Paket Bundling Lengkap Jadwalin + RupaOne"];
      const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
      const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
      const randomPkg = randomPackages[Math.floor(Math.random() * randomPackages.length)];
      setPopupData({ name: randomName, city: randomCity, pkg: randomPkg });
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 5000);

      const nextTime = Math.floor(Math.random() * 15000) + 10000;
      setTimeout(triggerPopup, nextTime);
    };

    const initialTimer = setTimeout(triggerPopup, 5000);
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    const urgencyMessages = [
      { icon: '🔥', title: 'Makin Menipis!', text: 'Banyak yang sedang checkout paket Bundling saat ini.' },
      { icon: '⚠️', title: 'Kuota Terbatas', text: 'Slot Early Access Rp 80.000 segera habis!' },
      { icon: '⏰', title: 'Segera Berakhir', text: 'Harga akan kembali normal ke Rp 249.000.' },
      { icon: '👀', title: 'Hot Item', text: '18 orang sedang melihat halaman ini.' }
    ];

    const triggerUrgencyPopup = () => {
      const randomMsg = urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)];
      setUrgencyData(randomMsg);
      setShowUrgencyPopup(true);

      setTimeout(() => {
        setShowUrgencyPopup(false);
      }, 6000);

      const nextTime = Math.floor(Math.random() * 20000) + 15000;
      setTimeout(triggerUrgencyPopup, nextTime);
    };

    const initialTimer = setTimeout(triggerUrgencyPopup, 8000);
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    const key = 'jadwalin_deadline_9h';
    let deadline = localStorage.getItem(key);
    if (!deadline) {
      deadline = (Date.now() + 9 * 60 * 60 * 1000).toString();
      localStorage.setItem(key, deadline);
    }
    const deadlineNum = parseInt(deadline, 10);

    const tick = () => {
      const diff = Math.max(0, deadlineNum - Date.now());
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setTimeLeft(`Berakhir dalam ${h}:${m}:${s}`);
      if (diff <= 0) {
        localStorage.removeItem(key);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const faqs = [
    { q: 'Apakah ini langganan bulanan?', a: 'Tidak. Jadwalin dibeli sekali dan bisa dipakai selamanya — tidak ada biaya bulanan atau tahunan.' },
    { q: 'Datanya disimpan di mana?', a: 'Di Google Sheet milikmu sendiri. Jadi kamu tetap punya kendali penuh dan bisa cek datanya kapan saja langsung dari Google Sheet.' },
    { q: 'Bisa dipakai untuk banyak klien sekaligus?', a: 'Bisa. Kamu bisa tambah beberapa klien, dan tiap klien punya link portal review sendiri yang datanya terpisah.' },
    { q: 'Fitur AI-nya pakai API siapa? Ada biaya tambahan?', a: 'Kamu masukkan API key Gemini milikmu sendiri (bisa dapat gratis dari akun Google-mu). Jadwalin tidak menambahkan biaya di atas itu.' },
  ];

  const revealVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.05, duration: 0.7, ease: 'easeOut' },
    }),
  };

  return (
    <div className="text-gray-900 font-sans">
      {/* Sticky Top Section */}
      <div className="sticky top-0 z-40 w-full flex flex-col">
        {/* Urgency bar */}
        <div className="bg-black text-white text-xs sm:text-sm py-2.5 px-4 flex items-center justify-center gap-2 flex-wrap text-center">
          <span>🔥 Early Access: Sisa <span id="slotCount">37</span> slot harga Rp 80.000</span>
          <span className="hidden sm:inline">—</span>
          <span className="bg-red-600/90 px-2.5 py-0.5 rounded-full font-semibold">{timeLeft}</span>
        </div>

        {/* Header */}
        <header className="border-b border-gray-100 bg-white/90 backdrop-blur">
          <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg grad-btn flex items-center justify-center text-white font-bold text-sm">J</div>
            <span className="font-bold text-lg">Jadwalin</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <a href="#fitur" className="hover:text-gray-900">Fitur Unggulan</a>
            <a href="#harga" className="hover:text-gray-900">Harga</a>
            <a href="#faq" className="hover:text-gray-900">FAQ</a>
          </nav>
          <a href="https://detrastudios.myr.id/catalog/jadwalin" target="_blank" rel="noopener noreferrer" className="grad-btn text-white text-sm font-semibold px-4 py-2 rounded-full inline-block">Dapatkan Akses — Rp 80.000</a>
        </div>
        </header>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-5 pt-16 pb-10 text-center">
        <motion.div custom={0} initial="hidden" animate="visible" variants={revealVariants} className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          Dashboard Manager Konten, Tim & Klien untuk Kreator dan Agensi
        </motion.div>
        
        <motion.h1 custom={1} initial="hidden" animate="visible" variants={revealVariants} className="text-4xl sm:text-6xl font-black leading-[1.08] mb-6">
          Bikin Konten, Kelola Konten, Tim dan <span className="grad-text">Live Monitoring Project</span><br className="hidden sm:block" />
          Dalam Satu Dashboard
        </motion.h1>
        
        <motion.p custom={2} initial="hidden" animate="visible" variants={revealVariants} className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-9">
          Rapikan konten, jadwal, dan target produksi tim kontenmu — dari tim konten sampai tim desain. AI bawaan bantu bikin draft konten sesuai niche & tema kamu, dan klien bisa pantau progres secara real-time. Semua data tersimpan di Google Sheet milikmu sendiri, jadi hemat biaya tanpa langganan bulanan.
        </motion.p>
        
        <motion.div custom={3} initial="hidden" animate="visible" variants={revealVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <a href="https://detrastudios.myr.id/catalog/jadwalin" target="_blank" rel="noopener noreferrer" className="grad-btn text-white font-semibold px-7 py-3.5 rounded-full w-full sm:w-auto inline-block">
            🔥 Dapatkan Jadwalin — Rp 80.000 Selamanya
          </a>
          <a href="https://www.youtube.com/@detrastudios" target="_blank" rel="noopener noreferrer" className="border border-gray-200 font-semibold px-7 py-3.5 rounded-full w-full sm:w-auto hover:bg-gray-50 inline-block transition-colors">
            Tonton Demonya
          </a>
        </motion.div>

        {/* Progress Bar Early Access */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={revealVariants} className="max-w-xs mx-auto mb-8">
          <div className="flex justify-between text-xs mb-2">
            <span className="font-semibold text-gray-600">Kuota Harga Rp 80.000</span>
            <span className="font-bold text-red-600">Sisa 37/100 Slot</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full" style={{ width: '63%' }}></div>
          </div>
        </motion.div>
        
        <motion.div custom={5} initial="hidden" animate="visible" variants={revealVariants} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
          <span>✓ Bayar sekali</span>
          <span>⚡ Akses instan</span>
          <span>💬 Mentoring private via telegram</span>
        </motion.div>

        {/* Mockup */}
        <motion.div custom={6} initial="hidden" animate="visible" variants={revealVariants} className="mt-14 max-w-5xl mx-auto px-2">
          <img 
            src="/hero-image.png" 
            alt="Dashboard Jadwalin Preview" 
            className="rounded-2xl mockup-glow w-full h-auto object-cover border border-gray-200 shadow-2xl bg-white"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Pain points */}
      <section className="max-w-6xl mx-auto px-5 pt-20 pb-4">
        <div className="text-center mb-14">
          <p className="text-center text-xs font-bold tracking-wide text-indigo-600 mb-3 uppercase">Masalah Nyata</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">Ini yang Terjadi Ketika Ngonten.</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">Tapi setiap kali kamu memegang HP, realitanya selalu berulang seperti ini:</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🌀', title: 'Jadwal berantakan di chat & notes', desc: 'Ide konten kececer di WhatsApp, Notes, dan spreadsheet yang beda-beda. Susah dilacak siapa kerjain apa.' },
            { icon: '😮‍💨', title: 'Caption dibuat dadakan', desc: 'Jam posting udah dekat, caption baru mulai dipikirkan. Hasilnya seadanya, jauh dari maksimal.' },
            { icon: '📤', title: 'Approval klien bolak-balik chat', desc: 'Kirim draft lewat WA, nunggu balasan, revisi, kirim ulang. Progress nggak pernah kelihatan jelas.' },
            { icon: '📄', title: 'Data konten tercecer', desc: 'Spreadsheet manual gampang salah kolom, ketimpa, atau hilang saat harus diakses banyak orang.' },
            { icon: '🧑‍🤝‍🧑', title: 'Tim konten & desain tidak sinkron', desc: 'Brief tercecer, tim desain tidak tahu prioritas, tim konten tidak tahu progres desain. Target produksi jadi meleset.' },
            { icon: '💸', title: 'Tools mahal, langganan menumpuk', desc: 'Tiap tools baru nambah biaya bulanan. Untuk tim kecil atau kreator mandiri, biaya langganan cepat membengkak.' }
          ].map((point, i) => (
            <div key={point.title} className="card-soft rounded-2xl p-6 transition-transform hover:-translate-y-1">
              <div className="text-2xl mb-3">{point.icon}</div>
              <div className="font-bold mb-1.5">{point.title}</div>
              <p className="text-sm text-gray-500 leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Real problem */}
      <section className="bg-slate-950 mt-16 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-white text-2xl sm:text-3xl font-bold leading-snug">
            Masalah utamanya bukan karena kamu tidak niat.
          </p>
          <p className="grad-text-onlight text-2xl sm:text-3xl font-bold leading-snug mt-1 inline-block">
            Melainkan karena semua prosesmu masih manual dan tercecer di banyak tempat.
          </p>
        </div>
      </section>

      {/* Target Audience */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <p className="text-center text-xs font-bold tracking-wide text-indigo-600 mb-3 uppercase">Untuk Siapa?</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">Jadwalin Cocok Buat Siapa Sih?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">Dibangun khusus untuk mereka yang lelah dengan proses manual, miskomunikasi tim, dan tools langganan yang mahal.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">👩‍💻</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">Social Media Manager & Kreator</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Yang lelah mikirin ide mentok tiap hari, caption sering dadakan, dan jadwal posting berantakan tercecer di notes HP.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-purple-50 border border-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">Agensi Digital & Freelancer</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Yang pegang banyak klien, butuh portal approval rapi tanpa perlu chat WA bolak-balik, dan ingin tim desain-konten selalu sinkron.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">💼</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">Business Owner & UMKM</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Yang ingin bangun brand di sosmed tapi nggak punya waktu nyusun strategi rumit dan budget pas-pasan untuk tools langganan bulanan.</p>
          </div>
        </div>
      </section>

      {/* Cara kerja */}
      <section id="cara-kerja" className="max-w-5xl mx-auto px-5 py-20 border-t border-gray-100">
        <p className="text-center text-xs font-bold tracking-wide text-indigo-600 mb-3">Cara Kerja</p>
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-14 leading-tight">
          Dari Ide ke Konten Terjadwal<br className="hidden sm:block" /> dalam 3 Langkah
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card-soft rounded-2xl p-6">
            <p className="text-xs font-bold text-indigo-600 mb-3">Langkah 1</p>
            <h3 className="font-bold text-lg mb-2">Susun jadwal & klien</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">Buat kalender konten per klien atau per brand, atur PIC, platform, dan tenggat tayang dalam satu tampilan.</p>
            <span className="text-xs text-gray-400">⏱ 2 menit setup</span>
          </div>
          <div className="card-soft rounded-2xl p-6">
            <p className="text-xs font-bold text-indigo-600 mb-3">Langkah 2</p>
            <h3 className="font-bold text-lg mb-2">AI susun draft sekaligus</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">Satu klik, AI Assistant bikin judul, script, caption, CTA, dan hashtag langsung terisi — tinggal review.</p>
            <span className="text-xs text-gray-400">⏱ 30 detik</span>
          </div>
          <div className="card-soft rounded-2xl p-6">
            <p className="text-xs font-bold text-indigo-600 mb-3">Langkah 3</p>
            <h3 className="font-bold text-lg mb-2">Klien pantau real-time</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">Bagikan link portal khusus ke klien. Mereka pantau progres & approve langsung, tanpa perlu chat bolak-balik.</p>
            <span className="text-xs text-gray-400">⏱ Real-time</span>
          </div>
        </div>
      </section>

      {/* Features dark */}
      <section id="fitur" className="bg-slate-950 py-20">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-center text-xs font-bold tracking-wide text-indigo-400 mb-3 uppercase">Fitur Unggulan Jadwalin</p>
          <h2 className="text-white text-3xl sm:text-4xl font-black text-center mb-14 leading-tight">
            Satu Dashboard untuk Konten,<br className="hidden sm:block" /> Tim, dan Klien
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🗓️', title: 'Kalender, Kanban & Target', desc: 'Susun jadwal, pantau target produksi konten, dan lihat progres tim dalam tampilan kalender, Kanban, atau timeline.' },
              { icon: '👥', title: 'Manajemen Tim Konten & Desain', desc: 'Atur peran, PIC, dan status kerja tiap anggota tim — tim konten dan tim desain kerja dari satu sumber data yang sama.' },
              { icon: '📡', title: 'Laporan Real-Time ke Klien', desc: 'Klien pantau update progres konten langsung dari portal mereka, tanpa perlu tanya-tanya lewat chat.' },
              { icon: '🔄', title: 'Database di Google Sheet Sendiri', desc: 'Cukup 1 akun Google Sheet milikmu sebagai database — hemat biaya, tanpa server pihak ketiga, dan mudah di-backup kapan saja.' },
              { icon: '✨', title: 'AI Sesuai Niche & Tema Kamu', desc: 'Judul, script, caption, CTA, hashtag — AI generate sekaligus, hasilnya disesuaikan dengan niche dan tema kontenmu, bukan template generik.' },
              { icon: '🖨️', title: 'Output Lengkap', desc: 'Data mudah dieksport dalam bentuk file maupun PDF untuk keperluan pelaporan dan arsip.' }
            ].map((feat, i) => (
              <div key={feat.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-colors hover:bg-white/10">
                <div className="text-2xl mb-3">{feat.icon}</div>
                <div className="text-white font-bold mb-1.5">{feat.title}</div>
                <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RupaOne Cross-Promo Section */}
      <section id="rupaone" className="py-20 px-4 bg-gradient-to-b from-slate-50 via-purple-50/40 to-white relative overflow-hidden border-t border-slate-200/60">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100/90 border border-purple-200 px-3.5 py-1.5 rounded-full mb-4">
              🎨 AI Visual Generator
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              Jadwal Sudah Rapi? <span className="grad-text">Visualnya Biar RupaOne yang Urus.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Jadwalin ngatur kapan dan apa yang harus tayang. <strong>RupaOne</strong> ngerjain bagian visualnya — generate poster, carousel, dan infografis pakai AI dalam hitungan detik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: '🖼️', bg: 'bg-purple-100', text: 'text-purple-700', title: 'Single Poster & Infografis', desc: 'Generate visual siap posting dari teks, tanpa perlu bisa desain.' },
              { icon: '📚', bg: 'bg-blue-100', text: 'text-blue-700', title: 'Carousel Swipeable', desc: 'Create & optimization otomatis by AI untuk konten edukasi beruntun.' },
              { icon: '✨', bg: 'bg-amber-100', text: 'text-amber-700', title: '17 Gaya Visual Eksklusif', desc: 'Pilih gaya karakter visual yang unik, gratis update berkala.' },
              { icon: '🎯', bg: 'bg-emerald-100', text: 'text-emerald-700', title: 'Konsistensi Visual Tinggi', desc: 'Feed selaras dan rapi, langsung dikenali audiens kamu.' },
            ].map((card, i) => (
              <div key={card.title} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-purple-300 hover:shadow-lg transition-all">
                <div className={`w-11 h-11 rounded-xl ${card.bg} ${card.text} flex items-center justify-center mb-4 font-bold text-xl`}>{card.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-600/25 rounded-full blur-[90px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-[90px] pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-left">
                <div className="inline-flex items-center gap-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">✨ Kolaborasi Ideal: Jadwal Teratur + Visual AI</div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Lengkapi Jadwalin dengan RupaOne</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">Rencanakan & pantau produksi kontenmu di Jadwalin, lalu desain visualnya langsung pakai RupaOne — alur kerja dari ide sampai siap posting jadi satu paket.</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-300">
                  <span>✓ Akses 2 Tools Sekaligus</span>
                  <span>✓ Bebas Biaya Bulanan</span>
                  <span>✓ Termasuk di Bundling Hemat</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto shrink-0">
                <a href="https://rupaone.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 grad-btn text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-xl text-center">Apa itu RupaOne? →</a>
                <a href="https://detrastudios.myr.id/catalog/bundling1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full text-center transition-colors">Ambil Paket Bundling (Hemat 68%)</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="harga" className="max-w-5xl mx-auto px-5 py-20">
        <p className="text-center text-xs font-bold tracking-wide text-indigo-600 mb-3">Harga</p>
        <h2 className="text-3xl sm:text-4xl font-black text-center mb-3 leading-tight">Bayar Sekali, Pakai Selamanya</h2>
        <p className="text-center text-gray-500 mb-12">Nggak ada biaya langganan bulanan. Harga early access ini terbatas.</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* CARD 1 */}
          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-slate-200 shadow-lg">
            <div>
              <span className="inline-block bg-slate-100 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">Paket Standar</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Jadwalin</h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-4">Fokus rapikan jadwal, tim, dan laporan klien tanpa ribet spreadsheet.</p>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="text-slate-400 text-sm line-through decoration-red-500 decoration-2">Rp 249.000</div>
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-1">Rp 80.000</div>
                <span className="text-slate-500 text-xs font-medium">Sekali bayar · Akses selamanya</span>
              </div>

              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Kelebihan & Fitur Jadwalin:</div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-6">
                <li className="flex gap-2 items-start">✓ <span>Kalender, Kanban & Timeline planner lengkap dengan target produksi</span></li>
                <li className="flex gap-2 items-start">✓ <span>Manajemen tim konten & desain dari satu sumber data</span></li>
                <li className="flex gap-2 items-start">✓ <span>Database di Google Sheet milikmu sendiri — hemat biaya</span></li>
                <li className="flex gap-2 items-start">✓ <span>AI Draft Lengkap sesuai niche & tema kamu sekali klik</span></li>
                <li className="flex gap-2 items-start">✓ <span>Portal laporan real-time untuk klien</span></li>
                <li className="flex gap-2 items-start">✓ <span>Output lengkap (Export File & PDF)</span></li>
              </ul>

              <div className="bg-blue-50/50 border border-blue-100/80 rounded-2xl p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-1.5">🎁 <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Bonus Spesial Termasuk:</span></div>
                <strong className="block text-slate-900 text-xs mb-0.5">VoMagic AI Voice Generator (Senilai Rp 75.000)</strong>
                <p className="text-slate-500 text-[11px] leading-relaxed">Voice over otomatis suara jernih & natural dari naskah teks.</p>
              </div>
            </div>
            <a href="https://detrastudios.myr.id/catalog/jadwalin" target="_blank" rel="noopener noreferrer" className="block text-center bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-full font-bold text-sm sm:text-base transition-colors mt-4">Pilih Paket Jadwalin (Rp 80rb)</a>
          </div>

          {/* CARD 2 */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-purple-500 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-purple-600/30 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-600/25 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">✨ Rekomendasi Paling Hemat</span>
                <span className="text-[11px] font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2.5 py-0.5 rounded-full whitespace-nowrap">Diskon 68%</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-1">Bundling: Jadwalin + RupaOne Labs</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-4">Solusi lengkap: manajemen jadwal & tim + desain visual AI instan dalam satu alur kerja.</p>

              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="text-slate-500 text-sm line-through decoration-red-500 decoration-2">Rp 399.000</div>
                <div className="text-4xl sm:text-5xl font-extrabold grad-text-onlight tracking-tight mt-1">Rp 129.000</div>
                <span className="text-slate-400 text-xs font-medium">Sekali bayar · Akses selamanya ke 2 Tools</span>
              </div>

              <div className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2.5">Kelebihan Eksklusif Jadwalin:</div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200 mb-4">
                <li className="flex gap-2 items-start">✓ <span>Manajemen tim konten & desain + target produksi</span></li>
                <li className="flex gap-2 items-start">✓ <span>Database Google Sheet sendiri, portal laporan real-time klien</span></li>
              </ul>
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2.5">Ditambah Fitur RupaOne Labs:</div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200 mb-6">
                <li className="flex gap-2 items-start">✓ <span>Generate visual poster, carousel & infografis AI instan</span></li>
                <li className="flex gap-2 items-start">✓ <span>17 gaya visual AI eksklusif, konsistensi feed terjaga</span></li>
              </ul>

              <div className="bg-blue-600/15 border border-blue-400/25 rounded-2xl p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-1.5">🎁 <span className="text-xs font-bold text-blue-300 uppercase tracking-wide">Bonus Spesial Termasuk di Bundling:</span></div>
                <strong className="block text-white text-xs mb-0.5">VoMagic AI Voice Generator (Senilai Rp 75.000)</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">Voice over otomatis suara jernih & natural dari naskah teks.</p>
              </div>
            </div>

            <a href="https://detrastudios.myr.id/catalog/bundling1" target="_blank" rel="noopener noreferrer" className="relative z-10 block text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4 rounded-full font-extrabold text-sm sm:text-base shadow-xl hover:-translate-y-0.5 transition-transform mt-4">🔥 Ambil Paket Bundling Lengkap (Rp 129rb)</a>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">✓ Bayar sekali &nbsp;•&nbsp; ⚡ Akses instan &nbsp;•&nbsp; 💬 Mentoring private via telegram</p>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-5 pb-20">
        <h2 className="text-3xl font-black text-center mb-10">Pertanyaan Umum</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={faq.q} 
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                className="border border-gray-200 rounded-xl p-5 cursor-pointer transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span>{faq.q}</span>
                  <span className="text-xl leading-none text-gray-500 font-normal">{isOpen ? '－' : '＋'}</span>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      key="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 text-sm text-gray-500 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-950 py-20 text-center px-5">
        <h2 className="text-white text-3xl sm:text-4xl font-black mb-4">Mulai Rapikan Kontenmu Hari Ini</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Harga early access ini terbatas untuk slot pertama. Setelah itu, harga naik ke harga normal.</p>
        <a href="#harga" className="grad-btn text-white font-semibold px-8 py-4 rounded-full inline-block">🔥 Dapatkan Jadwalin — Rp 80.000 Selamanya</a>
      </section>

      <footer className="py-8 text-center text-xs text-gray-400">
        © 2026 Jadwalin. Sebuah produk Detra Studios.
      </footer>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="recent-purchase"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 left-4 z-50 bg-white border border-gray-200 shadow-xl rounded-xl p-3 sm:p-4 max-w-xs flex items-center gap-3"
          >
            <div className="w-10 h-10 shrink-0 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg">
              ✓
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Baru saja membeli</p>
              <p className="text-sm font-bold text-gray-900 leading-tight">{popupData.pkg}</p>
              <p className="text-xs text-gray-500 mt-1">{popupData.name} dari {popupData.city}</p>
            </div>
          </motion.div>
        )}

        {showUrgencyPopup && (
          <motion.div
            key="urgency-popup"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 right-4 z-50 bg-slate-900 border border-slate-800 shadow-2xl rounded-xl p-3 sm:p-4 max-w-xs flex items-center gap-3"
          >
            <div className="w-10 h-10 shrink-0 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-lg">
              {urgencyData.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">{urgencyData.title}</p>
              <p className="text-xs text-slate-300 mt-1">{urgencyData.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
