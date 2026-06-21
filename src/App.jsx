import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Star, BookOpen, Sparkles, Mail, Zap } from 'lucide-react';
import './App.css';

// Lazy load components to optimize initial bundle size
const LandingHome = lazy(() => import('./components/LandingHome'));
const Game = lazy(() => import('./components/Home'));
const GameBoard = lazy(() => import('./components/GameBoard'));
const VRDashboard = lazy(() => import('./components/vr/VRDashboard'));
const Contact = lazy(() => import('./components/Contact'));



function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-8 right-16 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl" />

          <div className="max-w-7xl mx-auto px-4 py-4 relative z-10">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {/* Logo & Title */}
              <Link to="/" className="flex items-center gap-2 group no-underline shrink-0">
                <div className="relative">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-yellow-300">
                    <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-900" />
                  </div>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-none tracking-tight">
                    VibeBoard
                  </h1>
                  <p className="text-xs sm:text-sm text-white/80 font-semibold hidden xs:block">Game Edukasi Sekolah Dasar</p>
                </div>
              </Link>

              {/* Nav */}
              <nav className="flex gap-2 flex-wrap justify-end">
                <Link to="/" className="btn-playful px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
                <Link to="/game" className="btn-playful px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Pilihan Game</span>
                </Link>
                <Link to="/vr" className="btn-playful px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-purple-600 border-none hover:from-cyan-600 hover:to-purple-700 shadow-md text-white">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <span>VR Space</span>
                </Link>
                <Link
                  to="/#tujuan-section"
                  className="btn-playful px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm"
                  onClick={() => {
                    document.getElementById('tujuan-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden md:inline">Tujuan</span>
                </Link>
                <Link
                  to="/#pengembang-section"
                  className="btn-playful px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm"
                  onClick={() => {
                    document.getElementById('pengembang-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="hidden md:inline">Profil Instansi</span>
                </Link>
                <Link
                  to="/#kontak-section"
                  className="btn-playful px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm"
                  onClick={() => {
                    document.getElementById('kontak-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden md:inline">Kontak</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Routes */}
        <main className="flex-1">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
              <div className="w-16 h-16 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="text-purple-600 font-bold animate-pulse text-lg">Memuat Halaman... 🌟</p>
            </div>
          }>
            <Routes>
              <Route path="/" element={<LandingHome />} />
              <Route path="/game" element={<Game />} />
              <Route path="/game/:gameId" element={<GameBoard />} />
              <Route path="/vr" element={<VRDashboard />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 to-purple-900 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-base text-white/80 font-semibold">
              © 2026 Papan Interaktif Digital 🌟
            </p>
            <p className="text-sm text-white/50 mt-1">
              Dibuat dengan ❤️ untuk anak-anak SD Indonesia · Kurikulum Merdeka Kelas 1–6
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
