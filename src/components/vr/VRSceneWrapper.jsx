import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR } from '@react-three/xr';
import { OrbitControls, Html } from '@react-three/drei';
import { ChevronLeft, Volume2, VolumeX } from 'lucide-react';
import { synth } from '../../utils/audioSynth';

import IPATataSurya from './scenes/IPATataSurya';
import MathGeometry from './scenes/MathGeometry';
import EnglishQuest from './scenes/EnglishQuest';
import SeniAngklung from './scenes/SeniAngklung';
import TIKPuzzle from './scenes/TIKPuzzle';
import VRInformatika from './scenes/VRInformatika';
import UniversalVRScene from './scenes/UniversalVRScene';
import MaterialBoard from '../ui/MaterialBoard';

export default function VRSceneWrapper({ subjectData, onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const activeStep = subjectData.steps[currentStep];
  const [isMuted, setIsMuted] = useState(synth.isMuted);

  const toggleMute = () => {
    const nextMuted = !synth.isMuted;
    synth.isMuted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      synth.init();
      synth.playPop();
    }
  };

  // Start background music loop on mount and clean up on exit
  useEffect(() => {
    synth.init();
    synth.startBackgroundMusic();
    return () => {
      synth.stopBackgroundMusic();
    };
  }, []);

  // Route 3D render component based on Subject ID
  const renderSubjectScene = () => {
    switch (subjectData.id) {
      case 'ipa-tata-surya':
        return <IPATataSurya activeStepIndex={currentStep} onSelectObject={setCurrentStep} />;
      case 'math-geometry':
        return <MathGeometry activeStepIndex={currentStep} />;
      case 'english-zoo':
        return <EnglishQuest activeStepIndex={currentStep} onSelectObject={setCurrentStep} />;
      case 'seni-angklung':
        return <SeniAngklung activeStepIndex={currentStep} />;
      case 'tik-hardware':
        return <TIKPuzzle activeStepIndex={currentStep} onSelectObject={setCurrentStep} />;
      case 'informatika-ai':
        return <VRInformatika activeStepIndex={currentStep} onSelectObject={setCurrentStep} />;
      default:
        return <UniversalVRScene subjectId={subjectData.id} activeStepIndex={currentStep} />;
    }
  };

  const themeBgColor = subjectData.bgColor || '#090d16';

  return (
    <div
      className="w-full h-[calc(100vh-80px)] flex flex-col md:flex-row overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: themeBgColor }}
    >

      {/* 3D Scene Viewport (60% Width) */}
      <div className="w-full md:w-[60%] h-[50vh] md:h-full relative">

        {/* WebXR Enter Button Overlay */}
        <div className="absolute top-4 left-4 z-20 flex gap-2 items-center">
          <button
            onClick={() => { synth.playPop(); onBack(); }}
            className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold p-2.5 rounded-2xl shadow-lg border border-slate-800 flex items-center justify-center gap-1.5 transition-all text-xs"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Papan
          </button>

          <button
            onClick={toggleMute}
            className={`font-bold p-2.5 rounded-2xl shadow-lg border flex items-center justify-center gap-1.5 transition-all text-xs ${
              isMuted
                ? 'bg-rose-950/90 hover:bg-rose-900 border-rose-800 text-rose-300 shadow-rose-900/20'
                : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-200'
            }`}
            title={isMuted ? "Aktifkan suara" : "Senyapkan suara"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isMuted ? 'Suara Mati' : 'Suara Aktif'}</span>
          </button>
        </div>

        {/* Sketchfab Embed for Pancasila or Canvas for others */}
        {subjectData.id === 'pancasila' || subjectData.id === 'ppkn-pancasila' ? (
          <div className="sketchfab-embed-wrapper" style={{ position: 'relative', width: '100%', height: '100%', background: '#000' }}>
            <iframe
              title="Makna Setiap Sila pada Lambang Garuda Pancasila"
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking="true"
              execution-while-out-of-viewport="true"
              execution-while-not-rendered="true"
              web-share="true"
              src="https://sketchfab.com/models/61e8462e9a0c4979a517fba0efd858e4/embed"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            ></iframe>
            <p style={{ position: 'absolute', bottom: 0, left: 0, right: 0, fontSize: '11px', fontWeight: 'normal', margin: 0, padding: '4px 8px', color: '#999', background: 'rgba(0,0,0,0.7)', zIndex: 5 }}>
              <a href="https://sketchfab.com/3d-models/makna-setiap-sila-pada-lambang-garuda-pancasila-61e8462e9a0c4979a517fba0efd858e4?utm_medium=embed&utm_campaign=share-popup&utm_content=61e8462e9a0c4979a517fba0efd858e4" target="_blank" rel="nofollow" style={{ fontWeight: 'bold', color: '#1CAAD9' }}>
                Makna Setiap Sila pada Lambang Garuda Pancasila
              </a>{' '}by{' '}
              <a href="https://sketchfab.com/dwie04?utm_medium=embed&utm_campaign=share-popup&utm_content=61e8462e9a0c4979a517fba0efd858e4" target="_blank" rel="nofollow" style={{ fontWeight: 'bold', color: '#1CAAD9' }}>dwie04</a>{' '}on{' '}
              <a href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=61e8462e9a0c4979a517fba0efd858e4" target="_blank" rel="nofollow" style={{ fontWeight: 'bold', color: '#1CAAD9' }}>Sketchfab</a>
            </p>
          </div>
        ) : (
          <>
            {/* WebXR Canvas */}
            <VRButton className="xr-btn-custom absolute bottom-4 left-4 z-20 bg-cyan-500 hover:bg-cyan-600 text-white font-black px-5 py-3 rounded-2xl shadow-xl transition-all text-xs" />

            <Canvas
              shadows
              camera={{ position: [0, 1.8, 5.5], fov: 50 }}
              onPointerDown={() => synth.init()} // Wake audio context on click
            >
              {/* Apply dynamic canvas background color */}
              <color attach="background" args={[themeBgColor]} />

              <XR>
                <Suspense fallback={<Loader3D />}>

                  {/* Active 3D Subject Scene */}
                  {renderSubjectScene()}

                  {/* Fog matches the dynamic background color for smooth boundary fading */}
                  {subjectData.id !== 'ips-culture' && subjectData.id !== 'indo-vocab' && (
                    <fog attach="fog" args={[themeBgColor, 8, 25]} />
                  )}
                </Suspense>

                {/* Orbit Camera Controls for Non-VR Desktop view */}
                <OrbitControls
                  enablePan={false}
                  minDistance={2.5}
                  maxDistance={12}
                  target={[-0.5, 0.4, 0]}
                  maxPolarAngle={Math.PI / 2 + 0.1} // Limit underfloor viewing
                />
              </XR>
            </Canvas>
          </>
        )}
      </div>

      {/* Material & Explanation Panel (40% Width) */}
      <div
        className="w-full md:w-[40%] h-[50vh] md:h-full p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 overflow-y-auto transition-colors duration-500"
        style={{ backgroundColor: `${themeBgColor}e0`, backdropFilter: 'blur(10px)' }}
      >
        <MaterialBoard
          subject={subjectData.subject}
          badgeColor={subjectData.badgeColor}
          step={activeStep}
          currentStep={currentStep}
          totalSteps={subjectData.steps.length}
          onNext={() => {
            synth.playPop();
            setCurrentStep(prev => Math.min(prev + 1, subjectData.steps.length - 1));
          }}
          onPrev={() => {
            synth.playPop();
            setCurrentStep(prev => Math.max(prev - 1, 0));
          }}
        />
      </div>

    </div>
  );
}

function Loader3D() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-cyan-400">
        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black text-xs tracking-wider uppercase">Memuat Dunia 3D...</p>
      </div>
    </Html>
  );
}
