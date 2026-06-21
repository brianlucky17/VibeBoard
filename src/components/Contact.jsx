import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Sparkles, ShieldCheck } from 'lucide-react';

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-5 border-2 border-white/40 shadow-xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-yellow-900 shadow-lg">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-black text-white">{title}</h3>
      </div>
      <div className="text-white/85 font-semibold leading-relaxed">{children}</div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ nama: '', email: '', pesan: '' });
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

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

    // Simulasi submit (tanpa backend)
    setStatus({ type: 'success', msg: 'Terima kasih! Pesan Anda sudah disiapkan untuk dikirim ✅' });
    setForm({ nama: '', email: '', pesan: '' });
  };

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10 animate-[slideUp_0.5s_ease-out]">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-5 py-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-black">Kontak Kami</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-3">Mari terhubung!</h2>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto font-semibold leading-relaxed">
            Kirim pesan untuk pertanyaan, saran, atau kerja sama. Tim VibeBoard akan merespons secepatnya.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Form */}
          <section className="lg:col-span-3">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-2xl p-6">
              <h3 className="text-2xl font-black text-white mb-2">Kirim Pesan</h3>
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
                    className={`rounded-2xl p-4 text-sm font-bold shadow-lg border-2 ${
                      status.type === 'success'
                        ? 'bg-green-500/20 border-green-300 text-green-50'
                        : 'bg-red-500/20 border-red-300 text-red-50'
                    }`}
                    role="status"
                  >
                    {status.msg}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`btn-playful w-full sm:w-auto justify-center transition-opacity ${
                      canSubmit ? 'opacity-100' : 'opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    Kirim
                  </button>

                  <Link
                    to="/"
                    className="btn-playful w-full sm:w-auto justify-center bg-gradient-to-r from-purple-500 to-violet-500 text-white border-b-purple-700 hover:from-purple-400 hover:to-violet-400"
                  >
                    Kembali ke Beranda
                  </Link>
                </div>

                <div className="mt-2 flex items-start gap-2 text-white/70 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 mt-0.5 text-yellow-200" />
                  <span>
                    Form ini demo UI (tanpa backend). Cocok untuk landing page kontak.
                  </span>
                </div>
              </form>
            </div>
          </section>

          {/* Info */}
          <aside className="lg:col-span-2">
            <div className="space-y-5">
              <InfoCard icon={Mail} title="Email">
                vibeboard@example.com
              </InfoCard>
              <InfoCard icon={Phone} title="Telepon">
                +62 812-3456-7890
              </InfoCard>
              <InfoCard icon={MapPin} title="Alamat">
                Indonesia · untuk keperluan kerja sama
              </InfoCard>

              <div className="bg-white/20 backdrop-blur-lg rounded-3xl border-2 border-white/40 shadow-2xl p-5">
                <h4 className="text-white font-black text-lg mb-2">Jam Operasional</h4>
                <ul className="text-white/80 font-semibold space-y-2">
                  <li>Senin – Jumat: 08.00 – 16.00</li>
                  <li>Sabtu: 08.00 – 12.00</li>
                  <li>Minggu: Libur</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

