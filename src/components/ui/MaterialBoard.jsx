import React, { useEffect, useState } from 'react';
import { synth } from '../../utils/audioSynth';
import { Volume2, VolumeX, ArrowLeft, ArrowRight } from 'lucide-react';

export default function MaterialBoard({
  subject,
  badgeColor,
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrev
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Helper to stop all speech engines
  const stopAllSpeech = () => {
    window.isTTSCancelled = true;
    if (window.responsiveVoice && typeof window.responsiveVoice.cancel === 'function') {
      window.responsiveVoice.cancel();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (window.currentAudioTTS) {
      window.currentAudioTTS.pause();
      window.currentAudioTTS.onended = null;
      window.currentAudioTTS = null;
    }
    setIsPlaying(false);
  };

  // Autoplay on mount or step change
  useEffect(() => {
    stopAllSpeech();
    setAutoplayBlocked(false);
    
    // Attempt autoplay after a short delay to let voices and DOM initialize
    const timer = setTimeout(() => {
      playVoiceover(true);
    }, 600);

    return () => {
      clearTimeout(timer);
      stopAllSpeech();
    };
  }, [step]);

  // Warm up voices cache on mount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
  }, []);

  const playResponsiveVoice = (text, isAutoplay = false) => {
    const startSpeaking = () => {
      if (window.isTTSCancelled) {
        setIsPlaying(false);
        return;
      }
      if (window.responsiveVoice && typeof window.responsiveVoice.speak === 'function') {
        window.responsiveVoice.speak(text, "Indonesian Female", {
          rate: 1.0,
          pitch: 1.0,
          onstart: () => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          },
          onend: () => {
            setIsPlaying(false);
          },
          onerror: (err) => {
            console.error("ResponsiveVoice error:", err);
            setIsPlaying(false);
            if (isAutoplay) {
              setAutoplayBlocked(true);
            }
          }
        });
      } else {
        setIsPlaying(false);
        if (isAutoplay) {
          setAutoplayBlocked(true);
        }
      }
    };

    if (window.responsiveVoice) {
      startSpeaking();
    } else {
      // Dynamically load responsivevoice from official CDN
      const script = document.createElement('script');
      script.src = "https://code.responsivevoice.org/responsivevoice.js?key=8p1M3K1A";
      script.async = true;
      script.onload = () => {
        // Wait a small moment for responsivevoice to initialize after script load
        setTimeout(startSpeaking, 200);
      };
      script.onerror = () => {
        setIsPlaying(false);
        if (isAutoplay) {
          setAutoplayBlocked(true);
        }
      };
      document.head.appendChild(script);
    }
  };

  const playLocalSpeech = (text, bypassIndonesianCheck = false, isAutoplay = false) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      let voices = window.speechSynthesis.getVoices();

      const speakText = () => {
        if (window.isTTSCancelled) {
          setIsPlaying(false);
          return;
        }

        // Strict filtering to ensure only true Indonesian voices are selected
        const indonesianVoices = voices.filter(voice => {
          const langLower = voice.lang.toLowerCase();
          const nameLower = voice.name.toLowerCase();
          
          // Must match Indonesian code 'id' or contain Indonesian names, avoiding English names containing 'id' (like David)
          const isIdLang = langLower === 'id' || langLower.startsWith('id-') || langLower.startsWith('id_');
          const hasIndoName = nameLower.includes('indonesia') || nameLower.includes('gadis') || nameLower.includes('andika') || nameLower.includes('ardi');
          
          return isIdLang || hasIndoName;
        });

        // If no Indonesian voice is installed locally, use Google TTS / ResponsiveVoice instead of English TTS
        if (indonesianVoices.length === 0 && !bypassIndonesianCheck) {
          console.warn("Tidak ada suara Bahasa Indonesia lokal. Mencoba Google TTS...");
          
          // Split text and play Google TTS
          const rawPhrases = text.split(/[,.!?]/g).map(s => s.trim()).filter(Boolean);
          const chunks = [];
          let currentChunk = "";
          for (const phrase of rawPhrases) {
            if ((currentChunk + " " + phrase).length > 130) {
              chunks.push(currentChunk.trim());
              currentChunk = phrase;
            } else {
              currentChunk = currentChunk ? (currentChunk + ", " + phrase) : phrase;
            }
          }
          if (currentChunk.trim()) chunks.push(currentChunk.trim());
          
          playGoogleTTS(chunks, text, isAutoplay);
          return;
        }

        // If bypassed check (because Google TTS failed) but still no local Indonesian voices, use ResponsiveVoice cloud TTS
        if (indonesianVoices.length === 0) {
          console.warn("Tidak ada suara Indonesia lokal setelah bypass, menggunakan cloud ResponsiveVoice...");
          playResponsiveVoice(text, isAutoplay);
          return;
        }

        // 1. Target the ultra-realistic "Gadis Online (Natural)" voice (TikTok aesthetic)
        let selectedVoice = indonesianVoices.find(voice => {
          const nameLower = voice.name.toLowerCase();
          return nameLower.includes('gadis') && nameLower.includes('natural');
        });

        // 2. Target any other online natural female voice
        if (!selectedVoice) {
          selectedVoice = indonesianVoices.find(voice => {
            const nameLower = voice.name.toLowerCase();
            return nameLower.includes('natural') && !nameLower.includes('andika') && !nameLower.includes('male');
          });
        }

        // 3. Target standard local Gadis or Google female voice
        if (!selectedVoice) {
          selectedVoice = indonesianVoices.find(voice => {
            const nameLower = voice.name.toLowerCase();
            return nameLower.includes('gadis') || nameLower.includes('female') || nameLower.includes('google');
          });
        }

        // 4. Default to any non-male Indonesian voice
        if (!selectedVoice && indonesianVoices.length > 0) {
          selectedVoice = indonesianVoices.find(voice => !voice.name.toLowerCase().includes('andika'));
        }

        // 5. Hard fallback
        if (!selectedVoice && indonesianVoices.length > 0) {
          selectedVoice = indonesianVoices[0];
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.lang = selectedVoice.lang;
        } else {
          utterance.lang = 'id-ID';
        }

        // Voice character tuning: Standard Indonesian female (20-35 years)
        // Speak at moderate speed (130-150 WPM) and natural, clear, professional pitch
        utterance.rate = 1.0;    // Moderate standard speed for clear articulation
        utterance.pitch = 1.0;   // Natural, mature, and professional tone (20-35 years)

        utterance.onstart = () => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        };
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = (e) => {
          console.warn("SpeechSynthesis error details:", e);
          setIsPlaying(false);
          if (isAutoplay) {
            setAutoplayBlocked(true);
          }
        };

        window.speechSynthesis.speak(utterance);

        // Safari and Chrome sometimes silently block TTS on autoplay without throwing onerror.
        // We verify if it is actually speaking after a brief delay.
        if (isAutoplay) {
          setTimeout(() => {
            if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
              setIsPlaying(false);
              setAutoplayBlocked(true);
            }
          }, 350);
        }
      };

      if (voices.length === 0) {
        // If voices not loaded yet, wait for them
        const handleVoicesChanged = () => {
          voices = window.speechSynthesis.getVoices();
          speakText();
          window.speechSynthesis.onvoiceschanged = null;
        };
        window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
        // Fallback speak in case event doesn't fire
        setTimeout(() => {
          if (voices.length === 0) {
            speakText();
          }
        }, 150);
      } else {
        speakText();
      }
    } else {
      setIsPlaying(false);
      if (isAutoplay) {
        setAutoplayBlocked(true);
      }
    }
  };

  const playGoogleTTS = (chunks, fullText, isAutoplay = false) => {
    let chunkIndex = 0;
    
    // Get or create hidden audio element in DOM to bypass some browser object constraints
    let audio = document.getElementById('tts-audio-element');
    if (!audio) {
      audio = document.createElement('audio');
      audio.id = 'tts-audio-element';
      audio.style.display = 'none';
      document.body.appendChild(audio);
    }

    const playNextChunk = () => {
      if (window.isTTSCancelled) {
        setIsPlaying(false);
        return;
      }

      if (chunkIndex >= chunks.length) {
        setIsPlaying(false);
        return;
      }

      const text = chunks[chunkIndex];
      // Use local Indonesian Google Translate TTS endpoint
      const primaryUrl = `https://translate.google.co.id/translate_tts?ie=UTF-8&tl=id&client=tw-ob&q=${encodeURIComponent(text)}`;
      const backupUrl = `https://translate.googleapis.com/translate_tts?client=gtx&sl=id&tl=id&ie=UTF-8&q=${encodeURIComponent(text)}`;

      window.currentAudioTTS = audio;
      audio.src = primaryUrl;

      // Clean up previous event listeners
      audio.onended = null;
      audio.onerror = null;

      audio.onended = () => {
        if (window.isTTSCancelled) {
          setIsPlaying(false);
          return;
        }
        chunkIndex++;
        playNextChunk();
      };

      audio.onerror = (e) => {
        if (window.isTTSCancelled) return;
        
        // If primary URL fails, attempt backup URL before dropping to ResponsiveVoice
        if (audio.src.includes('translate.google.co.id')) {
          console.warn("Primary Google Indonesia TTS failed, trying backup API domain...");
          audio.src = backupUrl;
          audio.play()
            .then(() => {
              setIsPlaying(true);
              setAutoplayBlocked(false);
            })
            .catch(err => {
              console.warn("Backup Google API TTS failed, falling back to ResponsiveVoice:", err);
              window.currentAudioTTS = null;
              playResponsiveVoice(fullText, isAutoplay);
            });
        } else {
          console.warn("All Google TTS endpoints offline, falling back to ResponsiveVoice:", e);
          window.currentAudioTTS = null;
          playResponsiveVoice(fullText, isAutoplay);
        }
      };

      audio.play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch((err) => {
          if (window.isTTSCancelled) return;
          
          // If autoplay blocks primary, try backup
          console.warn("Autoplay blocked or failed on primary, trying backup...");
          audio.src = backupUrl;
          audio.play()
            .then(() => {
              setIsPlaying(true);
              setAutoplayBlocked(false);
            })
            .catch(playErr => {
              console.warn("Audio autoplay blocked for all Google TTS, falling back to ResponsiveVoice:", playErr);
              window.currentAudioTTS = null;
              playResponsiveVoice(fullText, isAutoplay);
            });
        });
    };

    playNextChunk();
  };

  const triggerTTSFlow = (isAutoplay = false) => {
    // Dynamic social-media-style narrator intro and outro for kids engagement
    const introHook = `Halo teman-teman! Sekarang kita belajar tentang ${step.title}.`;
    const coreExplanation = `${step.info}`;
    const factsIntro = `Fakta unik menariknya: ${step.facts.join('. ')}`;
    const outroHook = `Wah, seru banget kan materi kali ini? Sampai jumpa di materi berikutnya ya!`;

    const textToRead = `${introHook} ${coreExplanation} ${factsIntro} ${outroHook}`;

    playLocalSpeech(textToRead, false, isAutoplay);
  };

  const playVoiceover = (isAutoplay = false) => {
    if (!isAutoplay) {
      synth.playPop();
    }

    if (isPlaying && !isAutoplay) {
      stopAllSpeech();
      return;
    }

    // Stop previous and prepare new session
    stopAllSpeech();
    window.isTTSCancelled = false; // Permit playback to begin
    setIsPlaying(true);
    setAutoplayBlocked(false);

    // If step has custom ElevenLabs audio file (audioUrl), play it!
    if (step.audioUrl) {
      const audio = new Audio(step.audioUrl);
      window.currentAudioTTS = audio;
      audio.onended = () => {
        setIsPlaying(false);
        window.currentAudioTTS = null;
      };
      audio.onerror = (e) => {
        console.warn("Custom audio file failed to load, falling back to TTS:", e);
        window.currentAudioTTS = null;
        triggerTTSFlow(isAutoplay);
      };
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay blocked for custom audio, falling back to TTS:", err);
          window.currentAudioTTS = null;
          triggerTTSFlow(isAutoplay);
        });
      return;
    }

    triggerTTSFlow(isAutoplay);
  };

  return (
    <div className="flex flex-col h-full justify-between text-slate-100 font-sans">

      {/* Top Section: Header & Progress Bar */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow ${badgeColor}`}>
            📚 {subject}
          </span>
          <span className="text-xs text-slate-400 font-bold bg-slate-900 px-3 py-1 rounded-full">
            Langkah {currentStep + 1} dari {totalSteps}
          </span>
        </div>

        {/* Dynamic Progress indicator */}
        <div className="w-full bg-slate-900 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {/* Autoplay Blocked Notification */}
        {autoplayBlocked && (
          <div className="mb-4 p-3 bg-rose-950/80 border border-rose-800/40 rounded-2xl flex items-center justify-between gap-3 text-xs text-rose-300 font-bold animate-[pulse_2s_infinite]">
            <div className="flex items-center gap-2">
              <span>📢</span>
              <span>Klik tombol audio untuk memulai narasi.</span>
            </div>
            <button
              onClick={() => setAutoplayBlocked(false)}
              className="px-2.5 py-1 rounded-xl bg-rose-900/50 hover:bg-rose-800/60 border border-rose-700/50 text-[10px] text-rose-200 transition-colors"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Title and Info */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h2 className="text-2xl font-black text-white leading-tight tracking-tight">
            {step.title}
          </h2>

          <button
            onClick={() => playVoiceover(false)}
            className={`px-3 py-2 rounded-xl flex items-center gap-2 border hover:scale-105 active:scale-95 transition-all text-xs font-black whitespace-nowrap shadow-md ${
              isPlaying
                ? 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-yellow-400 animate-[pulse_2.5s_infinite]'
                : 'bg-rose-950 hover:bg-rose-900 border-rose-700 text-rose-300'
            }`}
            title={isPlaying ? "Matikan Audio" : "Nyalakan Audio"}
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{isPlaying ? 'Matikan Audio' : 'Nyalakan Audio'}</span>
          </button>
        </div>

        {/* Explanatory text */}
        <p className="text-sm font-semibold text-slate-300 leading-relaxed mb-6 bg-slate-900/50 p-4 rounded-2xl border border-slate-900">
          {step.info}
        </p>

        {/* Fun Facts section */}
        <div className="mb-6">
          <h3 className="text-xs text-yellow-400 font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
            ✨ Fakta Menarik
          </h3>
          <ul className="space-y-2">
            {step.facts.map((fact, idx) => (
              <li key={idx} className="text-xs text-slate-400 font-bold flex items-start gap-2 leading-relaxed">
                <span className="text-yellow-500 mt-0.5">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section: Previous & Next Buttons */}
      <div className="flex gap-3 mt-4 border-t border-slate-900 pt-5">
        <button
          disabled={currentStep === 0}
          onClick={onPrev}
          className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl font-black text-xs transition-transform transform active:scale-95 shadow-lg border border-slate-800 ${currentStep === 0 ? 'bg-slate-900 text-slate-600 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-850 text-white hover:-translate-x-0.5'}`}
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <button
          disabled={currentStep === totalSteps - 1}
          onClick={onNext}
          className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl font-black text-xs transition-transform transform active:scale-95 shadow-lg ${currentStep === totalSteps - 1 ? 'bg-slate-900 text-slate-600 border border-slate-850 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-yellow-950 hover:translate-x-0.5 shadow-yellow-500/10'}`}
        >
          Lanjut <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
