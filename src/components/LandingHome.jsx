import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Sparkles, Zap, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';


function InfoCard({ icon: Icon, title, href, children }) {
  const CardContent = (
    <>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-yellow-900 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-black text-white">{title}</h3>
      </div>
      <div className="text-white/85 font-semibold leading-relaxed">{children}</div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white/20 backdrop-blur-lg rounded-3xl p-5 border-2 border-white/40 shadow-xl hover:bg-white/30 hover:border-white/60 transition-all duration-300 transform hover:-translate-y-1 group"
      >
        {CardContent}
      </a>
    );
  }

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-5 border-2 border-white/40 shadow-xl">
      {CardContent}
    </div>
  );
}

export default function LandingHome() {
  const location = useLocation();
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Use a short timeout to ensure the DOM is fully rendered
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]);


  const canSubmit = useMemo(() => {
    const emailOk = /.+@.+\..+/.test(form.email.trim());
    return form.nama.trim().length >= 2 && emailOk && form.pesan.trim().length >= 5;
  }, [form]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!canSubmit) {
      setStatus({ type: 'error', msg: 'Lengkapi form dengan benar ya 😊' });
      return;
    }

    const recipient = 'maskaacommittee@gmail.com';
    const subject = encodeURIComponent(`Kontak VibeBoard - Dari ${form.nama}`);
    const body = encodeURIComponent(`Halo Tim VibeBoard,\n\nNama: ${form.nama}\nEmail: ${form.email}\n\nPesan:\n${form.pesan}\n\nSalam,\n${form.nama}`);

    // Redirect to default mail client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    setStatus({ type: 'success', msg: 'Membuka aplikasi email Anda untuk mengirim pesan... ✉️' });
    setForm({ nama: '', email: '', pesan: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10 animate-[slideUp_0.5s_ease-out]">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-black">VibeBoard</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-3">
            Papan Interaktif Digital
          </h2>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto font-semibold leading-relaxed">
            Belajar sambil main seru untuk anak SD kelas 1–6 🌟
            <br />
            Pilih game, seret jawaban, dan nikmati pengalaman belajar yang interaktif!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link to="/game" className="btn-playful text-lg px-8 py-4 w-full sm:w-auto">
              <Zap className="w-5 h-5" /> Main Game Edukasi!
            </Link>
            <Link to="/vr" className="btn-playful text-lg px-8 py-4 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 border-none hover:from-cyan-600 hover:via-indigo-600 hover:to-purple-700 shadow-xl text-white transform hover:scale-105 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" /> Jelajah VR Space 🕶️
            </Link>
          </div>
        </div>

        {/* Panduan singkat */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-black">Panduan</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mb-2">Cara Bermain</h3>
          <p className="text-white/85 font-semibold max-w-2xl mx-auto">
            Ikuti langkah-langkah berikut agar belajar terasa menyenangkan.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">


          <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-2xl p-6">

            <h3 className="text-2xl font-black text-white mb-2">1. Pilih Game</h3>
            <p className="text-white/80 font-semibold leading-relaxed">
              Masuk ke halaman Game untuk melihat berbagai pilihan aktivitas belajar.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-2xl p-6">
            <h3 className="text-2xl font-black text-white mb-2">2. Seret Jawaban</h3>
            <p className="text-white/80 font-semibold leading-relaxed">
              Seret kartu/jawaban ke kotak target.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-2xl p-6">
            <h3 className="text-2xl font-black text-white mb-2">3. Dapatkan Skor</h3>
            <p className="text-white/80 font-semibold leading-relaxed">
              Skor akan tampil otomatis saat game selesai.
            </p>
          </div>
        </div>

        {/* Tujuan & Kegunaan PID (Papan Interaktif Digital) */}
        <div id="tujuan-section" className="scroll-mt-24 mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-black">Tujuan & Kegunaan PID</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mb-2">Untuk Apa PID Digunakan?</h3>
            <p className="text-white/85 font-semibold max-w-3xl mx-auto leading-relaxed">
              VibeBoard sebagai Papan Interaktif Digital (PID) dirancang secara komprehensif untuk mengoptimalkan proses belajar-mengajar di sekolah dasar melalui berbagai fungsi strategis berikut:
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-2xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 text-white flex items-start gap-3 hover:bg-white/20 transition-all">
                <span className="text-yellow-300 text-xl shrink-0">🎯</span>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Media Pembelajaran Interaktif Kelas</h4>
                  <p className="text-sm text-white/80 font-semibold leading-relaxed">Digunakan langsung oleh guru di depan kelas sebagai pengganti papan tulis konvensional agar penyampaian materi lebih visual, dinamis, dan hidup.</p>
                </div>
              </div>

              <div className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 text-white flex items-start gap-3 hover:bg-white/20 transition-all">
                <span className="text-yellow-300 text-xl shrink-0">🔮</span>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Visualisasi & 3D (VR)</h4>
                  <p className="text-sm text-white/80 font-semibold leading-relaxed">Menghadirkan konsep-konsep abstrak seperti tata surya, bangun ruang, dan struktur anatomi secara nyata dalam ruang 3D yang dapat diinteraksikan langsung oleh siswa.</p>
                </div>
              </div>

              <div className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 text-white flex items-start gap-3 hover:bg-white/20 transition-all">
                <span className="text-yellow-300 text-xl shrink-0">🧩</span>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Sarana Evaluasi & Kuis Mandiri</h4>
                  <p className="text-sm text-white/80 font-semibold leading-relaxed">Sebagai alat ukur pemahaman materi (kuis formatif) instan dengan sistem drag-and-drop yang menyenangkan dan memberi umpan balik langsung kepada siswa.</p>
                </div>
              </div>

              <div className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 text-white flex items-start gap-3 hover:bg-white/20 transition-all">
                <span className="text-yellow-300 text-xl shrink-0">🌈</span>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Mendukung Pembelajaran Berdiferensiasi</h4>
                  <p className="text-sm text-white/80 font-semibold leading-relaxed">Memfasilitasi ragam gaya belajar siswa (visual, auditori, kinestetik) sesuai dengan arahan kurikulum nasional melalui kombinasi gambar, suara, dan interaksi fisik.</p>
                </div>
              </div>

              <div className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 text-white flex items-start gap-3 hover:bg-white/20 transition-all">
                <span className="text-yellow-300 text-xl shrink-0">🌐</span>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Akses Online & Kolaborasi Multi-Kelas</h4>
                  <p className="text-sm text-white/80 font-semibold leading-relaxed">Aplikasi berbasis web hosting cloud yang dapat diakses secara online dari mana saja dan kapan saja secara bersamaan oleh seluruh kelas (Fase A-C) tanpa hambatan.</p>
                </div>
              </div>

              <div className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 text-white flex items-start gap-3 hover:bg-white/20 transition-all">
                <span className="text-yellow-300 text-xl shrink-0">🤝</span>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Stimulasi Kerja Sama Kelompok</h4>
                  <p className="text-sm text-white/80 font-semibold leading-relaxed">Mendorong aktivitas kolaborasi, memicu diskusi, serta melatih keberanian siswa ketika maju bersama menyelesaikan tantangan game di papan digital.</p>
                </div>
              </div>

              <div className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 text-white flex items-start gap-3 hover:bg-white/20 transition-all">
                <span className="text-yellow-300 text-xl shrink-0">🧠</span>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Stimulasi Motorik & Fokus Siswa</h4>
                  <p className="text-sm text-white/80 font-semibold leading-relaxed">Membantu perkembangan koordinasi visual-motorik siswa usia dasar melalui aksi ketukan dan seret-tarik objek interaktif pada layar sentuh.</p>
                </div>
              </div>

              <div className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 text-white flex items-start gap-3 hover:bg-white/20 transition-all">
                <span className="text-yellow-300 text-xl shrink-0">✨</span>
                <div>
                  <h4 className="font-black text-white text-base mb-1">Mengurangi Kejenuhan Belajar</h4>
                  <p className="text-sm text-white/80 font-semibold leading-relaxed">Mengemas materi akademis yang padat menjadi kegiatan berbasis permainan edukatif yang atraktif guna menaikkan atensi serta motivasi belajar anak.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* School & Developers Section */}
        <section id="pengembang-section" className="mb-16 scroll-mt-24">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-black">Profil Instansi</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mb-2">Sekolah & Pengembang</h3>
            <p className="text-white/85 font-semibold max-w-2xl mx-auto">
              Sistem ini dirancang khusus untuk mendukung digitalisasi pembelajaran yang selaras dengan Kurikulum Nasional terbaru.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* School Profile */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-2xl p-8 flex flex-col justify-center text-center hover:-translate-y-1 transition-transform">
              <div className="mx-auto mb-6 flex items-center justify-center">
                <img
                  src="/sdn03srondol.png"
                  alt="SDN Srondol Kulon 03"
                  className="h-28 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)]"
                />
              </div>
              <h4 className="text-2xl font-black text-white mb-2">SD Negeri Srondol Kulon 03</h4>
              <p className="text-white/80 font-semibold mb-4 leading-relaxed">
                Jalan Srondol Kulon No. 10, Kelurahan Srondol Kulon,<br />
                Kecamatan Banyumanik, Kota Semarang, Provinsi Jawa Tengah.
              </p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-sm text-yellow-300 font-black uppercase tracking-widest mb-1">Kepala Sekolah</p>
                <p className="text-xl font-bold text-white">Agus Sunawan, S.Pd.</p>
              </div>
            </div>

            {/* Developer Profile */}
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-2xl p-8 flex flex-col justify-center hover:-translate-y-1 transition-transform">
              <h4 className="text-2xl font-black text-white mb-6 text-center">Tim Pengembang</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Brian Lucky Mahardika', 'Adrian Dwipa Kahfi', 'Ananda Syifa Dzihni', 'Nida Yumna Adb Khsn'].map((name, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4 border border-white/20 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-black text-white shadow-md">
                      {name.charAt(0)}
                    </div>
                    <span className="font-bold text-white text-sm">{name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <span className="inline-block bg-purple-900/50 border border-purple-400/50 text-purple-200 text-xs font-bold px-4 py-2 rounded-full">
                  Fakultas Teknik - Program Studi Pendidikan Teknik Informatika dan Komputer <br />Universitas Negeri Semarang
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="kontak-section" className="mb-10 scroll-mt-24">

          <div className="text-center mb-8">

            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-black">Kontak Kami</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mb-2">Mari terhubung!</h3>
            <p className="text-white/85 font-semibold max-w-2xl mx-auto">
              Kirim pesan untuk pertanyaan, saran, atau kerja sama. Tim VibeBoard akan merespons secepatnya.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 items-start">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-2xl p-6">
                <h4 className="text-2xl font-black text-white mb-2">Kirim Pesan</h4>
                <p className="text-white/75 font-semibold mb-5">
                  Isi form berikut, lalu klik tombol <span className="text-white font-black">Kirim</span>.
                </p>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-white/90 mb-1.5">Nama</label>
                    <input
                      value={form.nama}
                      onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value }))}
                      type="text"
                      placeholder="Contoh: Budi"
                      className="w-full p-3 rounded-xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/60 transition-all font-semibold text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/90 mb-1.5">Email</label>
                    <input
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      type="email"
                      placeholder="contoh@email.com"
                      className="w-full p-3 rounded-xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/60 transition-all font-semibold text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/90 mb-1.5">Pesan</label>
                    <textarea
                      value={form.pesan}
                      onChange={(e) => setForm((p) => ({ ...p, pesan: e.target.value }))}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={5}
                      className="w-full p-3 rounded-xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/60 transition-all font-semibold text-gray-700 resize-none"
                    />
                  </div>

                  {status.type !== 'idle' && (
                    <div
                      className={`rounded-2xl p-4 text-sm font-bold shadow-lg border-2 ${status.type === 'success'
                        ? 'bg-green-500/20 border-green-300 text-green-50'
                        : 'bg-red-500/20 border-red-300 text-red-50'
                        }`}
                      role="status"
                    >
                      {status.msg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`btn-playful w-full justify-center transition-opacity ${canSubmit ? 'opacity-100' : 'opacity-60 cursor-not-allowed'
                      }`}
                  >
                    <Send className="w-5 h-5" /> Kirim
                  </button>
                </form>
              </div>
            </div>

            {/* Info */}
            <aside className="lg:col-span-2">
              <div className="space-y-5">
                <InfoCard icon={Mail} title="Email" href="mailto:maskaacommittee@gmail.com">
                  maskaacommittee@gmail.com
                </InfoCard>
                <InfoCard icon={Phone} title="Telepon" href="https://wa.me/6287749993578">
                  +62 87749993578
                </InfoCard>
                <InfoCard icon={MapPin} title="Alamat" href="https://maps.google.com/?q=SD+Negeri+Srondol+Kulon+03">
                  Srondol Kulon, Banyumanik, Kota Semarang, Jawa Tengah 50263.
                </InfoCard>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}

