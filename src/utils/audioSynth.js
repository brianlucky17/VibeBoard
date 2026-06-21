// Web Audio API Synthesizer for self-contained, lightweight sound effects.

class AudioSynth {
  constructor() {
    this.ctx = null;
    this.bgmInterval = null;
    this.isMuted = false; // Unmuted by default, will play after user interaction
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startBackgroundMusic() {
    this.init();
    if (this.bgmInterval) return;

    // Soft nursery chime melody arpeggio for children (C major/F major/G major transition)
    const melody = [
      523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
      987.77, 783.99, 659.25, 523.25,  // B5, G5, E5, C5
      698.46, 880.00, 1046.50, 880.00, // F5, A5, C6, A5
      783.99, 659.25, 587.33, 783.99   // G5, E5, D5, G5
    ];
    let index = 0;

    const playNextNote = () => {
      if (this.isMuted) return; // Silent if muted globally
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
        return;
      }
      
      const freq = melody[index];
      index = (index + 1) % melody.length;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'triangle'; // Soft flute/music box timbre
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Volume 50% BGM setting (clear but pleasant background hum)
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.4);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.5);
    };

    // Note trigger speed: every 700ms for a calm background pace
    this.bgmInterval = setInterval(playNextNote, 700);
    playNextNote();
  }

  stopBackgroundMusic() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  playPop() {
    if (this.isMuted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playCorrect() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const playBell = (freq, delay, duration) => {
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.5, now + delay); // harmonic fifth

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.2, now + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);

      osc.start(now + delay);
      osc2.start(now + delay);
      osc.stop(now + delay + duration);
      osc2.stop(now + delay + duration);
    };

    playBell(523.25, 0, 0.4);      // C5
    playBell(659.25, 0.08, 0.5);   // E5
    playBell(783.99, 0.16, 0.6);   // G5
    playBell(1046.50, 0.24, 0.8);  // C6 (high octave chime!)
  }

  playWrong() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.3);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(152, now);
    osc2.frequency.linearRampToValueAtTime(112, now + 0.3);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);

    osc.start();
    osc.stop(now + 0.3);
    osc2.start();
    osc2.stop(now + 0.3);
  }

  playAngklung(freq) {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;

    const playBambooTubes = (f) => {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(f, now);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(f * 2.0, now); 

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc1.frequency.setValueAtTime(f, now);
      osc1.frequency.linearRampToValueAtTime(f + Math.sin(now * 30) * 4, now + 0.6);

      osc1.start();
      osc2.start();
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
    };

    playBambooTubes(freq);
  }
}

export const synth = new AudioSynth();
