import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { synth } from '../../../utils/audioSynth';

function RumahGadangModel() {
  const { scene } = useGLTF('/assets/rumah_gadang_sumatra_barat_indonesia.glb');
  const clone = React.useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
        child.material.depthWrite = true;
      }
    });
    return c;
  }, [scene]);
  return <primitive object={clone} position={[0, -0.85, 0]} scale={0.15} />;
}

function RumahJogloModel() {
  const { scene } = useGLTF('/assets/rumah_joglo_indonesia__option_2.glb');
  const clone = React.useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
        child.material.depthWrite = true;
      }
    });
    return c;
  }, [scene]);
  return <primitive object={clone} position={[0, -0.85, 0]} scale={2.5} rotation={[0, Math.PI / 2, 0]} />;
}

function RumahTongkonanModel() {
  const { scene } = useGLTF('/assets/tongkonan__toraja_house.glb');
  const clone = React.useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
        child.material.depthWrite = true;
      }
    });
    return c;
  }, [scene]);
  return <primitive object={clone} position={[0, -0.85, 0]} scale={0.9} rotation={[0, Math.PI, 0]} />;
}

function ApelModel() {
  const { scene } = useGLTF('/assets/apple.glb');
  const clone = React.useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
        child.material.depthWrite = true;
      }
    });
    return c;
  }, [scene]);
  return <primitive object={clone} position={[0, -0.5, 0]} scale={0.1} />;
}

function BukuModel() {
  // Procedural 3D book - GLB uses unsupported KHR_materials_pbrSpecularGlossiness
  return (
    <group position={[0, -0.2, 0]} rotation={[0.15, -0.3, 0]}>
      {/* Book cover - front */}
      <mesh castShadow position={[0, 0, 0.18]}>
        <boxGeometry args={[0.65, 0.85, 0.03]} />
        <meshStandardMaterial color="#1d4ed8" roughness={0.35} metalness={0.1} />
      </mesh>
      {/* Book cover - back */}
      <mesh castShadow position={[0, 0, -0.18]}>
        <boxGeometry args={[0.65, 0.85, 0.03]} />
        <meshStandardMaterial color="#1e40af" roughness={0.35} metalness={0.1} />
      </mesh>
      {/* Spine */}
      <mesh castShadow position={[-0.31, 0, 0]}>
        <boxGeometry args={[0.04, 0.85, 0.33]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.4} metalness={0.15} />
      </mesh>
      {/* Pages */}
      <mesh castShadow position={[0.01, 0, 0]}>
        <boxGeometry args={[0.58, 0.78, 0.3]} />
        <meshStandardMaterial color="#fef9ef" roughness={0.95} metalness={0} />
      </mesh>
      {/* Gold title bar on cover */}
      <mesh position={[0, 0.12, 0.196]}>
        <boxGeometry args={[0.42, 0.08, 0.005]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Gold decoration lines */}
      <mesh position={[0, -0.05, 0.196]}>
        <boxGeometry args={[0.35, 0.03, 0.005]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.12, 0.196]}>
        <boxGeometry args={[0.28, 0.03, 0.005]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.6} roughness={0.25} />
      </mesh>
    </group>
  );
}

function MejaModel() {
  const { scene } = useGLTF('/assets/meja_motif_unique.glb');
  const clone = React.useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
        child.material.depthWrite = true;
      }
    });
    return c;
  }, [scene]);
  return <primitive object={clone} position={[0, -0.5, 0]} scale={0.01} />;
}



