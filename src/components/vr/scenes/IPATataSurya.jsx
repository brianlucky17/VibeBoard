import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { synth } from '../../../utils/audioSynth';

export default function IPATataSurya({ activeStepIndex, onSelectObject }) {
  const sunRef = useRef();
  const mixer = useRef();
  const planetRefs = useRef({});
  const labelGroups = useRef({});

  const [hovered, setHovered] = useState(null);

  const planets = [
    { id: 'mercury', name: 'Merkurius', stepIndex: 1, emoji: '☄️' },
    { id: 'venus', name: 'Venus', stepIndex: 1, emoji: '🟡' },
    { id: 'earth', name: 'Bumi', stepIndex: 2, emoji: '🌍' },
    { id: 'mars', name: 'Mars', stepIndex: 3, emoji: '🔴' },
    { id: 'jupiter', name: 'Yupiter', stepIndex: 4, emoji: '🟠' },
    { id: 'saturn', name: 'Saturnus', stepIndex: 4, emoji: '🪐' },
    { id: 'uranus', name: 'Uranus', stepIndex: 5, emoji: '🔵' },
    { id: 'neptune', name: 'Neptunus', stepIndex: 5, emoji: '🌀' }
  ];

  // GLB Solar System (Gunakan asset dari public/assets)
  const { scene: solarScene, animations } = useGLTF('/assets/solar_system_animation.glb');
  const [solarRoot] = useState(() => solarScene.clone(true));

  // Inisialisasi Mixer Animasi untuk Orbit Planet bawaan GLB
  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(solarRoot);
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.setLoop(THREE.LoopRepeat);
        action.clampWhenFinished = false;
        action.play();
      });
      mixer.current.timeScale = 0.4; // Perlambat gerakan orbit agar lebih tenang dan realistis
    }
    return () => {
      if (mixer.current) mixer.current.stopAllAction();
    };
  }, [solarRoot, animations]);

  // Petakan node planet dari GLTF ke refs agar posisi label sinkron dengan pergerakan orbit
  useEffect(() => {
    solarRoot.traverse((child) => {
      const name = child.name.toLowerCase();
      if (name.includes('mercury_2')) planetRefs.current['mercury'] = child;
      else if (name.includes('venus_5')) planetRefs.current['venus'] = child;
      else if (name.includes('erath_8')) planetRefs.current['earth'] = child;
      else if (name.includes('moon_31')) planetRefs.current['moon'] = child;
      else if (name.includes('mars_12')) planetRefs.current['mars'] = child;
      else if (name.includes('jupiter_15')) planetRefs.current['jupiter'] = child;
      else if (name.includes('saturn_19')) planetRefs.current['saturn'] = child;
      else if (name.includes('uranus_22')) planetRefs.current['uranus'] = child;
      else if (name.includes('neptune_25')) planetRefs.current['neptune'] = child;
      else if (name.includes('pluto_28')) planetRefs.current['pluto'] = child;
      else if (name.includes('sun_53')) {
        planetRefs.current['sun'] = child;
        sunRef.current = child;
      }
    });
  }, [solarRoot]);

  // Frame animation loop
  useFrame((state, delta) => {
    // 1. Jalankan orbit planet bawaan GLTF
    if (mixer.current) {
      mixer.current.update(delta);
    }

    // 2. Putar matahari procedural (untuk latar belakang/efek jika ada)
    if (sunRef.current) {
      const t = state.clock.getElapsedTime();
      sunRef.current.rotation.y = t * 0.02; // Rotasi matahari diperlambat agar lebih tenang
      // Model GLTF asli memiliki scale sun_53 sebesar ~6.0.
      const baseScale = 5.997050762176514 * 1;
      const pulse = baseScale * (1.0 + Math.sin(t * 1.5) * 0.02);
      sunRef.current.scale.set(pulse, pulse, pulse);
    }

    // 3. Sinkronkan posisi 3D Label Group ke koordinat dunia (World Position) planet yang mengorbit
    const tempV = new THREE.Vector3();
    Object.keys(planetRefs.current).forEach((key) => {
      const node = planetRefs.current[key];
      const labelGrp = labelGroups.current[key];
      if (node && labelGrp) {
        node.getWorldPosition(tempV);
        labelGrp.position.copy(tempV);
      }
    });

    // 4. Rotasi planet pada porosnya (self-rotation) - Diperlambat dan diputar pada level mesh anak (child)
    // agar putarannya terus-menerus dan tidak ter-reset/terputus saat animasi orbit GLTF melakukan loop.
    const rotationSpeeds = {
      mercury: 0.05,
      venus: -0.03,
      earth: 0.08,
      moon: 0.02,
      mars: 0.06,
      jupiter: 0.15,
      saturn: 0.12,
      uranus: -0.09,
      neptune: 0.1,
      pluto: 0.02
    };

    Object.keys(planetRefs.current).forEach((key) => {
      const node = planetRefs.current[key];
      if (node && key !== 'sun') {
        const speed = rotationSpeeds[key] || 0.05;
        // Rotasikan child meshes untuk menghindari reset rotasi dari mixer orbit parent
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            child.rotation.y += delta * speed;
          });
        } else {
          node.rotation.y += delta * speed;
        }
      }
    });
  });

  const handlePlanetClick = (stepIndex) => {
    synth.playPop();
    onSelectObject(stepIndex);
  };

  // Handler klik objek GLTF
  const handleObjectClick = (event) => {
    event.stopPropagation();
    let current = event.object;
    let planetId = null;

    // Telusuri hierarki parent untuk mendeteksi planet mana yang diklik
    while (current) {
      const name = current.name.toLowerCase();
      if (name.includes('sun_53') || name.includes('object_56')) { planetId = 'sun'; break; }
      else if (name.includes('mercury_2') || name.includes('object_5')) { planetId = 'mercury'; break; }
      else if (name.includes('venus_5') || name.includes('object_8')) { planetId = 'venus'; break; }
      else if (name.includes('erath_8') || name.includes('object_11')) { planetId = 'earth'; break; }
      else if (name.includes('moon_31') || name.includes('object_34')) { planetId = 'moon'; break; }
      else if (name.includes('mars_12') || name.includes('object_14')) { planetId = 'mars'; break; }
      else if (name.includes('jupiter_15') || name.includes('object_17')) { planetId = 'jupiter'; break; }
      else if (name.includes('saturn_19') || name.includes('object_20') || name.includes('saturn_ring_18') || name.includes('object_22')) { planetId = 'saturn'; break; }
      else if (name.includes('uranus_22') || name.includes('object_25')) { planetId = 'uranus'; break; }
      else if (name.includes('neptune_25') || name.includes('object_28')) { planetId = 'neptune'; break; }
      else if (name.includes('pluto_28') || name.includes('object_31')) { planetId = 'pluto'; break; }
      current = current.parent;
    }

    if (planetId) {
      if (planetId === 'sun') {
        handlePlanetClick(0);
      } else {
        const planetObj = planets.find((p) => p.id === planetId);
        if (planetObj) {
          handlePlanetClick(planetObj.stepIndex);
        }
      }
    }
  };

  // Handler hover masuk objek GLTF
  const handlePointerOver = (event) => {
    event.stopPropagation();
    let current = event.object;
    let planetId = null;

    while (current) {
      const name = current.name.toLowerCase();
      if (name.includes('sun_53') || name.includes('object_56')) { planetId = 'sun'; break; }
      else if (name.includes('mercury_2') || name.includes('object_5')) { planetId = 'mercury'; break; }
      else if (name.includes('venus_5') || name.includes('object_8')) { planetId = 'venus'; break; }
      else if (name.includes('erath_8') || name.includes('object_11')) { planetId = 'earth'; break; }
      else if (name.includes('moon_31') || name.includes('object_34')) { planetId = 'moon'; break; }
      else if (name.includes('mars_12') || name.includes('object_14')) { planetId = 'mars'; break; }
      else if (name.includes('jupiter_15') || name.includes('object_17')) { planetId = 'jupiter'; break; }
      else if (name.includes('saturn_19') || name.includes('object_20') || name.includes('saturn_ring_18') || name.includes('object_22')) { planetId = 'saturn'; break; }
      else if (name.includes('uranus_22') || name.includes('object_25')) { planetId = 'uranus'; break; }
      else if (name.includes('neptune_25') || name.includes('object_28')) { planetId = 'neptune'; break; }
      else if (name.includes('pluto_28') || name.includes('object_31')) { planetId = 'pluto'; break; }
      current = current.parent;
    }

    if (planetId) {
      setHovered(planetId);
    }
  };

  // Handler hover keluar objek GLTF
  const handlePointerOut = (event) => {
    setHovered(null);
  };

  return (
    <>
      {/* Background Bintang */}
      <Stars radius={100} depth={50} count={3000} factor={6} saturation={0.5} fade speed={2} />

      {/* Pencahayaan Realistis */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={3.5} distance={30} color="#ffaa00" castShadow />
      <directionalLight position={[3, 10, 5]} intensity={1.8} color="#cbd5e1" />
      <directionalLight position={[-3, -10, -5]} intensity={0.8} color="#93c5fd" />

      {/* GLB Visual Tata Surya */}
      <Suspense fallback={null}>
        <primitive
          object={solarRoot}
          position={[0, 0, 0]}
          scale={0.15}
          onClick={handleObjectClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
      </Suspense>

      {/* HTML Labels & Click Targets yang Bergerak Mengikuti Planet di GLTF */}
      {planets.map((planet) => {
        const isLabelVisible = planet.stepIndex === activeStepIndex;
        const isHovered = hovered === planet.id;

        return (
          <group
            key={planet.id}
            ref={(el) => (labelGroups.current[planet.id] = el)}
          >
            {(isLabelVisible || isHovered) && (
              <Html distanceFactor={8} position={[0, 1.2, 0]}>
                <div className="bg-slate-900/90 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg border border-slate-700 whitespace-nowrap select-none">
                  {planet.name} {planet.emoji}
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* Label Matahari (Step 0) */}
      <group ref={(el) => (labelGroups.current['sun'] = el)}>
        {(activeStepIndex === 0 || hovered === 'sun') && (
          <Html distanceFactor={8} position={[0, 1.5, 0]}>
            <div className="bg-slate-900/90 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg border border-slate-700 whitespace-nowrap select-none">
              Matahari ☀️
            </div>
          </Html>
        )}
      </group>
    </>
  );
}
