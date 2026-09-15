// Web Audio API procedural sound engine
// 100% self-contained, no external audio files needed, works offline and instantly!

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  // Play a soft wooden click / typewriter clack
  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // "Aha! The Clouseau Discovery!"
  playInspectorAha() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  }

  // Classic dog bark / "woof woof"
  playPlayfulBark() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.14].forEach((delay) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now + delay);
      osc.frequency.exponentialRampToValueAtTime(140, now + delay + 0.1);

      gain.gain.setValueAtTime(0.25, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.12);
    });
  }

  // Deep gruff / grumpy big dog bark ("RUFF! RUFF!")
  playDeepGruffBark() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.17].forEach((delay, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      const baseFreq = i === 0 ? 190 : 155;
      osc.frequency.setValueAtTime(baseFreq, now + delay);
      osc.frequency.exponentialRampToValueAtTime(50, now + delay + 0.15);

      gain.gain.setValueAtTime(0.35, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.16);
    });
  }

  // High-pitched sassy yippy bark / beagle & small hound ("YIP-YAP!")
  playYippyBark() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.09, 0.2].forEach((delay) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, now + delay);
      osc.frequency.exponentialRampToValueAtTime(260, now + delay + 0.08);

      gain.gain.setValueAtTime(0.22, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.09);
    });
  }

  // Grumpy growl-bark ("GRRR-WOOF!")
  playGrowlBark() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Low rumble growl
    const growl = this.ctx.createOscillator();
    const growlGain = this.ctx.createGain();
    growl.type = 'sawtooth';
    growl.frequency.setValueAtTime(85, now);
    growl.frequency.linearRampToValueAtTime(115, now + 0.15);
    growlGain.gain.setValueAtTime(0.18, now);
    growlGain.gain.linearRampToValueAtTime(0.01, now + 0.2);
    growl.connect(growlGain);
    growlGain.connect(this.ctx.destination);
    growl.start(now);
    growl.stop(now + 0.2);

    // Followed by sharp snap bark
    const bark = this.ctx.createOscillator();
    const barkGain = this.ctx.createGain();
    bark.type = 'sawtooth';
    bark.frequency.setValueAtTime(290, now + 0.16);
    bark.frequency.exponentialRampToValueAtTime(95, now + 0.3);
    barkGain.gain.setValueAtTime(0.3, now + 0.16);
    barkGain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
    bark.connect(barkGain);
    barkGain.connect(this.ctx.destination);
    bark.start(now + 0.16);
    bark.stop(now + 0.32);
  }

  // Hound howl baying at golfers ("AWOOOOO!")
  playHoundHowl() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(430, now + 0.22);
    osc.frequency.exponentialRampToValueAtTime(175, now + 0.65);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.7);
  }

  // Play a random nasty bark matching dog species or picking dynamically
  playRandomDogBark(speciesId = null) {
    if (speciesId === 'doodle') {
      // Doodle the Golden Retriever: deep gruff barks & growl-barks
      Math.random() > 0.4 ? this.playDeepGruffBark() : this.playGrowlBark();
    } else if (speciesId === 'enzo') {
      // Enzo the Hound: long baying hound howl or deep bark
      Math.random() > 0.45 ? this.playHoundHowl() : this.playDeepGruffBark();
    } else if (speciesId === 'mariah') {
      // Mariah the sassy Beagle: sharp yippy barks or snarl-barks
      Math.random() > 0.45 ? this.playYippyBark() : this.playGrowlBark();
    } else {
      const styles = [
        () => this.playDeepGruffBark(),
        () => this.playYippyBark(),
        () => this.playGrowlBark(),
        () => this.playHoundHowl(),
        () => this.playPlayfulBark(),
      ];
      styles[Math.floor(Math.random() * styles.length)]();
    }
  }

  // Grand celebratory fanfare when a location is locked in!
  playFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Classic celebratory triumph motif: Sol-Do-Mi-Sol!
    const chord = [
      { f: 392.00, t: 0, d: 0.15 },    // G4
      { f: 523.25, t: 0.16, d: 0.18 }, // C5
      { f: 659.25, t: 0.35, d: 0.2 },  // E5
      { f: 783.99, t: 0.56, d: 0.6 }   // G5 (held long and proud)
    ];

    chord.forEach(({ f, t, d }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0, now + t);
      gain.gain.linearRampToValueAtTime(0.3, now + t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d + 0.05);
    });
  }

  // Full celebratory triumph fanfare with extra sparkle
  playFullCelebration() {
    this.playFanfare();
    setTimeout(() => {
      this.playInspectorAha();
    }, 400);
  }

  // "Does your dog bite?" gag stinger
  playMysterySting() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(180, now);
    osc1.frequency.exponentialRampToValueAtTime(90, now + 0.4);

    osc2.frequency.setValueAtTime(185, now);
    osc2.frequency.exponentialRampToValueAtTime(92, now + 0.4);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  }

  // Soft comic bump / "boop" sound when a dog bumps into a card
  playBoop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.1);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }
}

export const sound = new SoundEngine();