function SubjectEnvironment({ subjectId, activeStepIndex }) {
  if (subjectId === 'indo-vocab') {
    return (
      <group>

      </group>
    );
  }

  if (subjectId === 'ips-culture') {
    return (
      <group>

      </group>
    );
  }

  if (subjectId === 'ppkn-pancasila') {
    return (
      <group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.16, 0]} receiveShadow>
          <circleGeometry args={[4.7, 72]} />
          <meshStandardMaterial color="#7f1d1d" roughness={0.82} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.13, 0]} receiveShadow>
          <ringGeometry args={[1.25, 4.4, 96]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.84} />
        </mesh>
        {[0, 1, 2, 3, 4].map((step) => {
          const angle = (step / 5) * Math.PI * 2 + Math.PI / 2;
          const active = step === activeStepIndex;
          return (
            <mesh key={step} position={[Math.cos(angle) * 2.7, -0.96, Math.sin(angle) * 2.7]} castShadow>
              <cylinderGeometry args={[active ? 0.18 : 0.12, active ? 0.18 : 0.12, 0.08, 24]} />
              <meshStandardMaterial color={active ? '#facc15' : '#fef3c7'} emissive={active ? '#854d0e' : '#000000'} emissiveIntensity={0.45} />
            </mesh>
          );
        })}
        <Html position={[0, 1.72, -2.35]} distanceFactor={8} center>
          <div className="bg-red-950/85 text-red-50 text-[10px] font-black px-3 py-1 rounded border border-red-300/40 whitespace-nowrap">
            Plaza Harmoni Pancasila
          </div>
        </Html>
      </group>
    );
  }

  if (subjectId === 'pjok-lokomotor') {
    return (
      <group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.16, 0]} receiveShadow>
          <planeGeometry args={[7.2, 4.8]} />
          <meshStandardMaterial color="#166534" roughness={0.95} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.13, 0]} receiveShadow>
          <ringGeometry args={[1.2, 2.2, 80]} />
          <meshStandardMaterial color="#dc2626" roughness={0.88} />
        </mesh>
        {[-1.4, 0, 1.4].map((x) => (
          <mesh key={x} position={[x, -0.86, 1.55]} castShadow>
            <coneGeometry args={[0.12, 0.28, 12]} />
            <meshStandardMaterial color="#fb923c" roughness={0.5} />
          </mesh>
        ))}
        <Html position={[0, 1.65, -2.15]} distanceFactor={8} center>
          <div className="bg-lime-950/85 text-lime-100 text-[10px] font-black px-3 py-1 rounded border border-lime-300/40 whitespace-nowrap">
            Arena Gerak Lokomotor
          </div>
        </Html>
      </group>
    );
  }

  return null;
}

