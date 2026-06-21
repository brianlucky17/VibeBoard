import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
const modules = import.meta.glob('../data/kelas*/*.json', { eager: true });
const allGamesData = Object.values(modules).flatMap(mod => mod.default || mod);

const SUBJECT_NAMES = {
  'bi': 'Bahasa Indonesia',
  'eng': 'Bahasa Inggris',
  'mat': 'Matematika',
  'ipa': 'IPA',
  'ips': 'IPS',
  'pjok': 'PJOK',
  'ppkn': 'PPKn',
  'sen': 'Seni Budaya',
  'tik': 'TIK'
};

import { Filter, Search, Star, Play, BookOpen, Zap, ChevronLeft, ChevronRight, MoreHorizontal, Info, X } from 'lucide-react';
import Pagination from './Pagination.jsx';
import { getOfficialCp } from '../utils/cpDatabase.js';

// Map subjects to colors
const SUBJECT_COLORS = {
  'PPKn':            'from-red-400 to-rose-500',
  'Pendidikan Pancasila': 'from-red-400 to-rose-500',
  'Bahasa Indonesia':'from-green-400 to-emerald-500',
  'Matematika':      'from-blue-400 to-indigo-500',
  'IPA':             'from-teal-400 to-cyan-500',
  'IPS':             'from-orange-400 to-amber-500',
  'IPAS':            'from-teal-400 to-cyan-500',
  'Bahasa Inggris':  'from-violet-400 to-purple-500',
  'Seni Rupa':       'from-pink-400 to-fuchsia-500',
  'Seni Musik':      'from-pink-500 to-fuchsia-600',
  'Seni Tari':       'from-rose-400 to-pink-500',
  'Seni Teater':     'from-fuchsia-400 to-purple-500',
  'PJOK':            'from-yellow-400 to-lime-500',
  'TIK':             'from-sky-400 to-blue-500',
  'Koding dan Kecerdasan Artifisial': 'from-sky-400 to-blue-500',
};

const LEVEL_COLORS = {
  'Mudah':  'bg-green-100 text-green-700 border border-green-300',
  'Sedang': 'bg-yellow-100 text-yellow-700 border border-yellow-300',
  'Sulit':  'bg-red-100 text-red-700 border border-red-300',
};

function GameCard({ game, onShowInfo }) {
  const gradient = SUBJECT_COLORS[game.subject] || 'from-purple-400 to-violet-500';
  const levelColor = LEVEL_COLORS[game.level] || 'bg-gray-100 text-gray-700';

  return (
    <div className="game-card group animate-[fadeIn_0.4s_ease-out] relative flex flex-col items-center pt-14">
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onShowInfo(game); }}
        className="absolute top-3 left-1/2 transform -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 border border-purple-400 shadow-md flex items-center justify-center text-[10px] font-black text-white hover:from-purple-600 hover:to-indigo-700 hover:scale-105 hover:shadow-lg active:scale-95 transition-all uppercase tracking-wider"
        title="Info CP & TP"
      >
        CP & TP
      </button>
      <Link
        to={`/game/${game.id}`}
        className="w-full flex-1 flex flex-col items-center text-center no-underline"
      >
      {/* Subject color bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient} rounded-t-3xl`} />

      {/* Icon */}
      <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-4xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {game.emoji || '🎮'}
      </div>

      {/* Subject & Level badges */}
      <div className="flex gap-2 mb-3 flex-wrap justify-center">
        <span className={`badge-level ${levelColor}`}>{game.level}</span>
        <span className="badge-level bg-purple-100 text-purple-700 border border-purple-300">
          Kelas {game.grade}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-black text-gray-800 mb-1 leading-tight group-hover:text-purple-700 transition-colors">
        {game.title}
      </h3>

      {/* Subject */}
      <p className="text-sm font-bold text-gray-500 mb-3">{game.subject}</p>

      {/* Instructions preview */}
      <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">
        {game.instructions}
      </p>

      {/* Play count info */}
      <div className="mt-auto w-full">
        <div className="btn-playful w-full text-base py-3 mt-auto">
          <Play className="w-4 h-4" />
          Main Sekarang!
        </div>
      </div>
      </Link>
    </div>
  );
}

