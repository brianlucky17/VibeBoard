import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

import { synth } from '../../../utils/audioSynth';

const CLASSROOM_ITEMS = [
  { id: 'book', label: 'Book', meaning: 'Buku', position: [-2.7, 0.35, -1.1], color: '#2563eb' },
  { id: 'pencil', label: 'Pencil', meaning: 'Pensil', position: [-1.1, 0.45, -1.25], color: '#f59e0b' },
  { id: 'bag', label: 'Bag', meaning: 'Tas', position: [0.65, 0.55, -1.25], color: '#ef4444' },
  { id: 'chair', label: 'Chair', meaning: 'Kursi', position: [2.35, 0.65, -1.05], color: '#a16207' },
  { id: 'desk', label: 'Desk', meaning: 'Meja', position: [-2.15, 0.72, 1.1], color: '#92400e' },
  { id: 'clock', label: 'Clock', meaning: 'Jam', position: [-0.35, 1.15, 1.0], color: '#e5e7eb' },
  { id: 'globe', label: 'Globe', meaning: 'Globe', position: [1.2, 0.9, 1.0], color: '#22c55e' },
  { id: 'ruler', label: 'Ruler', meaning: 'Penggaris', position: [2.85, 0.4, 1.05], color: '#facc15' },
];

function ClassroomItem({ item, index, active, hovered, onClick, onHover }) {
  const ref = useRef();
  const isFocused = active || hovered;

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();
    const targetScale = active ? 1.18 : hovered ? 1.08 : 1;
    ref.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.14);
    ref.current.position.y = item.position[1] + (active ? Math.sin(t * 3.2 + index) * 0.06 : 0);
    ref.current.rotation.y += active ? 0.012 : 0.003;
  });

  return (
    <group
      ref={ref}
      position={item.position}
      onClick={(event) => {
        event.stopPropagation();
        onClick(item, index);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(item.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = 'default';
      }}
    >
      <ItemMesh item={item} />

      {isFocused && (
        <Html position={[0, 1.1, 0]} distanceFactor={7} center>
          <div className="bg-slate-950/90 text-white text-[10px] font-black px-2.5 py-1 rounded shadow-lg border border-sky-300/50 whitespace-nowrap select-none">
            {item.label} <span className="text-sky-200">({item.meaning})</span>
          </div>
        </Html>
      )}
    </group>
  );
}