export default function UniversalVRScene({ subjectId, activeStepIndex }) {
  const meshRef = useRef();
  const childRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();

  const [clickedTimes, setClickedTimes] = useState(0);
  const [typedWord, setTypedWord] = useState('');

  // Clear spelling progress when switching steps
  useEffect(() => {
    setTypedWord('');
  }, [subjectId, activeStepIndex]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth floating animation
    if (meshRef.current) {
      if (subjectId === 'ips-culture' || subjectId === 'indo-vocab') {
        meshRef.current.position.y = 0;
        meshRef.current.rotation.y = 0;
      } else {
        meshRef.current.position.y = Math.sin(t * 1.5) * 0.12;
        meshRef.current.rotation.y = t * 0.15;
      }
    }

    if (childRef.current) {
      if (subjectId === 'ppkn-pancasila') {
        if (activeStepIndex === 0) {
          // Bintang spin
          childRef.current.rotation.z = Math.sin(t) * 0.3;
        } else if (activeStepIndex === 2) {
          // Beringin tree sway
          childRef.current.rotation.z = Math.sin(t * 0.8) * 0.05;
        } else if (activeStepIndex === 1) {
          // Gold chain rotation
          childRef.current.rotation.y = Math.sin(t * 1.2) * 0.2;
        } else if (activeStepIndex === 3) {
          // Banteng head nod
          childRef.current.rotation.x = Math.sin(t * 2) * 0.1;
        } else if (activeStepIndex === 4) {
          // Padi & Kapas gentle wind wave
          childRef.current.rotation.z = Math.sin(t * 1.5) * 0.08;
        }
      }
      if (subjectId === 'pjok-lokomotor') {
        if (activeStepIndex === 0) {
          // Jumping up/down
          childRef.current.position.y = Math.abs(Math.sin(t * 3.0)) * 0.8 - 0.25;
          childRef.current.position.x = 0;
          childRef.current.rotation.z = 0;
          childRef.current.rotation.x = 0;
          if (leftLegRef.current) leftLegRef.current.rotation.x = 0.4;
          if (rightLegRef.current) rightLegRef.current.rotation.x = 0.4;
        } else if (activeStepIndex === 1) {
          // Running bobbing & leg swing
          childRef.current.position.y = -0.25 + Math.abs(Math.sin(t * 8.0)) * 0.12;
          childRef.current.position.x = 0;
          childRef.current.rotation.z = 0;
          childRef.current.rotation.x = 0.15; // Lean forward
          if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t * 8.0) * 0.7;
          if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(t * 8.0) * 0.7;
        } else if (activeStepIndex === 2) {
          // Sliding side-to-side slalom
          childRef.current.position.x = Math.sin(t * 3.0) * 0.8;
          childRef.current.position.y = -0.25;
          childRef.current.rotation.z = -Math.cos(t * 3.0) * 0.25; // Lean into the slide
          childRef.current.rotation.x = 0;
          if (leftLegRef.current) leftLegRef.current.rotation.x = -0.2;
          if (rightLegRef.current) rightLegRef.current.rotation.x = 0.2;
        }
      }
    }
  });

  const handleObjectClick = () => {
    synth.playPop();
    setClickedTimes(c => c + 1);

    if (subjectId === 'indo-vocab') {
      if (activeStepIndex === 0) {
        // Spell A-P-E-L
        const letters = ['A', 'P', 'E', 'L'];
        setTypedWord(prev => {
          if (prev.length >= 4 || prev.includes('B') || prev.includes('M')) return letters[0];
          const next = prev + letters[prev.length];
          if (next === 'APEL') synth.playCorrect();
          return next;
        });
      } else if (activeStepIndex === 1) {
        // Spell B-U-K-U
        const letters = ['B', 'U', 'K', 'U'];
        setTypedWord(prev => {
          if (prev.length >= 4 || prev.includes('A') || prev.includes('M')) return letters[0];
          const next = prev + letters[prev.length];
          if (next === 'BUKU') synth.playCorrect();
          return next;
        });
      } else {
        // Spell M-E-J-A
        const letters = ['M', 'E', 'J', 'A'];
        setTypedWord(prev => {
          if (prev.length >= 4 || prev.includes('B') || prev.includes('O')) return letters[0];
          const next = prev + letters[prev.length];
          if (next === 'MEJA') synth.playCorrect();
          return next;
        });
      }
    }
  };

  return (
    <>
      {/* Brightened 3-point lighting setup */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 7, 4]} intensity={2.2} castShadow />
      <pointLight position={[-4, 3, 2]} intensity={1.5} color="#38bdf8" />
      <hemisphereLight skyColor="#ffffff" groundColor="#1e293b" intensity={1.2} />

      <SubjectEnvironment subjectId={subjectId} activeStepIndex={activeStepIndex} />

      {/* Central subject podium */}
      {subjectId !== 'ips-culture' && subjectId !== 'indo-vocab' && (
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[2, 2.2, 0.3, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.38} metalness={0.45} />
        </mesh>
      )}

      <group ref={meshRef} position={[0, 0, 0]}>
        {/* BAHASA INDONESIA: Kebun Kosakata */}
        {subjectId === 'indo-vocab' && (
          <group onClick={handleObjectClick}>
            {activeStepIndex === 0 && (
              <Suspense fallback={
                <Html center>
                  <div className="text-white bg-black/60 px-3 py-1 rounded text-sm">Memuat Apel...</div>
                </Html>
              }>
                <ApelModel />
              </Suspense>
            )}

            {activeStepIndex === 1 && (
              <Suspense fallback={
                <Html center>
                  <div className="text-white bg-black/60 px-3 py-1 rounded text-sm">Memuat Buku...</div>
                </Html>
              }>
                <BukuModel />
              </Suspense>
            )}

            {activeStepIndex === 2 && (
              <Suspense fallback={
                <Html center>
                  <div className="text-white bg-black/60 px-3 py-1 rounded text-sm">Memuat Meja...</div>
                </Html>
              }>
                <MejaModel />
              </Suspense>
            )}

            {/* Spelling Tag */}
            <Html distanceFactor={6} position={[0, 1.0, 0]}>
              <div className="flex flex-col items-center gap-2">
                <span className="bg-emerald-650 text-white font-black text-2xl px-4 py-2 rounded-lg shadow-lg border-2 border-emerald-400">
                  {typedWord || 'Klik untuk Mengeja'}
                </span>
                <span className="text-base bg-slate-900/90 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap">
                  {activeStepIndex === 0 && "Ketuk buah untuk mengeja kata 'APEL'"}
                  {activeStepIndex === 1 && "Ketuk buku untuk mengeja kata 'BUKU'"}
                  {activeStepIndex === 2 && "Ketuk meja untuk mengeja kata 'MEJA'"}
                </span>
              </div>
            </Html>
          </group>
        )}

        {/* IPS: Rumah Adat */}
        {subjectId === 'ips-culture' && (
          <group onClick={handleObjectClick}>
            <Suspense fallback={
              <Html center>
                <div className="bg-slate-900/90 text-amber-400 text-[10px] font-black px-3 py-1.5 rounded-lg border border-slate-800 shadow-xl whitespace-nowrap flex items-center gap-2">
                  <div className="w-2.5 h-2.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                  Memuat Model 3D Rumah Adat...
                </div>
              </Html>
            }>
              {activeStepIndex === 0 && <RumahGadangModel />}
              {activeStepIndex === 1 && <RumahJogloModel />}
              {activeStepIndex === 2 && <RumahTongkonanModel />}
            </Suspense>

            <Html distanceFactor={6} position={[0, 1.2, 0]}>
              <div className="flex flex-col items-center gap-1">
                <span className="bg-amber-650 text-white font-black text-xs px-2.5 py-1 rounded shadow-lg border border-amber-400 whitespace-nowrap">
                  {activeStepIndex === 0 && "Rumah Gadang 🏠"}
                  {activeStepIndex === 1 && "Rumah Joglo 🏠"}
                  {activeStepIndex === 2 && "Rumah Tongkonan 🏠"}
                </span>
                <span className="text-[9px] bg-slate-900/90 text-slate-400 px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap">
                  Ketuk untuk memicu detail bangunan
                </span>
              </div>
            </Html>
          </group>
        )}

        {/* PPKN: Lambang Sila Pancasila - Expanded to all 5 Silan */}
        {subjectId === 'ppkn-pancasila' && (
          <group ref={childRef} onClick={handleObjectClick}>
            {/* Star halo rings */}
            {activeStepIndex === 0 && (
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
                <ringGeometry args={[1.3, 1.35, 32]} />
                <meshBasicMaterial color="#fef08a" transparent opacity={0.4} />
              </mesh>
            )}

            {activeStepIndex === 0 && (
              <>
                {/* Sila 1: Bintang Emas */}
                <mesh castShadow>
                  <torusGeometry args={[0.6, 0.08, 8, 32]} />
                  <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
                </mesh>
                <group rotation={[0, 0, 0]}>
                  <mesh castShadow>
                    <coneGeometry args={[0.35, 0.9, 5]} />
                    <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
                  </mesh>
                  <mesh castShadow rotation={[0, 0, Math.PI]}>
                    <coneGeometry args={[0.35, 0.9, 5]} />
                    <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
                  </mesh>
                </group>
              </>
            )}

            {activeStepIndex === 1 && (
              <group position={[0, -0.1, 0]}>
                {/* Sila 2: Rantai Emas (Interlinked torus rings) */}
                <mesh castShadow position={[-0.45, 0, 0]} rotation={[0, 0, 0]}>
                  <torusGeometry args={[0.22, 0.05, 8, 24]} />
                  <meshStandardMaterial color="#facc15" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh castShadow position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                  <torusGeometry args={[0.22, 0.05, 8, 24]} />
                  <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh castShadow position={[0.45, 0, 0]} rotation={[0, 0, 0]}>
                  <torusGeometry args={[0.22, 0.05, 8, 24]} />
                  <meshStandardMaterial color="#facc15" metalness={0.9} roughness={0.1} />
                </mesh>
              </group>
            )}

            {activeStepIndex === 2 && (
              <>
                {/* Sila 3: Pohon Beringin */}
                <mesh castShadow position={[0, -0.1, 0]}>
                  <cylinderGeometry args={[0.08, 0.14, 0.65]} />
                  <meshStandardMaterial color="#78350f" roughness={0.9} />
                </mesh>
                <mesh castShadow position={[0, 0.45, 0]}>
                  <sphereGeometry args={[0.45, 16, 16]} />
                  <meshStandardMaterial color="#15803d" roughness={0.95} />
                </mesh>
                <mesh castShadow position={[-0.32, 0.32, 0.1]}>
                  <sphereGeometry args={[0.3, 12, 12]} />
                  <meshStandardMaterial color="#16a34a" roughness={0.95} />
                </mesh>
                <mesh castShadow position={[0.32, 0.32, -0.1]}>
                  <sphereGeometry args={[0.3, 12, 12]} />
                  <meshStandardMaterial color="#16a34a" roughness={0.95} />
                </mesh>
                <mesh castShadow position={[0.0, 0.32, 0.3]}>
                  <sphereGeometry args={[0.28, 12, 12]} />
                  <meshStandardMaterial color="#15803d" roughness={0.95} />
                </mesh>
                <mesh castShadow position={[0.0, 0.32, -0.3]}>
                  <sphereGeometry args={[0.28, 12, 12]} />
                  <meshStandardMaterial color="#16a34a" roughness={0.95} />
                </mesh>
                <mesh position={[-0.2, 0.05, 0]}><cylinderGeometry args={[0.008, 0.008, 0.3]} /><meshStandardMaterial color="#a16207" /></mesh>
                <mesh position={[0.2, 0.05, 0]}><cylinderGeometry args={[0.008, 0.008, 0.3]} /><meshStandardMaterial color="#a16207" /></mesh>
                <mesh position={[0, 0.08, -0.2]}><cylinderGeometry args={[0.008, 0.008, 0.3]} /><meshStandardMaterial color="#a16207" /></mesh>
              </>
            )}

            {activeStepIndex === 3 && (
              <group position={[0, 0.15, 0]}>
                {/* Sila 4: Kepala Banteng (Low-poly black bull head) */}
                {/* Main Head structure */}
                <mesh castShadow>
                  <boxGeometry args={[0.55, 0.5, 0.45]} />
                  <meshStandardMaterial color="#1e293b" roughness={0.5} />
                </mesh>
                {/* Muzzle Snout */}
                <mesh position={[0, -0.18, 0.22]} castShadow>
                  <boxGeometry args={[0.32, 0.22, 0.15]} />
                  <meshStandardMaterial color="#94a3b8" />
                </mesh>
                {/* Left Horn */}
                <group position={[-0.24, 0.2, 0]} rotation={[0, 0, 0.45]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.04, 0.06, 0.3, 8]} />
                    <meshStandardMaterial color="#f1f5f9" />
                  </mesh>
                  {/* Curved horn tip */}
                  <mesh position={[0, 0.18, 0]} rotation={[0, 0, -0.45]} castShadow>
                    <coneGeometry args={[0.04, 0.15, 8]} />
                    <meshStandardMaterial color="#e2e8f0" />
                  </mesh>
                </group>
                {/* Right Horn */}
                <group position={[0.24, 0.2, 0]} rotation={[0, 0, -0.45]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.04, 0.06, 0.3, 8]} />
                    <meshStandardMaterial color="#f1f5f9" />
                  </mesh>
                  <mesh position={[0, 0.18, 0]} rotation={[0, 0, 0.45]} castShadow>
                    <coneGeometry args={[0.04, 0.15, 8]} />
                    <meshStandardMaterial color="#e2e8f0" />
                  </mesh>
                </group>
              </group>
            )}

            {activeStepIndex === 4 && (
              <group position={[0, -0.15, 0]}>
                {/* Sila 5: Padi dan Kapas (Rice stalk and Cotton blossom) */}
                {/* Central green stalk */}
                <mesh position={[-0.1, 0.2, 0]} castShadow>
                  <cylinderGeometry args={[0.015, 0.015, 0.85]} />
                  <meshStandardMaterial color="#16a34a" />
                </mesh>

                {/* Left side: Yellow Paddy grains */}
                <mesh position={[-0.2, 0.4, 0.05]} castShadow><boxGeometry args={[0.06, 0.06, 0.06]} /><meshStandardMaterial color="#facc15" /></mesh>
                <mesh position={[-0.22, 0.3, 0.05]} castShadow><boxGeometry args={[0.06, 0.06, 0.06]} /><meshStandardMaterial color="#eab308" /></mesh>
                <mesh position={[-0.2, 0.2, 0.05]} castShadow><boxGeometry args={[0.06, 0.06, 0.06]} /><meshStandardMaterial color="#facc15" /></mesh>
                <mesh position={[-0.24, 0.1, 0.05]} castShadow><boxGeometry args={[0.06, 0.06, 0.06]} /><meshStandardMaterial color="#eab308" /></mesh>

                {/* Right side: Fluffy White Cottons */}
                <mesh position={[0.08, 0.38, 0]} castShadow><sphereGeometry args={[0.12, 8, 8]} /><meshStandardMaterial color="#ffffff" roughness={0.9} /></mesh>
                <mesh position={[0.1, 0.22, 0]} castShadow><sphereGeometry args={[0.11, 8, 8]} /><meshStandardMaterial color="#ffffff" roughness={0.9} /></mesh>
                <mesh position={[0.07, 0.06, 0]} castShadow><sphereGeometry args={[0.1, 8, 8]} /><meshStandardMaterial color="#ffffff" roughness={0.9} /></mesh>
              </group>
            )}

            {/* Decorative Stars */}
            <mesh position={[-0.8, 0.7, -0.2]} castShadow>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.8, -0.6, -0.2]} castShadow>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={0.5} />
            </mesh>

            <Html distanceFactor={6} position={[0, 1.2, 0]}>
              <div className="flex flex-col items-center gap-1">
                <span className="bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded shadow-lg border border-red-400 whitespace-nowrap">
                  {activeStepIndex === 0 && "Sila ke-1: Bintang Emas ⭐"}
                  {activeStepIndex === 1 && "Sila ke-2: Rantai Emas 🔗"}
                  {activeStepIndex === 2 && "Sila ke-3: Pohon Beringin 🌳"}
                  {activeStepIndex === 3 && "Sila ke-4: Kepala Banteng 🐂"}
                  {activeStepIndex === 4 && "Sila ke-5: Padi & Kapas 🌾"}
                </span>
                <span className="text-[9px] bg-slate-900/90 text-slate-400 px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap text-center">
                  {activeStepIndex === 0 && "Lambang Ketuhanan Yang Maha Esa"}
                  {activeStepIndex === 1 && "Lambang Kemanusiaan Yang Adil dan Beradab"}
                  {activeStepIndex === 2 && "Lambang Persatuan Indonesia"}
                  {activeStepIndex === 3 && "Lambang Demokrasi dan Permusyawaratan"}
                  {activeStepIndex === 4 && "Lambang Kesejahteraan dan Keadilan Sosial"}
                </span>
              </div>
            </Html>
          </group>
        )}

        {/* PJOK: Gerak Lokomotor */}
        {subjectId === 'pjok-lokomotor' && (
          <group onClick={handleObjectClick}>
            {/* Flagpoles */}
            <group position={[-1.7, -0.4, -0.4]}>
              <mesh><cylinderGeometry args={[0.02, 0.02, 1.2]} /><meshStandardMaterial color="#cbd5e1" /></mesh>
              <mesh position={[-0.15, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.15, 0.3, 3]} /><meshBasicMaterial color="#ef4444" /></mesh>
            </group>
            <group position={[1.7, -0.4, -0.4]}>
              <mesh><cylinderGeometry args={[0.02, 0.02, 1.2]} /><meshStandardMaterial color="#cbd5e1" /></mesh>
              <mesh position={[0.15, 0.5, 0]} rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[0.15, 0.3, 3]} /><meshBasicMaterial color="#eab308" /></mesh>
            </group>

            {/* Running track */}
            <mesh position={[0, -0.6, 0]} receiveShadow>
              <boxGeometry args={[2.0, 0.05, 0.8]} />
              <meshStandardMaterial color="#ef4444" roughness={0.9} />
            </mesh>
            <mesh position={[0, -0.59, 0]}>
              <boxGeometry args={[2.0, 0.02, 0.03]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Cones obstacles */}
            <mesh position={[-0.7, -0.48, 0.25]} castShadow>
              <coneGeometry args={[0.08, 0.2, 8]} />
              <meshStandardMaterial color="#f97316" roughness={0.4} />
            </mesh>
            <mesh position={[0.7, -0.48, 0.25]} castShadow>
              <coneGeometry args={[0.08, 0.2, 8]} />
              <meshStandardMaterial color="#f97316" roughness={0.4} />
            </mesh>

            {/* Additional barrier hurdle for step 3 sliding */}
            {activeStepIndex === 2 && (
              <group position={[0, -0.45, 0]}>
                <mesh castShadow><boxGeometry args={[0.8, 0.15, 0.05]} /><meshStandardMaterial color="#facc15" /></mesh>
                <mesh position={[-0.35, -0.1, 0]}><cylinderGeometry args={[0.02, 0.02, 0.2]} /><meshStandardMaterial color="#475569" /></mesh>
                <mesh position={[0.35, -0.1, 0]}><cylinderGeometry args={[0.02, 0.02, 0.2]} /><meshStandardMaterial color="#475569" /></mesh>
              </group>
            )}

            {/* Humanoid runner */}
            <group ref={childRef}>
              <mesh position={[0, 0.2, 0]} castShadow>
                <boxGeometry args={[0.25, 0.45, 0.15]} />
                <meshStandardMaterial color="#facc15" />
              </mesh>
              <mesh position={[0, 0.55, 0]} castShadow>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#fef08a" />
              </mesh>
              <mesh ref={leftLegRef} position={[-0.08, -0.15, 0]} rotation={[0.4, 0, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.04, 0.4]} />
                <meshStandardMaterial color="#3b82f6" />
              </mesh>
              <mesh ref={rightLegRef} position={[0.08, -0.15, 0]} rotation={[0.4, 0, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.04, 0.4]} />
                <meshStandardMaterial color="#3b82f6" />
              </mesh>
            </group>

            <Html distanceFactor={6} position={[0, 1.2, 0]}>
              <div className="flex flex-col items-center gap-1">
                <span className="bg-yellow-500 text-slate-900 font-black text-xs px-2.5 py-1 rounded shadow-lg border border-yellow-300 whitespace-nowrap">
                  {activeStepIndex === 0 && "Gerak Melompat (Jumping) 🏃"}
                  {activeStepIndex === 1 && "Gerak Berlari (Sprinting) 🏃"}
                  {activeStepIndex === 2 && "Gerak Meluncur (Sliding) 🏃"}
                </span>
                <span className="text-[9px] bg-slate-900/90 text-slate-400 px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap">
                  Ketuk untuk melatih kekuatan motorik
                </span>
              </div>
            </Html>
          </group>
        )}
      </group>
    </>
  );
}
