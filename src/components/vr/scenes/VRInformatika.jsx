import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, ContactShadows, Float } from '@react-three/drei';
import { synth } from '../../../utils/audioSynth';

const OBJECTS = [
  { id: 'algorithm', label: 'Algoritma', color: '#a855f7', position: [-1.9, 0.85, -0.5] },
  { id: 'computer', label: 'Komputer', color: '#38bdf8', position: [1.8, 0.8, -0.3] },
  { id: 'robot', label: 'Robot Pintar', color: '#f97316', position: [0.1, 0.8, 1.0] },
  { id: 'ai', label: 'AI Otak', color: '#10b981', position: [0, 1.6, -1.6] }
];

function FloatingTile({ item, active, onClick }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.28;
    ref.current.position.y = item.position[1] + Math.sin(t * 1.5) * 0.04;
  });

  return (
    <group ref={ref} position={item.position} dispose={null}>
      <mesh castShadow onClick={(e) => { e.stopPropagation(); onClick(); synth.playPop(); }}>
        <boxGeometry args={[0.96, 0.22, 0.26]} />
        <meshPhysicalMaterial
          color={item.color}
          roughness={0.18}
          metalness={0.45}
          clearcoat={0.9}
          clearcoatRoughness={0.05}
          emissive={active ? '#ffffff' : item.color}
          emissiveIntensity={active ? 0.34 : 0.08}
        />
      </mesh>
      <Html position={[0, 0.24, 0]} distanceFactor={5} center>
        <div className={`text-[11px] font-black px-3 py-1 rounded-full ${active ? 'bg-white text-slate-950 border border-violet-400' : 'bg-slate-950/85 text-white border border-slate-100/10'}`}>
          {item.label}
        </div>
      </Html>
    </group>
  );
}

function CyberPanel({ position, rotation, title, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = 0.05 + Math.sin(state.clock.getElapsedTime() * 0.35) * 0.015;
  });

  return (
    <group ref={ref} position={position} rotation={rotation} dispose={null}>
      <mesh>
        <boxGeometry args={[1.2, 0.7, 0.06]} />
        <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.7} emissive={color} emissiveIntensity={0.06} />
      </mesh>
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[1.16, 0.64]} />
        <meshStandardMaterial color="#0f172a" roughness={0.05} metalness={0.1} emissive={color} emissiveIntensity={0.08} transparent opacity={0.96} />
      </mesh>
      <Html position={[0, 0, 0.035]} distanceFactor={6} center>
        <div className="bg-slate-950/60 text-white text-[10px] font-black px-2 py-1 rounded border border-slate-100/10 select-none">
          {title}
        </div>
      </Html>
      {[...Array(4)].map((_, index) => (
        <mesh key={index} position={[-0.52 + index * 0.34, -0.2, 0.05]}>
          <boxGeometry args={[0.18, 0.08, 0.01]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} roughness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function RobotGuide() {
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  useFrame((state) => {
    if (!headRef.current || !leftArmRef.current || !rightArmRef.current) return;
    const t = state.clock.getElapsedTime();
    headRef.current.rotation.y = Math.sin(t * 0.8) * 0.14;
    leftArmRef.current.rotation.z = Math.sin(t * 1.2) * 0.18 - 0.2;
    rightArmRef.current.rotation.z = Math.sin(t * 1.2 + Math.PI) * 0.18 + 0.2;
  });

  return (
    <group position={[0, 0.72, 0.25]}>
      <mesh position={[0, 0.24, 0]} castShadow>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial color="#e9d5ff" roughness={0.25} metalness={0.15} />
      </mesh>
      <mesh position={[0, -0.08, 0]} castShadow>
        <boxGeometry args={[0.42, 0.5, 0.22]} />
        <meshStandardMaterial color="#7c3aed" roughness={0.25} metalness={0.15} />
      </mesh>
      <mesh ref={headRef} position={[0, 0.45, 0.13]} castShadow>
        <boxGeometry args={[0.18, 0.1, 0.05]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} />
      </mesh>
      <mesh ref={leftArmRef} position={[-0.37, 0.05, 0.02]} rotation={[0, 0, -0.2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.26, 16]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.4} />
      </mesh>
      <mesh ref={rightArmRef} position={[0.37, 0.05, 0.02]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.26, 16]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.4} />
      </mesh>
      <Html position={[0, 0.92, 0]} distanceFactor={9} center>
        <div className="bg-slate-950/85 text-white text-[11px] font-black px-3 py-1 rounded border border-violet-300/25 select-none">
          Halo! Sentuh ikon untuk memulai materi.
        </div>
      </Html>
    </group>
  );
}

function AIBrain() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.45;
  });

  return (
    <group position={[0, 1.5, -1.65]}>
      <mesh ref={ref} castShadow>
        <icosahedronGeometry args={[0.24, 1]} />
        <meshStandardMaterial color="#14b8a6" roughness={0.18} metalness={0.3} emissive="#2dd4bf" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.42, 0.03, 20, 64]} />
        <meshStandardMaterial color="#5eead4" roughness={0.1} metalness={0.6} emissive="#5eead4" emissiveIntensity={0.22} />
      </mesh>
      <Html position={[0, 0.6, 0]} distanceFactor={7} center>
        <div className="bg-slate-950/80 text-emerald-100 text-[10px] font-black px-3 py-1 rounded border border-emerald-200/30 select-none">
          Otak AI belajar dari data.
        </div>
      </Html>
    </group>
  );
}

