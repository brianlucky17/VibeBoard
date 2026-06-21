import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { synth } from '../../../utils/audioSynth';

const SHAPES = [
  {
    key: 'cube',
    title: 'Kubus (Cube)',
    details: '6 Sisi - 12 Rusuk - 8 Titik Sudut',
    color: '#7c3aed',
    accent: '#facc15'
  },
  {
    key: 'cone',
    title: 'Kerucut (Cone)',
    details: '2 Sisi - 1 Rusuk Lengkung - 1 Puncak',
    color: '#c084fc',
    accent: '#22d3ee'
  },
  {
    key: 'pyramid',
    title: 'Limas Segiempat (Pyramid)',
    details: '5 Sisi - 8 Rusuk - 5 Titik Sudut',
    color: '#38bdf8',
    accent: '#fb7185'
  },
  {
    key: 'cuboid',
    title: 'Balok (Cuboid)',
    details: '6 Sisi - 12 Rusuk - 8 Titik Sudut',
    color: '#10b981',
    accent: '#f97316'
  },
  {
    key: 'cylinder',
    title: 'Tabung (Cylinder)',
    details: '3 Sisi - 2 Rusuk Lengkung - 0 Titik Sudut',
    color: '#06b6d4',
    accent: '#fde047'
  },
  {
    key: 'sphere',
    title: 'Bola (Sphere)',
    details: '1 Sisi Lengkung - 0 Rusuk - 0 Titik Sudut',
    color: '#f43f5e',
    accent: '#a7f3d0'
  }
];

const COLOR_CHOICES = ['#7c3aed', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

function InfoTag({ shape }) {
  return (
    <Html distanceFactor={6} position={[0, 1.55, 0]}>
      <div className="flex flex-col items-center gap-1">
        <div className="bg-purple-600/90 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg border border-purple-400 whitespace-nowrap">
          {shape.title}
        </div>
        <div className="text-[10px] bg-slate-900/90 text-slate-300 font-bold px-2 py-0.5 rounded shadow border border-slate-700 whitespace-nowrap">
          {shape.details}
        </div>
      </div>
    </Html>
  );
}

function Marker({ position, label, color = '#facc15' }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} />
      </mesh>
      <Text position={[0, 0.16, 0]} fontSize={0.12} color="#ffffff" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

function SolidCube({ color, accent, onClick }) {
  return (
    <group>
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow onClick={onClick}>
        <boxGeometry args={[1.25, 1.25, 1.25]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.12} />
        <Edges color="#ffffff" lineWidth={2} />
      </mesh>
      <Marker position={[0.63, 0.75, 0.63]} label="sudut" color={accent} />
      <Text position={[0, -0.72, 0.72]} fontSize={0.16} color="#e0f2fe" anchorX="center">
        semua rusuk sama panjang
      </Text>
    </group>
  );
}

function SolidCone({ color, accent, onClick }) {
  return (
    <group>
      <mesh position={[0, 0.13, 0]} castShadow receiveShadow onClick={onClick}>
        <coneGeometry args={[0.78, 1.55, 64]} />
        <meshStandardMaterial color={color} roughness={0.38} metalness={0.08} />
      </mesh>
      <mesh position={[0, -0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.018, 10, 96]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.25} />
      </mesh>
      <Marker position={[0, 0.9, 0]} label="puncak" color={accent} />
      <Text position={[0, -0.93, 0.82]} fontSize={0.16} color="#e0f2fe" anchorX="center">
        alas lingkaran dan selimut lengkung
      </Text>
    </group>
  );
}

function SolidPyramid({ color, accent, onClick }) {
  const sideGeometry = useMemo(() => {
    const half = 0.72;
    const baseY = -0.62;
    const apexY = 0.86;
    const vertices = new Float32Array([
      -half, baseY, half, half, baseY, half, 0, apexY, 0,
      half, baseY, half, half, baseY, -half, 0, apexY, 0,
      half, baseY, -half, -half, baseY, -half, 0, apexY, 0,
      -half, baseY, -half, -half, baseY, half, 0, apexY, 0
    ]);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const baseGeometry = useMemo(() => {
    const half = 0.72;
    const baseY = -0.62;
    const vertices = new Float32Array([
      -half, baseY, -half, half, baseY, -half, half, baseY, half,
      -half, baseY, -half, half, baseY, half, -half, baseY, half
    ]);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <group>
      <mesh geometry={sideGeometry} castShadow receiveShadow onClick={onClick}>
        <meshStandardMaterial color={color} roughness={0.42} metalness={0.08} flatShading />
        <Edges color="#ffffff" lineWidth={2} />
      </mesh>
      <mesh geometry={baseGeometry} castShadow receiveShadow onClick={onClick}>
        <meshStandardMaterial color="#1d4ed8" roughness={0.45} />
        <Edges color="#bfdbfe" lineWidth={2} />
      </mesh>
      <Marker position={[0, 0.85, 0]} label="puncak" color={accent} />
      <Text position={[0, -0.9, 0.85]} fontSize={0.16} color="#e0f2fe" anchorX="center">
        alas persegi, 4 sisi segitiga
      </Text>
    </group>
  );
}

function SolidCuboid({ color, accent, onClick }) {
  return (
    <group>
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow onClick={onClick}>
        <boxGeometry args={[1.7, 0.95, 1.15]} />
        <meshStandardMaterial color={color} roughness={0.34} metalness={0.1} />
        <Edges color="#ffffff" lineWidth={2} />
      </mesh>
      <Marker position={[0.85, 0.52, 0.58]} label="sudut" color={accent} />
      <Text position={[0, -0.72, 0.8]} fontSize={0.16} color="#e0f2fe" anchorX="center">
        panjang, lebar, dan tinggi
      </Text>
    </group>
  );
}

function SolidCylinder({ color, accent, onClick }) {
  return (
    <group>
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow onClick={onClick}>
        <cylinderGeometry args={[0.7, 0.7, 1.35, 64]} />
        <meshStandardMaterial color={color} roughness={0.34} metalness={0.1} />
      </mesh>
      {[-0.63, 0.73].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.018, 10, 96]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.25} />
        </mesh>
      ))}
      <Text position={[0, -0.9, 0.8]} fontSize={0.16} color="#e0f2fe" anchorX="center">
        dua alas lingkaran sejajar
      </Text>
    </group>
  );
}