function InfoPopup({ game, onClose }) {
  if (!game) return null;
  const officialCp = getOfficialCp(game);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl animate-[pop_0.3s_ease-out]">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl">{game.emoji || '🎮'}</div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 leading-tight">{game.title}</h3>
            <span className="text-sm font-bold text-purple-600">{game.subject} • Kelas {game.grade}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
            <h4 className="text-sm font-black text-purple-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Star className="w-4 h-4" /> Capaian Pembelajaran
            </h4>
            <p className="text-sm font-semibold text-gray-700 leading-relaxed">
              {officialCp || 'CP resmi belum terdaftar untuk fase, mata pelajaran, dan elemen ini.'}
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
            <h4 className="text-sm font-black text-blue-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Tujuan Pembelajaran
            </h4>
            <ul className="space-y-1.5 text-sm font-semibold text-gray-700 leading-relaxed list-disc list-outside ml-4">
              {Array.isArray(game.tp) ? game.tp.map((t, i) => (
                <li key={i}>{t}</li>
              )) : <li>{game.tp}</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Game() {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const GAMES_PER_PAGE = 9;
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [infoPopupGame, setInfoPopupGame] = useState(null);

  // Dynamic subjects list based on active games for the selected grade
  const subjects = useMemo(() => {
    let filtered = allGamesData.map(game => {
      const grade = parseInt(game.grade);
      const subject = game.mataPelajaran || game.subject;
      return { ...game, subject, grade };
    });

    if (filterGrade !== 'all') {
      filtered = filtered.filter(game => game.grade === parseInt(filterGrade));
    }

    const uniqueSubjects = [...new Set(filtered.map(game => game.subject))];
    return ['all', ...uniqueSubjects.sort()];
  }, [filterGrade]);

  // Reset filterSubject if it becomes invalid for the selected grade
  useEffect(() => {
    if (!subjects.includes(filterSubject)) {
      setFilterSubject('all');
    }
  }, [filterGrade, filterSubject, subjects]);

  useEffect(() => {
    // Process games data to align with Kurikulum Merdeka
    let processed = allGamesData.map(game => {
      const grade = parseInt(game.grade);
      const subject = game.mataPelajaran || game.subject;

      return {
        ...game,
        subject,
        grade,
        fase: grade <= 2 ? 'Fase A' : (grade <= 4 ? 'Fase B' : 'Fase C')
      };
    });

    let filtered = processed;

    if (filterGrade !== 'all') {
      filtered = filtered.filter(game => game.grade === parseInt(filterGrade));
    }
    if (filterSubject !== 'all') {
      filtered = filtered.filter(game => game.subject === filterSubject);
    }
    if (searchTerm) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setGames(filtered);
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [filterGrade, filterSubject, searchTerm]);

  const grades = [
    { value: 'all', label: '🏫 Semua Kelas' },
    { value: '1', label: 'Kelas 1 (Fase A)' },
    { value: '2', label: 'Kelas 2 (Fase A)' },
    { value: '3', label: 'Kelas 3 (Fase B)' },
    { value: '4', label: 'Kelas 4 (Fase B)' },
    { value: '5', label: 'Kelas 5 (Fase C)' },
    { value: '6', label: 'Kelas 6 (Fase C)' }
  ];

  // Pagination computed values
  const totalPages = Math.ceil(games.length / GAMES_PER_PAGE);
  const paginatedGames = games.slice(
    (currentPage - 1) * GAMES_PER_PAGE,
    currentPage * GAMES_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
      {/* Hero */}
      <div className="text-center mb-10 animate-[slideUp_0.5s_ease-out]">
        <div className="inline-block mb-4 animate-[float_3s_ease-in-out_infinite]">
          <div className="text-7xl">🎓</div>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-3">
          Pilih Game Edukasi!
        </h2>
        <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto font-semibold leading-relaxed">
          Belajar sambil main seru untuk anak SD Kelas 1–6 🌟 Sesuai Kurikulum Merdeka!
        </p>

        <div className="flex justify-center gap-3 mt-4 mb-2">
          <Link
            to="/#pengembang-section"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-6 py-2 rounded-full font-black text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-transform no-underline"
          >
            <Star className="w-4 h-4" /> Profil Instansi & Pengembang
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-3 mt-6 flex-wrap">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/30 min-w-[80px]">
            <div className="text-2xl font-black text-white">{games.length}</div>
            <div className="text-xs font-bold text-white/75 uppercase tracking-wide">Game</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/30 min-w-[80px]">
            <div className="text-2xl font-black text-white">6</div>
            <div className="text-xs font-bold text-white/75 uppercase tracking-wide">Kelas</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/30 min-w-[80px]">
            <div className="text-2xl font-black text-white">
              {[...new Set(games.map(g => g.subject))].length}
            </div>
            <div className="text-xs font-bold text-white/75 uppercase tracking-wide">Mapel</div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section max-w-3xl mx-auto mb-8">
        <h3 className="text-xl font-black text-white mb-5 flex items-center gap-2">
          <Filter className="w-5 h-5" /> Filter Game
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Grade Filter */}
          <div>
            <label className="block text-sm font-bold text-white/90 mb-1.5">Kelas</label>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/60 transition-all font-bold text-gray-700"
            >
              {grades.map(g => (
                <option key={g.value} value={g.value}>{g.label}</option>
              ))}
            </select>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-bold text-white/90 mb-1.5">Mata Pelajaran</label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/60 transition-all font-bold text-gray-700"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject === 'all' ? '📚 Semua Mapel' : subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-bold text-white/90 mb-1.5 flex items-center gap-1.5">
            <Search className="w-4 h-4" /> Cari Game
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Ketik nama game atau pelajaran..."
            className="w-full p-3 rounded-xl bg-white/90 backdrop-blur-md border-2 border-white/80 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-400/60 transition-all font-semibold text-gray-700 placeholder:font-normal placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Results count */}
      {/* Results count with pagination */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="text-white/80 font-bold text-sm md:text-base flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
          <span>
            Menampilkan <span className="text-white">{games.length}</span> game
            {totalPages > 1 && ` • Halaman ${currentPage} dari ${totalPages}`}
          </span>
          <span className="text-white/60 text-xs sm:text-sm">
            {Math.min((currentPage - 1) * GAMES_PER_PAGE + 1, games.length)}-
            {Math.min(currentPage * GAMES_PER_PAGE, games.length)} dari {games.length}
          </span>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid-games">
        {paginatedGames.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="text-8xl mb-6 animate-[bounce_1s_infinite]">😔</div>
            <h3 className="text-3xl font-black text-white mb-3">Game tidak ditemukan</h3>
            <p className="text-lg text-white/75 font-semibold">Coba ubah filter atau cari kata kunci lain!</p>
            <button
              onClick={() => { setFilterGrade('all'); setFilterSubject('all'); setSearchTerm(''); }}
              className="btn-playful mt-6"
            >
              <Zap className="w-5 h-5" /> Reset Filter
            </button>
          </div>
        ) : (
          paginatedGames.map((game) => <GameCard key={game.id} game={game} onShowInfo={setInfoPopupGame} />)
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      
      {/* CP/TP Popup */}
      {infoPopupGame && (
        <InfoPopup game={infoPopupGame} onClose={() => setInfoPopupGame(null)} />
      )}
    </div>
  );
}

export default Game;
