import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { synth } from '../../../utils/audioSynth';

// -- Detailed Procedural Hardware Models --

function MonitorModel() {
  return (
    <group>
      {/* Base */}
      <mesh castShadow><boxGeometry args={[0.4, 0.02, 0.3]} /><meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} /></mesh>
      {/* Neck */}
      <mesh position={[0, 0.25, -0.05]} castShadow rotation={[0.1, 0, 0]}><boxGeometry args={[0.08, 0.5, 0.05]} /><meshStandardMaterial color="#1e293b" metalness={0.5} /></mesh>
      {/* Panel */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.2, 0.75, 0.05]} />
        <meshStandardMaterial color="#020617" roughness={0.4} />
      </mesh>
      {/* Glass Screen */}
      <mesh position={[0, 0.55, 0.026]}>
        <boxGeometry args={[1.15, 0.7, 0.01]} />
        <meshPhysicalMaterial color="#1e3a5f" metalness={0.8} roughness={0.05} envMapIntensity={1.0} clearcoat={1.0} clearcoatRoughness={0.1} emissive="#0ea5e9" emissiveIntensity={0.15} />
      </mesh>
    </group>
  );
}

function KeyboardModel() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.03, 0.25]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Key rows */}
      {[0.06, 0.02, -0.02, -0.06].map((z, i) => (
        <mesh key={i} position={[0, 0.02, z]} castShadow>
          <boxGeometry args={[0.7, 0.01, 0.03]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function MouseModel() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.08, 0.03, 0.13]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Scroll wheel */}
      <mesh position={[0, 0.02, 0.02]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.03, 12]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

function MotherboardModel() {
  return (
    <group>
      {/* Main PCB */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.04, 0.9]} />
        <meshStandardMaterial color="#064e3b" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* CPU Socket Area */}
      <mesh position={[0, 0.03, 0.2]}>
        <boxGeometry args={[0.25, 0.02, 0.25]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* CPU Socket Cover */}
      <mesh position={[0, 0.045, 0.2]}>
        <boxGeometry args={[0.15, 0.01, 0.15]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.9} />
      </mesh>
      {/* RAM Slots */}
      {[0.2, 0.26, 0.32].map((x) => (
        <mesh key={x} position={[x, 0.04, 0.2]} castShadow>
          <boxGeometry args={[0.03, 0.05, 0.4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
      ))}
      {/* PCIe Slots */}
      {[-0.2, -0.05].map((z) => (
        <mesh key={z} position={[-0.1, 0.04, z]} castShadow>
          <boxGeometry args={[0.5, 0.06, 0.04]} />
          <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.4} />
        </mesh>
      ))}
      {/* VRM Heatsinks */}
      <mesh position={[-0.25, 0.06, 0.2]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Chipset Heatsink */}
      <mesh position={[0.2, 0.05, -0.2]} castShadow>
        <boxGeometry args={[0.2, 0.06, 0.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* I/O Shield Area */}
      <mesh position={[-0.38, 0.05, 0.2]} castShadow>
        <boxGeometry args={[0.04, 0.12, 0.4]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} metalness={0.8} />
      </mesh>
    </group>
  );
}

function CPUModel() {
  return (
    <group>
      {/* IHS (Integrated Heat Spreader) */}
      <mesh castShadow>
        <boxGeometry args={[0.15, 0.02, 0.15]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Substrate */}
      <mesh position={[0, -0.015, 0]} castShadow>
        <boxGeometry args={[0.16, 0.01, 0.16]} />
        <meshStandardMaterial color="#064e3b" roughness={0.7} />
      </mesh>
      {/* Contact pads */}
      {[-0.04, 0, 0.04].map((x) =>
        [-0.04, 0, 0.04].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.025, z]}>
            <boxGeometry args={[0.02, 0.005, 0.02]} />
            <meshStandardMaterial color="#b45309" roughness={0.3} metalness={0.8} />
          </mesh>
        ))
      )}
    </group>
  );
}