function SolidSphere({ color, accent, onClick }) {
  return (
    <group>
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow onClick={onClick}>
        <sphereGeometry args={[0.78, 64, 32]} />
        <meshStandardMaterial color={color} roughness={0.32} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.79, 0.012, 10, 96]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
      <Text position={[0, -0.9, 0.75]} fontSize={0.16} color="#e0f2fe" anchorX="center">
        semua titik permukaan berjarak sama dari pusat
      </Text>
    </group>
  );
}

export default function MathGeometry({ activeStepIndex }) {
  const containerRef = useRef();
  const symbolRefs = useRef([]);
  const [shapeColors, setShapeColors] = useState(SHAPES.map((shape) => shape.color));

  const mathSymbols = [
    { char: '+', pos: [-2.5, 1.2, -1.5], color: '#f43f5e' },
    { char: '-', pos: [2.5, 0.8, -1.8], color: '#3b82f6' },
    { char: 'x', pos: [-2.2, 0.4, 1.5], color: '#10b981' },
    { char: ':', pos: [2.2, 1.5, 1.2], color: '#f59e0b' },
    { char: '=', pos: [0, 2.0, -2.5], color: '#8b5cf6' }
  ];

  const activeShape = SHAPES[activeStepIndex] || SHAPES[0];
  const activeColor = shapeColors[activeStepIndex] || activeShape.color;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (containerRef.current) {
      containerRef.current.rotation.y = t * 0.16;
      containerRef.current.position.y = 0.2 + Math.sin(t * 1.1) * 0.04;
    }

    mathSymbols.forEach((sym, idx) => {
      const el = symbolRefs.current[idx];
      if (el) {
        el.position.y = sym.pos[1] + Math.sin(t * 1.5 + idx) * 0.15;
        el.rotation.y = t * 0.5 + idx;
      }
    });
  });

  const handleShapeClick = () => {
    synth.playPop();
    setShapeColors((prev) => {
      const next = [...prev];
      const currentChoiceIndex = COLOR_CHOICES.indexOf(next[activeStepIndex]);
      next[activeStepIndex] = COLOR_CHOICES[(currentChoiceIndex + 1) % COLOR_CHOICES.length];
      return next;
    });
  };

  const renderActiveShape = () => {
    const props = { color: activeColor, accent: activeShape.accent, onClick: handleShapeClick };

    switch (activeShape.key) {
      case 'cone':
        return <SolidCone {...props} />;
      case 'pyramid':
        return <SolidPyramid {...props} />;
      case 'cuboid':
        return <SolidCuboid {...props} />;
      case 'cylinder':
        return <SolidCylinder {...props} />;
      case 'sphere':
        return <SolidSphere {...props} />;
      case 'cube':
      default:
        return <SolidCube {...props} />;
    }
  };

  return (
    <>
      <gridHelper args={[15, 15, '#8b5cf6', '#334155']} position={[0, -1.5, 0]} opacity={0.35} transparent />

      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 6, 4]} intensity={2.2} castShadow />
      <pointLight position={[-3, 2, -2]} intensity={1.5} color="#c084fc" />
      <hemisphereLight skyColor="#ffffff" groundColor="#334155" intensity={1.2} />

      <group ref={containerRef} position={[0, 0.2, 0]}>
        <mesh position={[0, -1.2, 0]} receiveShadow>
          <cylinderGeometry args={[2, 2.2, 0.2, 32]} />
          <meshStandardMaterial color="#334155" roughness={0.1} metalness={0.8} />
        </mesh>

        <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.01, 2.1, 48]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>

        <mesh position={[-1.45, -0.95, 0.8]} castShadow>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#facc15" roughness={0.3} />
        </mesh>
        <mesh position={[1.45, -0.86, 0.8]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.42, 24]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.3} />
        </mesh>

        {renderActiveShape()}
        <InfoTag shape={activeShape} />
      </group>

      {mathSymbols.map((sym, idx) => (
        <group
          key={idx}
          ref={(el) => { symbolRefs.current[idx] = el; }}
          position={sym.pos}
        >
          <Text fontSize={0.6} color={sym.color} anchorX="center" anchorY="middle">
            {sym.char}
          </Text>
        </group>
      ))}
    </>
  );
}