function ItemMesh({ item }) {
  switch (item.id) {
    case 'book':
      return (
        <group rotation={[0.08, -0.25, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.0, 0.16, 0.72]} />
            <meshStandardMaterial color={item.color} roughness={0.72} />
          </mesh>
          <mesh position={[0.03, 0.09, 0]} castShadow>
            <boxGeometry args={[0.9, 0.04, 0.64]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.9} />
          </mesh>
          <mesh position={[-0.48, 0.13, 0]} castShadow>
            <boxGeometry args={[0.05, 0.08, 0.72]} />
            <meshStandardMaterial color="#1e3a8a" />
          </mesh>
        </group>
      );
    case 'pencil':
      return (
        <group rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1.25, 24]} />
            <meshStandardMaterial color={item.color} roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.72, 0]} castShadow>
            <coneGeometry args={[0.1, 0.28, 24]} />
            <meshStandardMaterial color="#f5deb3" roughness={0.65} />
          </mesh>
          <mesh position={[0, -0.72, 0]} castShadow>
            <cylinderGeometry args={[0.085, 0.085, 0.22, 24]} />
            <meshStandardMaterial color="#fca5a5" roughness={0.6} />
          </mesh>
        </group>
      );
    case 'bag':
      return (
        <group>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.75, 0.9, 0.42]} />
            <meshStandardMaterial color={item.color} roughness={0.75} />
          </mesh>
          <mesh position={[0, 0.52, 0]} castShadow>
            <torusGeometry args={[0.26, 0.035, 12, 32, Math.PI]} />
            <meshStandardMaterial color="#7f1d1d" />
          </mesh>
          <mesh position={[0, -0.05, 0.23]} castShadow>
            <boxGeometry args={[0.45, 0.32, 0.05]} />
            <meshStandardMaterial color="#fecaca" roughness={0.7} />
          </mesh>
        </group>
      );
    case 'chair':
      return (
        <group>
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.78, 0.14, 0.72]} />
            <meshStandardMaterial color={item.color} roughness={0.78} />
          </mesh>
          <mesh position={[0, 0.72, -0.32]} castShadow receiveShadow>
            <boxGeometry args={[0.78, 0.95, 0.12]} />
            <meshStandardMaterial color={item.color} roughness={0.78} />
          </mesh>
          {[-0.3, 0.3].map((x) =>
            [-0.24, 0.24].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, -0.38, z]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.85, 12]} />
                <meshStandardMaterial color="#78350f" />
              </mesh>
            ))
          )}
        </group>
      );
    case 'desk':
      return (
        <group>
          <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.25, 0.16, 0.8]} />
            <meshStandardMaterial color={item.color} roughness={0.82} />
          </mesh>
          {[-0.48, 0.48].map((x) =>
            [-0.28, 0.28].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, -0.35, z]} castShadow>
                <cylinderGeometry args={[0.045, 0.045, 0.92, 12]} />
                <meshStandardMaterial color="#451a03" />
              </mesh>
            ))
          )}
        </group>
      );
    case 'clock':
      return (
        <group rotation={[0.15, 0.15, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.08, 48]} />
            <meshStandardMaterial color={item.color} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.045, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.36, 48]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.09, 0]} rotation={[0, 0, -0.75]} castShadow>
            <boxGeometry args={[0.035, 0.025, 0.26]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0.1, 0.1, 0]} rotation={[0, 0, 0.2]} castShadow>
            <boxGeometry args={[0.025, 0.02, 0.22]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      );
    case 'globe':
      return (
        <group>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.45, 48, 24]} />
            <meshStandardMaterial color="#2563eb" roughness={0.58} />
          </mesh>
          <mesh rotation={[0.4, 0.15, 0.9]} castShadow>
            <torusGeometry args={[0.49, 0.025, 12, 64]} />
            <meshStandardMaterial color="#eab308" metalness={0.2} roughness={0.45} />
          </mesh>
          <mesh position={[0, -0.56, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.3, 0.16, 32]} />
            <meshStandardMaterial color="#475569" roughness={0.55} />
          </mesh>
          <mesh position={[-0.15, 0.1, 0.38]} castShadow>
            <sphereGeometry args={[0.11, 16, 8]} />
            <meshStandardMaterial color={item.color} roughness={0.7} />
          </mesh>
        </group>
      );
    case 'ruler':
      return (
        <group rotation={[0.03, -0.4, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.35, 0.08, 0.22]} />
            <meshStandardMaterial color={item.color} roughness={0.58} />
          </mesh>
          {[-0.45, -0.2, 0.05, 0.3, 0.55].map((x) => (
            <mesh key={x} position={[x, 0.055, 0.08]} castShadow>
              <boxGeometry args={[0.025, 0.025, 0.12]} />
              <meshStandardMaterial color="#854d0e" />
            </mesh>
          ))}
        </group>
      );
    default:
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color={item.color} />
        </mesh>
      );
  }
}

export default function EnglishQuest({ activeStepIndex, onSelectObject }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const activeItem = CLASSROOM_ITEMS[activeStepIndex] || CLASSROOM_ITEMS[0];

  const handleItemClick = (item, index) => {
    synth.playPop();
    synth.playAngklung(240 + index * 45);
    onSelectObject?.(index);
  };

  return (
    <>
      <ambientLight intensity={0.85} />
      <hemisphereLight skyColor="#dbeafe" groundColor="#64748b" intensity={1.0} />
      <directionalLight position={[4, 7, 5]} intensity={1.8} castShadow />
      <pointLight position={[-3, 3, 2]} intensity={0.9} color="#fde68a" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
        <planeGeometry args={[8, 5.4]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.86} />
      </mesh>

      <mesh position={[0, 1.3, -2.05]} receiveShadow>
        <boxGeometry args={[7.2, 2.6, 0.12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>

      <mesh position={[0, 1.42, -1.96]} receiveShadow>
        <boxGeometry args={[3.2, 1.35, 0.08]} />
        <meshStandardMaterial color="#0f766e" roughness={0.92} />
      </mesh>

      <Html position={[0, 2.23, -1.9]} center distanceFactor={8}>
        <div className="bg-slate-950/85 text-white text-[11px] font-black px-3 py-1 rounded shadow-lg border border-sky-200/30 whitespace-nowrap select-none">
          English Classroom Quest
        </div>
      </Html>

      {CLASSROOM_ITEMS.map((item, index) => (
        <ClassroomItem
          key={item.id}
          item={item}
          index={index}
          active={activeItem.id === item.id}
          hovered={hoveredItem === item.id}
          onClick={handleItemClick}
          onHover={setHoveredItem}
        />
      ))}

      <Html position={[0, 0.35, 2.25]} center distanceFactor={8}>
        <div className="bg-slate-950/80 text-sky-50 text-[11px] font-black px-3 py-1.5 rounded shadow-lg border border-sky-300/30 whitespace-nowrap select-none">
          Ketuk benda kelas untuk membuka kosakata bahasa Inggris
        </div>
      </Html>
    </>
  );
}
