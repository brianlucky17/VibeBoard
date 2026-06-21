import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { synth } from '../../../utils/audioSynth';

const NOTES = [
  { note: 'Do', freq: 261.63, height: 1.2, color: '#f87171' },
  { note: 'Re', freq: 293.66, height: 1.1, color: '#fb923c' },
  { note: 'Mi', freq: 329.63, height: 1.0, color: '#fbbf24' },
  { note: 'Fa', freq: 349.23, height: 0.9, color: '#34d399' },
  { note: 'Sol', freq: 392.00, height: 0.8, color: '#2dd4bf' },
  { note: 'La', freq: 440.00, height: 0.7, color: '#60a5fa' },
  { note: 'Si', freq: 493.88, height: 0.65, color: '#a78bfa' },
  { note: 'Do\'', freq: 523.25, height: 0.58, color: '#f472b6' }
];

function AngklungTube({ index, note, freq, height, color, onPlay }) {
  const meshRef = useRef();
  const [shakeTime, setShakeTime] = useState(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (shakeTime > 0) {
      setShakeTime(prev => Math.max(prev - 0.05, 0));
      // Rapid shake rotation oscillation
      meshRef.current.rotation.z = Math.sin(shakeTime * 40) * 0.12;
      meshRef.current.position.x = (index - 3.5) * 0.7 + Math.sin(shakeTime * 60) * 0.03;
    } else {
      meshRef.current.rotation.z = 0;
      meshRef.current.position.x = (index - 3.5) * 0.7;
    }
  });

  const handleClick = () => {
    setShakeTime(1.0);
    synth.playAngklung(freq);
    if (onPlay) onPlay(note);
  };

  return (
    <group 
      ref={meshRef} 
      position={[(index - 3.5) * 0.7, 0, 0]} 
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      {/* Bamboo Hanger Frame */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.6]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.7} />
      </mesh>

      {/* Main Bamboo Tube 1 (Longer) */}
      <mesh position={[-0.1, 0.7 - height / 2, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.07, height, 16]} />
        <meshStandardMaterial color="#b45309" roughness={0.4} />
      </mesh>

      {/* Main Bamboo Tube 2 (Shorter, tuned one octave higher) */}
      <mesh position={[0.1, 0.7 - height * 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.045, height * 0.7, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.4} />
      </mesh>

      {/* Bottom rattle frame base */}
      <mesh position={[0, 0.7 - height + 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.35]} />
        <meshStandardMaterial color="#7c2d12" />
      </mesh>

      {/* Hanging string */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.15]} />
        <meshBasicMaterial color="#334155" />
      </mesh>

      {/* Note indicator tag */}
      <Html distanceFactor={6} position={[0, -0.9, 0]}>
        <button 
          onClick={handleClick}
          style={{ backgroundColor: color }}
          className="text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-white/40 transform hover:scale-110 active:scale-95 transition-transform"
        >
          {note}
        </button>
      </Html>
    </group>
  );
}