function CodeScreen({ activeStepIndex }) {
  const lineColors = ['#fb7185', '#38bdf8', '#a855f7', '#22c55e', '#facc15'];

  return (
    <group position={[1.35, 1.12, 0.08]} rotation={[0, -0.16, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.48, 0.92, 0.08]} />
        <meshStandardMaterial color="#030712" roughness={0.18} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.046]}>
        <planeGeometry args={[1.42, 0.78]} />
        <meshPhysicalMaterial color="#020617" roughness={0.04} metalness={0.15} clearcoat={0.7} emissive="#0f172a" emissiveIntensity={0.1} />
      </mesh>
      {lineColors.map((color, index) => (
        <mesh key={index} position={[-0.62, 0.32 - index * 0.15, 0.056]}>
          <boxGeometry args={[1.18 - index * 0.08, 0.06, 0.01]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.2} />
        </mesh>
      ))}
      <Html position={[0, 0.38, 0.065]} distanceFactor={6.2} center>
        <div className="bg-slate-950/85 text-slate-100 text-[10px] font-black px-2 py-1 rounded border border-cyan-300/15 select-none">
          Kode logis & urutan perintah
        </div>
      </Html>
    </group>
  );
}

function GuideRing() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z += 0.002;
  });

  return (
    <group ref={ref} position={[0, -0.8, 0]}>
      {[1.2, 1.8, 2.4].map((radius, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.03, radius, 80]} />
          <meshStandardMaterial
            color={idx === 0 ? '#a855f7' : idx === 1 ? '#38bdf8' : '#10b981'}
            roughness={0.9}
            emissive={idx === 0 ? '#c084fc' : idx === 1 ? '#7dd3fc' : '#6ee7b7'}
            emissiveIntensity={0.08}
            side={2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function VRInformatika({ activeStepIndex, onSelectObject }) {
  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[4, 5.5, 2]} intensity={1.05} castShadow />
      <directionalLight position={[-3, 4.5, -2]} intensity={0.95} color="#8b5cf6" />
      <pointLight position={[0, 2.3, -1.2]} intensity={1.2} color="#34d399" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.04, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#020617" roughness={0.96} metalness={0.08} />
      </mesh>

      <mesh position={[0, -0.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 4.6, 128]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.76} emissive="#2563eb" emissiveIntensity={0.14} />
      </mesh>

      <CyberPanel position={[-2.1, 1.2, -0.9]} rotation={[0, 0.3, -0.05]} title="Logika Algoritma" color="#a855f7" />
      <CyberPanel position={[2.2, 1.15, -1.0]} rotation={[0, -0.35, 0.05]} title="Pola Data AI" color="#10b981" />

      <RobotGuide />
      <AIBrain />
      <CodeScreen activeStepIndex={activeStepIndex} />
      <GuideRing />

      {OBJECTS.map((item, idx) => (
        <FloatingTile
          key={item.id}
          item={item}
          active={activeStepIndex === idx}
          onClick={() => onSelectObject && onSelectObject(idx)}
        />
      ))}

      <ContactShadows position={[0, -1.02, 0]} opacity={0.45} width={10} height={10} blur={1.8} far={2.5} />
    </>
  );
}
