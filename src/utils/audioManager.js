import { MUSIC_TRACKS } from '../data/musicTracks';

class AudioManager {
  constructor() {
    this.audio = null;
    this.tracks = MUSIC_TRACKS;
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.65; // Pleasant default
    this.listeners = new Set();
    this.hasUserInteracted = false;
    this.isInitialized = false;

    // Load persisted preferences if in browser
    if (typeof window !== 'undefined') {
      try {
        const savedMuted = localStorage.getItem('birthday_music_muted');
        if (savedMuted !== null) this.isMuted = savedMuted === 'true';

        const savedVol = localStorage.getItem('birthday_music_volume');
        if (savedVol !== null) this.volume = parseFloat(savedVol);

        const savedTrack = localStorage.getItem('birthday_music_track');
        if (savedTrack) {
          const idx = this.tracks.findIndex((t) => t.id === savedTrack);
          if (idx !== -1) this.currentTrackIndex = idx;
        }
      } catch {
        // Ignore storage errors
      }

      // Add one-time user interaction listener to allow autoplay
      const unlockAudio = () => {
        this.hasUserInteracted = true;
        if (!this.isPlaying && !this.isMuted) {
          this.play();
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };

      window.addEventListener('click', unlockAudio, { once: true, passive: true });
      window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
      window.addEventListener('keydown', unlockAudio, { once: true, passive: true });

      // Attempt immediate play on load in case browser permits it
      setTimeout(() => {
        if (!this.isPlaying && !this.isMuted) {
          this.play().catch(() => {});
        }
      }, 500);
    }
  }

  init() {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.audio.volume = this.isMuted ? 0 : this.volume;
    const cleanSrc = this.currentTrack.src.startsWith('/') ? this.currentTrack.src.slice(1) : this.currentTrack.src;
    this.audio.src = `${import.meta.env.BASE_URL}${cleanSrc}`;

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audio.addEventListener('ended', () => {
      // Loop to next track automatically
      this.nextTrack(true);
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Audio playback error:', e);
      this.isPlaying = false;
      this.notify();
    });

    this.isInitialized = true;
  }

  get currentTrack() {
    return this.tracks[this.currentTrackIndex] || this.tracks[0];
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((cb) => {
      try {
        cb(state);
      } catch (err) {
        console.error('Error in audio listener:', err);
      }
    });
  }

  getState() {
    return {
      track: this.currentTrack,
      tracks: this.tracks,
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    };
  }

  async play() {
    this.init();
    if (!this.audio) return;

    try {
      this.audio.volume = this.isMuted ? 0 : this.volume;
      await this.audio.play();
      this.isPlaying = true;
    } catch (err) {
      console.warn('Autoplay blocked or waiting for gesture:', err);
      this.isPlaying = false;
    }
    this.notify();
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setMuted(muted) {
    this.isMuted = Boolean(muted);
    if (this.audio) {
      this.audio.volume = this.isMuted ? 0 : this.volume;
    }
    try {
      localStorage.setItem('birthday_music_muted', String(this.isMuted));
    } catch {
      // Ignore
    }
    this.notify();
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
  }

  setVolume(vol) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    if (this.audio) {
      this.audio.volume = this.isMuted ? 0 : clamped;
    }
    if (clamped > 0 && this.isMuted) {
      this.isMuted = false;
    }
    try {
      localStorage.setItem('birthday_music_volume', String(clamped));
      localStorage.setItem('birthday_music_muted', String(this.isMuted));
    } catch {
      // Ignore
    }
    this.notify();
  }

  setTrack(trackId, autoPlay = true) {
    this.init();
    const index = this.tracks.findIndex((t) => t.id === trackId);
    if (index === -1) return;

    const wasPlaying = this.isPlaying || autoPlay;
    this.currentTrackIndex = index;

    if (this.audio) {
      const cleanSrc = this.currentTrack.src.startsWith('/') ? this.currentTrack.src.slice(1) : this.currentTrack.src;
      this.audio.src = `${import.meta.env.BASE_URL}${cleanSrc}`;
      this.audio.load();
      if (wasPlaying) {
        this.play();
      } else {
        this.notify();
      }
    }

    try {
      localStorage.setItem('birthday_music_track', trackId);
    } catch {
      // Ignore
    }
  }

  nextTrack(autoPlay = true) {
    const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.setTrack(this.tracks[nextIndex].id, autoPlay);
  }

  prevTrack(autoPlay = true) {
    const prevIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.setTrack(this.tracks[prevIndex].id, autoPlay);
  }
}

export const audioManager = new AudioManager();