export default function SeniAngklung({ activeStepIndex }) {
  const [playedSeq, setPlayedSeq] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const note1Ref = useRef();
  const note2Ref = useRef();

  useEffect(() => {
    setPlayedSeq([]);
    setShowSuccess(false);
  }, [activeStepIndex]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (note1Ref.current) {
      note1Ref.current.position.y = 1.3 + Math.sin(t * 2.0) * 0.15;
      note1Ref.current.rotation.y = t * 0.4;
    }
    if (note2Ref.current) {
      note2Ref.current.position.y = 1.5 + Math.sin(t * 2.3 + 1.2) * 0.2;
      note2Ref.current.rotation.y = -t * 0.5;
    }
  });

  const handleNotePlay = (noteName) => {
    if (activeStepIndex !== 1) return;

    const targetSeq = ['Do', 'Mi', 'Do', 'Mi', 'Fa', 'Sol', 'Sol'];
    const nextSeq = [...playedSeq, noteName];

    // Check match
    let isCorrect = true;
    for (let i = 0; i < nextSeq.length; i++) {
      if (nextSeq[i] !== targetSeq[i]) {
        isCorrect = false;
        break;
      }
    }

    if (!isCorrect) {
      // Reset with current note
      setPlayedSeq([noteName]);
    } else {
      setPlayedSeq(nextSeq);
      if (nextSeq.length === targetSeq.length) {
        setShowSuccess(true);
        synth.playCorrect();
        setTimeout(() => {
          setPlayedSeq([]);
          setShowSuccess(false);
        }, 4000);
      }
    }
  };

  return (
    <>
      {/* Brightened theater stage lighting */}
      <ambientLight intensity={0.9} />
      <spotLight position={[0, 8, 3]} intensity={2.8} angle={Math.PI / 3} penumbra={0.5} castShadow />
      <directionalLight position={[0, 4, 5]} intensity={2.0} color="#fcd34d" />

      {/* Futuristic theater spotlights */}
      <mesh position={[-2.2, 2.5, -1.5]} rotation={[0.4, 0, -0.3]}>
        <coneGeometry args={[0.7, 3.5, 16, 1, true]} />
        <meshBasicMaterial color="#fcd34d" transparent opacity={0.1} side={2} />
      </mesh>
      <mesh position={[2.2, 2.5, -1.5]} rotation={[0.4, 0, 0.3]}>
        <coneGeometry args={[0.7, 3.5, 16, 1, true]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.1} side={2} />
      </mesh>

      {/* Floating 3D Musical Notes in the background */}
      <group ref={note1Ref} position={[-2.0, 1.3, -0.8]} rotation={[0.2, 0.4, -0.2]}>
        <mesh castShadow><torusGeometry args={[0.15, 0.05, 8, 16]} /><meshStandardMaterial color="#ec4899" roughness={0.3} /></mesh>
        <mesh position={[0.15, 0.25, 0]}><cylinderGeometry args={[0.02, 0.02, 0.5]} /><meshStandardMaterial color="#ec4899" /></mesh>
        <mesh position={[0.25, 0.45, 0]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.2, 0.04, 0.05]} /><meshStandardMaterial color="#ec4899" /></mesh>
      </group>
      <group ref={note2Ref} position={[2.0, 1.5, -0.8]} rotation={[0.1, -0.3, 0.3]}>
        <mesh castShadow><torusGeometry args={[0.15, 0.05, 8, 16]} /><meshStandardMaterial color="#06b6d4" roughness={0.3} /></mesh>
        <mesh position={[0.15, 0.25, 0]}><cylinderGeometry args={[0.02, 0.02, 0.5]} /><meshStandardMaterial color="#06b6d4" /></mesh>
        <mesh position={[0.25, 0.45, 0]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.2, 0.04, 0.05]} /><meshStandardMaterial color="#06b6d4" /></mesh>
      </group>

      {/* Stage platform */}
      <mesh position={[0, -1.3, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.4, 0.3, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Wooden Frame Stand */}
      <group position={[0, -0.6, 0]}>
        <mesh position={[-2.7, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.07, 2.5]} />
          <meshStandardMaterial color="#451a03" roughness={0.8} />
        </mesh>
        
        <mesh position={[2.7, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.07, 2.5]} />
          <meshStandardMaterial color="#451a03" roughness={0.8} />
        </mesh>

        <mesh position={[0, 1.7, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 5.5]} />
          <meshStandardMaterial color="#451a03" roughness={0.8} />
        </mesh>

        <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 5.4]} />
          <meshStandardMaterial color="#451a03" roughness={0.8} />
        </mesh>
      </group>

      {/* Row of Angklung instruments */}
      <group position={[0, -0.5, 0]}>
        {NOTES.map((n, i) => (
          <AngklungTube 
            key={i} 
            index={i} 
            note={n.note} 
            freq={n.freq} 
            height={n.height} 
            color={n.color} 
            onPlay={handleNotePlay}
          />
        ))}
      </group>

      {/* Helper guide overlay */}
      <Html position={[0, 1.8, 0]} center distanceFactor={6}>
        {activeStepIndex === 0 ? (
          <div className="bg-slate-950/70 text-pink-300 font-extrabold text-[10px] tracking-widest px-3 py-1 rounded-full uppercase border border-pink-500/30 whitespace-nowrap shadow-lg">
            Klik Angklung Untuk Memainkan Nada 🎵
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            {showSuccess ? (
              <div className="bg-green-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider animate-bounce border border-green-400 whitespace-nowrap shadow-2xl">
                Lagu Selesai! Hebat Sekali! 🎉
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <div className="bg-slate-950/90 text-yellow-300 font-extrabold text-[10px] tracking-wide px-3 py-1.5 rounded-xl border border-yellow-500/30 whitespace-nowrap shadow-lg flex flex-col items-center">
                  <span>Ikuti Nada: Do ➡️ Mi ➡️ Do ➡️ Mi ➡️ Fa ➡️ Sol ➡️ Sol</span>
                  <span className="text-[8px] text-slate-400 font-semibold mt-1">Lagu: Gundul Pacul</span>
                </div>
                {playedSeq.length > 0 && (
                  <div className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    Progres: {playedSeq.join(' ➡️ ')}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Html>
    </>
  );
}