function RAMModel() {
  return (
    <group>
      {/* PCB */}
      <mesh castShadow>
        <boxGeometry args={[0.38, 0.15, 0.02]} />
        <meshStandardMaterial color="#020617" roughness={0.8} />
      </mesh>
      {/* Heat Spreader Front */}
      <mesh position={[0, 0, -0.015]} castShadow>
        <boxGeometry args={[0.39, 0.17, 0.01]} />
        <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Heat Spreader Back */}
      <mesh position={[0, 0, 0.015]} castShadow>
        <boxGeometry args={[0.39, 0.17, 0.01]} />
        <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* RGB Strip Top */}
      <mesh position={[0, 0.088, 0]}>
        <boxGeometry args={[0.39, 0.01, 0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#3b82f6" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function CoolerModel() {
  const fanRef = useRef();
  useFrame(() => {
    if (fanRef.current) fanRef.current.rotation.y += 0.15;
  });

  return (
    <group>
      {/* Base Plate */}
      <mesh position={[0, -0.05, 0]} castShadow>
        <boxGeometry args={[0.15, 0.02, 0.15]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Heat Pipes */}
      {[-0.05, 0, 0.05].map((x) => (
        <mesh key={x} position={[x, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
          <meshStandardMaterial color="#b45309" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
      {/* Fin Stack */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.25, 0.15, 0.25]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Fan Frame */}
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.12, 0.02, 16, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      {/* Fan Blades */}
      <group ref={fanRef} position={[0, 0.2, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI * 2) / 7, 0]}>
            <mesh position={[0.06, 0, 0]} rotation={[0.2, 0, 0]} castShadow>
              <boxGeometry args={[0.1, 0.005, 0.03]} />
              <meshStandardMaterial color="#334155" roughness={0.5} />
            </mesh>
          </mesh>
        ))}
      </group>
      {/* RGB Ring */}
      <mesh position={[0, 0.21, 0]}>
        <torusGeometry args={[0.12, 0.005, 16, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function PSUModel() {
  return (
    <group>
      {/* Main Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.35, 0.18, 0.3]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Fan Grille */}
      <mesh position={[0, 0.091, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[0.12, 32]} />
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </mesh>
      {/* Sticker / Label */}
      <mesh position={[0.176, 0, 0]} rotation={[0, Math.PI/2, 0]}>
        <planeGeometry args={[0.25, 0.12]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
      </mesh>
      <mesh position={[0.177, 0.03, 0]} rotation={[0, Math.PI/2, 0]}>
        <planeGeometry args={[0.2, 0.03]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.5} />
      </mesh>
      {/* Power Switch */}
      <mesh position={[-0.1, 0, 0.15]}>
        <boxGeometry args={[0.04, 0.04, 0.02]} />
        <meshStandardMaterial color="#ef4444" roughness={0.4} />
      </mesh>
    </group>
  );
}

function SSDModel() {
  return (
    <group>
      {/* SSD Body */}
      <mesh castShadow>
        <boxGeometry args={[0.25, 0.02, 0.15]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.6} />
      </mesh>
      {/* Label */}
      <mesh position={[0, 0.011, 0]}>
        <planeGeometry args={[0.2, 0.1]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>
      {/* Brand stripe */}
      <mesh position={[0, 0.012, -0.04]}>
        <planeGeometry args={[0.2, 0.02]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} />
      </mesh>
      {/* SATA connector */}
      <mesh position={[0.13, 0, 0]}>
        <boxGeometry args={[0.02, 0.015, 0.06]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
    </group>
  );
}

function GPUModel() {
  const fanRef1 = useRef();
  const fanRef2 = useRef();
  useFrame(() => {
    if (fanRef1.current) fanRef1.current.rotation.y += 0.1;
    if (fanRef2.current) fanRef2.current.rotation.y += 0.1;
  });

  return (
    <group>
      {/* PCB */}
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.04, 0.25]} />
        <meshStandardMaterial color="#020617" roughness={0.8} />
      </mesh>
      {/* Shroud */}
      <mesh position={[0, -0.04, 0]} castShadow>
        <boxGeometry args={[0.62, 0.04, 0.27]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Fan 1 */}
      <group position={[-0.15, -0.07, 0]}>
        <mesh><torusGeometry args={[0.09, 0.015, 12, 24]} /><meshStandardMaterial color="#0f172a" /></mesh>
        <group ref={fanRef1}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={i} rotation={[0, (i * Math.PI * 2) / 6, 0]}>
              <mesh position={[0.05, 0, 0]} castShadow>
                <boxGeometry args={[0.07, 0.004, 0.025]} />
                <meshStandardMaterial color="#334155" />
              </mesh>
            </mesh>
          ))}
        </group>
      </group>
      {/* Fan 2 */}
      <group position={[0.15, -0.07, 0]}>
        <mesh><torusGeometry args={[0.09, 0.015, 12, 24]} /><meshStandardMaterial color="#0f172a" /></mesh>
        <group ref={fanRef2}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <mesh key={i} rotation={[0, (i * Math.PI * 2) / 6, 0]}>
              <mesh position={[0.05, 0, 0]} castShadow>
                <boxGeometry args={[0.07, 0.004, 0.025]} />
                <meshStandardMaterial color="#334155" />
              </mesh>
            </mesh>
          ))}
        </group>
      </group>
      {/* Backplate */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[0.62, 0.01, 0.27]} />
        <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* RGB Strip */}
      <mesh position={[0, -0.02, 0.135]}>
        <boxGeometry args={[0.55, 0.015, 0.005]} />
        <meshStandardMaterial color="#fff" emissive="#a855f7" emissiveIntensity={2} />
      </mesh>
      {/* PCIe connector */}
      <mesh position={[-0.28, 0, -0.12]}>
        <boxGeometry args={[0.06, 0.04, 0.08]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
}

// -- Main Component --

const PC_COMPONENTS = [
  { id: 'monitor', name: 'Monitor', stepIndex: 0, emoji: '🖥️', pos: [-1.6, -0.94, -0.5], rot: [0, 0.25, 0], scale: 1 },
  { id: 'keyboard', name: 'Keyboard', stepIndex: 1, emoji: '⌨️', pos: [-1.5, -0.92, 0.4], rot: [0, 0.1, 0], scale: 1 },
  { id: 'mouse', name: 'Mouse', stepIndex: 2, emoji: '🖱️', pos: [-0.8, -0.92, 0.45], rot: [0, -0.2, 0], scale: 1 },
  { id: 'mobo', name: 'Motherboard', stepIndex: 3, emoji: '🟩', pos: [0.6, -0.93, 0.3], rot: [0, 0, 0], scale: 0.8 },
  { id: 'cpu', name: 'CPU (Prosesor)', stepIndex: 4, emoji: '🧠', pos: [1.4, -0.92, -0.5], rot: [0, 0.3, 0], scale: 1.5 },
  { id: 'ram', name: 'RAM (Memori)', stepIndex: 5, emoji: '💾', pos: [1.7, -0.86, 0.3], rot: [0, 0, 0], scale: 1.2 },
  { id: 'cooler', name: 'CPU Cooler', stepIndex: 6, emoji: '❄️', pos: [0.1, -0.82, 0.6], rot: [0, 0, 0], scale: 0.8 },
  { id: 'psu', name: 'Power Supply (PSU)', stepIndex: 7, emoji: '🔌', pos: [1.8, -0.86, -0.3], rot: [0, -0.5, 0], scale: 0.9 },
  { id: 'ssd', name: 'SSD / Harddisk', stepIndex: 8, emoji: '💿', pos: [-0.5, -0.93, 0.6], rot: [0, 0.4, 0], scale: 1 },
  { id: 'gpu', name: 'GPU (Kartu Grafis)', stepIndex: 9, emoji: '🎮', pos: [0.6, -0.87, -0.5], rot: [0, 0, 0], scale: 0.8 },
];

export default function TIKPuzzle({ activeStepIndex, onSelectObject }) {
  const techGroupRef = useRef();
  const [hovered, setHovered] = useState(null);

  // Floating sci-fi cubes animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (techGroupRef.current) {
      techGroupRef.current.position.y = 1.2 + Math.sin(t * 2) * 0.1;
      techGroupRef.current.rotation.y = t * 0.5;
    }
  });

  const handleClick = (stepIndex) => {
    synth.playPop();
    onSelectObject(stepIndex);
  };

  const renderModel = (id) => {
    switch (id) {
      case 'monitor': return <MonitorModel />;
      case 'keyboard': return <KeyboardModel />;
      case 'mouse': return <MouseModel />;
      case 'mobo': return <MotherboardModel />;
      case 'cpu': return <CPUModel />;
      case 'ram': return <RAMModel />;
      case 'cooler': return <CoolerModel />;
      case 'psu': return <PSUModel />;
      case 'ssd': return <SSDModel />;
      case 'gpu': return <GPUModel />;
      default: return null;
    }
  };

  return (
    <>
      {/* -- Realistic Lab Environment -- */}
      <Environment preset="city" />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 3]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} />
      
      {/* Floor */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Wall */}
      <mesh position={[0, 0, -3]} receiveShadow>
        <boxGeometry args={[20, 10, 0.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>

      {/* Lab Desk */}
      <group position={[0, -1.0, 0]}>
        {/* Table Top */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5, 0.1, 2.5]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Table Legs */}
        <mesh position={[-2.3, -0.75, -1]} castShadow><boxGeometry args={[0.1, 1.5, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
        <mesh position={[2.3, -0.75, -1]} castShadow><boxGeometry args={[0.1, 1.5, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
        <mesh position={[-2.3, -0.75, 1]} castShadow><boxGeometry args={[0.1, 1.5, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
        <mesh position={[2.3, -0.75, 1]} castShadow><boxGeometry args={[0.1, 1.5, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
      </group>

      <ContactShadows position={[0, -0.94, 0]} opacity={0.5} scale={10} blur={2} far={4} />

      {/* Floating Digital Data Cubes for sci-fi learning feel */}
      <group ref={techGroupRef} position={[0, 1.2, -1.5]}>
        <mesh position={[-2.0, 0, 0]}><boxGeometry args={[0.15, 0.15, 0.15]} /><meshStandardMaterial color="#06b6d4" transparent opacity={0.6} wireframe emissive="#06b6d4" emissiveIntensity={2} /></mesh>
        <mesh position={[2.0, 0.4, 0.5]}><boxGeometry args={[0.1, 0.1, 0.1]} /><meshStandardMaterial color="#3b82f6" transparent opacity={0.6} wireframe emissive="#3b82f6" emissiveIntensity={2} /></mesh>
      </group>

      {/* All PC Components on Desk */}
      {PC_COMPONENTS.map((comp) => {
        const isActive = comp.stepIndex === activeStepIndex;
        const isHovered = hovered === comp.id;

        return (
          <group
            key={comp.id}
            position={comp.pos}
            rotation={comp.rot}
            scale={comp.scale}
            onClick={(e) => { e.stopPropagation(); handleClick(comp.stepIndex); }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(comp.id); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(null); document.body.style.cursor = 'auto'; }}
          >
            {renderModel(comp.id)}

            {/* Selection / Hover Glow */}
            {(isActive || isHovered) && (
              <mesh>
                <sphereGeometry args={[0.35, 16, 16]} />
                <meshBasicMaterial color={isActive ? '#22d3ee' : '#a855f7'} transparent opacity={0.15} wireframe />
              </mesh>
            )}

            {/* Label tag - always visible */}
            <Html distanceFactor={6} position={[0, 0.45, 0]} zIndexRange={[100, 0]}>
              <div
                className={`px-2 py-1 rounded text-[8px] font-black whitespace-nowrap shadow-md uppercase transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'bg-cyan-600 border border-cyan-300 text-white scale-110 shadow-[0_0_15px_#22d3ee]'
                    : isHovered
                    ? 'bg-purple-600 border border-purple-300 text-white scale-105 shadow-[0_0_10px_#a855f7]'
                    : 'bg-slate-900/90 border border-slate-600 text-slate-300'
                }`}
              >
                {comp.emoji} {comp.name}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Title Overlay */}
      <Html position={[0, 1.6, 0]} center distanceFactor={7} zIndexRange={[100, 0]}>
        <div className="px-4 py-2 rounded-full text-xs font-black uppercase shadow-[0_0_20px_rgba(6,182,212,0.4)] tracking-wider border whitespace-nowrap bg-slate-900/95 text-cyan-300 border-cyan-500 backdrop-blur-sm">
          Klik Komponen untuk Melihat Materi 🖥️
        </div>
      </Html>
    </>
  );
}
