import React, { useState } from 'react';
import { VR_SUBJECTS } from '../../data/vrSubjectsData';
import VRSceneWrapper from './VRSceneWrapper';
import { Sparkles, Gamepad2, Layers, PlayCircle, BookOpen, Info, X, Star } from 'lucide-react';
import { synth } from '../../utils/audioSynth';
import { getOfficialCpByText, getOfficialCp } from '../../utils/cpDatabase.js';

export default function VRDashboard() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [filterGrade, setFilterGrade] = useState('all');
  const [infoPopupSubject, setInfoPopupSubject] = useState(null);

  // Map subjects to Kurikulum Merdeka (convert IPA/IPS to IPAS & map grades to Fases)
  const mappedSubjects = VR_SUBJECTS.map(s => {
    let subject = s.subject;
    let badgeColor = s.badgeColor;
    
    // Check if the subject is IPA or IPS, and map it to IPAS if it targets grades 3-6
    if (subject === 'IPA' || subject === 'IPS') {
      subject = 'IPAS';
      badgeColor = 'bg-teal-700 text-white'; // IPAS badge color
    }

    // Map raw grade strings to a single Fase label to avoid teacher confusion.
    // Priority: Fase C > Fase B > Fase A. Fallback to first entry if unknown.
    let gradeDisplay = '';
    if (Array.isArray(s.fase) && s.fase.length > 0) {
      if (s.fase.includes('Fase C')) gradeDisplay = 'Fase C';
      else if (s.fase.includes('Fase B')) gradeDisplay = 'Fase B';
      else if (s.fase.includes('Fase A')) gradeDisplay = 'Fase A';
      else gradeDisplay = s.fase[0];
    }
    
    return {
      ...s,
      subject,
      badgeColor,
      gradeDisplay
    };
  });

  const activeSubject = mappedSubjects.find(s => s.id === selectedSubjectId);

  const filteredSubjects = mappedSubjects.filter(s => {
    // If Fase A is selected, hide any subjects belonging to IPAS or TIK
    if (filterGrade === 'fase-a') {
      if (['IPAS', 'TIK'].includes(s.subject)) return false;
      return s.fase && s.fase.includes('Fase A');
    }
    if (filterGrade === 'fase-b') {
      return s.fase && s.fase.includes('Fase B');
    }
    if (filterGrade === 'fase-c') {
      return s.fase && s.fase.includes('Fase C');
    }
    return true;
  });

  const selectSubject = (id) => {
    synth.playPop();
    setSelectedSubjectId(id);
  };

  // If a subject is currently loaded, render the 3D VR Scene Split Layout
  if (activeSubject) {
    return (
      <VRSceneWrapper 
        subjectData={activeSubject} 
        onBack={() => setSelectedSubjectId(null)} 
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 py-12 px-4 md:px-8 relative overflow-hidden">
      
      {/* Decorative cosmic background elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Hero title section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-1.5 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-purple-300 font-extrabold text-xs tracking-wider uppercase">Dunia Belajar Imersif</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-3 drop-shadow-md">
            VR Learning Space 🕶️
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto font-semibold leading-relaxed">
            Papan materi interaktif dipadukan dengan dunia 3D yang hidup. Siswa dapat merotasi objek sains, melipat bangun ruang, memberi makan satwa, dan mencoba kuis seru!
          </p>
        </div>

        {/* Grade Filter selection */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          <button 
            onClick={() => { synth.playPop(); setFilterGrade('all'); }}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all shadow ${filterGrade === 'all' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-500/20' : 'bg-slate-900 text-slate-400 border border-slate-850 hover:bg-slate-850'}`}
          >
            🏫 Semua Fase
          </button>
          <button 
            onClick={() => { synth.playPop(); setFilterGrade('fase-a'); }}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all shadow ${filterGrade === 'fase-a' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-500/20' : 'bg-slate-900 text-slate-400 border border-slate-850 hover:bg-slate-850'}`}
          >
            🍎 Fase A (Kelas 1-2)
          </button>
          <button 
            onClick={() => { synth.playPop(); setFilterGrade('fase-b'); }}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all shadow ${filterGrade === 'fase-b' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-500/20' : 'bg-slate-900 text-slate-400 border border-slate-850 hover:bg-slate-850'}`}
          >
            🧪 Fase B (Kelas 3-4)
          </button>
          <button 
            onClick={() => { synth.playPop(); setFilterGrade('fase-c'); }}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all shadow ${filterGrade === 'fase-c' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-500/20' : 'bg-slate-900 text-slate-400 border border-slate-850 hover:bg-slate-850'}`}
          >
            🚀 Fase C (Kelas 5-6)
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map(sub => (
            <div 
              key={sub.id}
              className="group relative bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 pt-14 border-2 border-slate-900 hover:border-purple-500/50 hover:bg-slate-900 shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setInfoPopupSubject(sub); }}
                className="absolute top-3 left-1/2 transform -translate-x-1/2 z-20 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 border border-purple-400 shadow-md flex items-center justify-center text-[10px] font-black text-white hover:from-purple-600 hover:to-indigo-700 hover:scale-105 hover:shadow-lg active:scale-95 transition-all uppercase tracking-wider"
                title="Info CP & TP"
              >
                CP & TP
              </button>

              <div className="cursor-pointer" onClick={() => selectSubject(sub.id)}>
                {/* Badge color header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${sub.badgeColor}`}>
                    {sub.subject}
                  </span>
                  <span className="text-[10px] text-slate-400 font-extrabold bg-slate-950 px-2 py-0.5 rounded border border-slate-850">
                    {sub.gradeDisplay}
                  </span>
                </div>

                {/* Main large emoji */}
                <div className={`w-14 h-14 bg-gradient-to-br ${sub.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
                  {sub.iconUrl
                    ? <img src={sub.iconUrl} alt={sub.title} className="w-full h-full object-contain p-1" />
                    : sub.emoji
                  }
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-purple-300 transition-colors mb-2 leading-tight">
                  {sub.title}
                </h3>

                <p className="text-xs text-slate-400 font-semibold leading-relaxed mb-6">
                  {sub.description}
                </p>
              </div>

              {/* Bottom Play action */}
              <div onClick={() => selectSubject(sub.id)} className="border-t border-slate-950 pt-4 flex items-center justify-between text-xs font-black text-slate-300 cursor-pointer">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  {sub.steps.length} Materi
                </span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Mulai Jelajah 🕶️
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* CP/TP Popup */}
      {infoPopupSubject && (
        (() => {
          const officialCp = getOfficialCp(infoPopupSubject) || getOfficialCpByText(infoPopupSubject.cp);

          return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setInfoPopupSubject(null)} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl animate-[pop_0.3s_ease-out]">
            <button onClick={() => setInfoPopupSubject(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">
                {infoPopupSubject.iconUrl
                  ? <img src={infoPopupSubject.iconUrl} alt={infoPopupSubject.title} className="w-12 h-12 object-contain" />
                  : infoPopupSubject.emoji
                }
              </div>
              <div>
                <h3 className="text-xl font-black text-white leading-tight">{infoPopupSubject.title}</h3>
                <span className="text-xs font-bold text-purple-400">{infoPopupSubject.subject} • {infoPopupSubject.gradeDisplay}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-900/20 p-4 rounded-2xl border border-purple-500/20">
                <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Star className="w-4 h-4" /> Capaian Pembelajaran
                </h4>
                <p className="text-sm font-semibold text-slate-300 leading-relaxed">
                  {officialCp || 'CP resmi belum terdaftar untuk materi VR ini.'}
                </p>
              </div>
              
              <div className="bg-cyan-900/20 p-4 rounded-2xl border border-cyan-500/20">
                <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Tujuan Pembelajaran
                </h4>
                <ul className="space-y-1.5 text-sm font-semibold text-slate-300 leading-relaxed list-disc list-outside ml-4">
                  {Array.isArray(infoPopupSubject.tp) ? infoPopupSubject.tp.map((t, i) => (
                    <li key={i}>{t}</li>
                  )) : <li>{infoPopupSubject.tp}</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
          );
        })()
      )}

    </div>
  );
}
