import React, { useState, useEffect, useRef, useCallback } from 'react';
import { audioManager } from '../utils/audioManager';
import { sound } from '../utils/soundEffects';

export default function MusicPlayer({ lang = 'en' }) {
  const [playerState, setPlayerState] = useState(() => audioManager.getState());
  const [showCard, setShowCard] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const fadeTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((newState) => {
      setPlayerState(newState);
    });
    return unsubscribe;
  }, []);

  const triggerShow = useCallback(() => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    setShowCard(true);
    setIsFading(false);

    // Appear for 4 seconds (was 1s + 3s added)
    fadeTimerRef.current = setTimeout(() => {
      setIsFading(true);
    }, 4000);

    // Fade out over 2 seconds (4s hold + 2s fade = 6s total)
    hideTimerRef.current = setTimeout(() => {
      setShowCard(false);
      setIsFading(false);
    }, 6000);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const currentTrack = playerState?.track;
  const isPlaying = playerState?.isPlaying;

  const loc = (field) => {
    if (!field) return '';
    if (typeof field === 'object') {
      return field[lang] || field.en || field.fr || '';
    }
    return field;
  };

  const currentTitle = loc(currentTrack?.title) || 'Inspector Clouseau Swing';
  const currentSubtitle = loc(currentTrack?.subtitle) || '';
  const currentBadge = loc(currentTrack?.badge) || '🎷 Detective Swing';
  const currentImage = currentTrack?.image || 'assets/music/clouseau.jpg';
  const currentArtist = currentTrack?.artist || 'Kevin MacLeod';

  const handleNextTrack = () => {
    sound.playClick();
    audioManager.nextTrack(true);
    triggerShow();
  };

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40 select-none pointer-events-auto transition-transform duration-300 ease-out hover:translate-y-[45%]"
      onMouseEnter={triggerShow}
    >
      {/* 1. Semi-Transparent 300% Enlarged Vinyl Disc Button */}
      <button
        type="button"
        onClick={handleNextTrack}
        className={`relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-stone-950/60 backdrop-blur-xs border-4 sm:border-6 border-emerald-500/70 shadow-[0_-8px_30px_rgba(0,0,0,0.3)] flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 group opacity-50 hover:opacity-95 ${
          isPlaying
            ? 'ring-6 sm:ring-8 ring-emerald-400/30 shadow-emerald-600/30'
            : 'ring-3 sm:ring-4 ring-stone-700/40 shadow-stone-950/40'
        }`}
        aria-label={lang === 'de' ? 'Nächster Titel' : lang === 'en' ? 'Next track' : 'Piste suivante'}
      >
        {/* Spinning Vinyl Record Disc with Concentric Grooves */}
        <div
          className={`relative w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-radial from-stone-900/70 via-stone-950/75 to-black/80 ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{ animationDuration: '8s' }}
        >
          {/* Concentric Vinyl Grooves */}
          <div className="absolute inset-2.5 sm:inset-3 rounded-full border border-stone-600/40 opacity-50 pointer-events-none" />
          <div className="absolute inset-5 sm:inset-6 rounded-full border border-stone-500/30 opacity-40 pointer-events-none" />
          <div className="absolute inset-8 sm:inset-10 rounded-full border border-stone-500/25 opacity-35 pointer-events-none" />
          <div className="absolute inset-11 sm:inset-14 rounded-full border border-stone-400/20 opacity-30 pointer-events-none" />
          <div className="absolute inset-14 sm:inset-18 rounded-full border border-stone-400/15 opacity-25 pointer-events-none" />
          <div className="absolute inset-18 sm:inset-22 rounded-full border border-stone-300/10 opacity-20 pointer-events-none" />

          {/* Glossy Vinyl Light Reflections */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Clouseau Face in Center of Record */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-3 sm:border-4 border-emerald-400/80 shadow-xl bg-stone-900/80 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
            <img
              src={`${import.meta.env.BASE_URL}assets/lepoo_suspicious.jpg`}
              alt="Inspecteur Clouseau"
              className="w-full h-full object-cover scale-110"
            />
            {/* Center Spindle Hole with Metallic Ring */}
            <div className="absolute inset-0 m-auto w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-stone-950 border-2 border-emerald-300 shadow-inner" />
          </div>
        </div>

        {/* Ambient Pulse Ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-2 rounded-full border-2 border-emerald-400/40 animate-ping pointer-events-none opacity-30" />
        )}

        {/* Floating "NEXT TRACK" indicator on disc edge */}
        <span className="absolute top-2 sm:top-3.5 left-1/2 -translate-x-1/2 bg-stone-900/80 backdrop-blur-xs text-emerald-300 text-[9px] sm:text-[11px] font-typewriter font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/60 shadow-md whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
          ⏭ {lang === 'en' ? 'NEXT TRACK' : 'PISTE SUIVANTE'}
        </span>
      </button>

      {/* 2. Floating Details Card (Twice as large, holds 2s, melts away slowly over 3s) */}
      {showCard && (
        <div
          className={`absolute bottom-[52%] mb-5 sm:mb-7 left-1/2 -translate-x-1/2 w-[94vw] max-w-[560px] sm:max-w-[620px] md:max-w-[680px] bg-[#0c2417]/95 backdrop-blur-md border-2 sm:border-3 border-emerald-500/90 rounded-3xl p-5 sm:p-6 shadow-[0_16px_48px_rgba(0,0,0,0.6)] z-50 text-left text-stone-100 pointer-events-none select-none ${
            isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transition: isFading
              ? 'opacity 2000ms cubic-bezier(0.4, 0, 0.2, 1), transform 2000ms cubic-bezier(0.4, 0, 0.2, 1)'
              : 'opacity 200ms ease-out, transform 200ms ease-out'
          }}
        >
          {/* Caret arrow pointing down to circular button */}
          <div className="absolute -bottom-2.5 sm:-bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-10 sm:border-x-12 border-x-transparent border-t-10 sm:border-t-12 border-t-emerald-500" />

          {/* Track Header: Photo + Band/Singer & Title (Twice as large) */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Enlarged Album/Artist Image */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-emerald-400/80 shadow-xl shrink-0 bg-stone-900">
              <img
                src={`${import.meta.env.BASE_URL}${currentImage}`}
                alt={currentArtist}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Enlarged Track Info */}
            <div className="min-w-0 flex-1 space-y-1 sm:space-y-1.5">
              <span className="text-xs sm:text-sm font-black font-typewriter text-emerald-400 uppercase tracking-wider block">
                {currentBadge}
              </span>
              <h4 className="text-xl sm:text-2xl md:text-3xl font-black font-serif-vintage text-white leading-tight">
                {currentTitle}
              </h4>
              <p className="text-base sm:text-lg md:text-xl font-bold text-emerald-300">
                {currentArtist}
              </p>
              {currentSubtitle && (
                <p className="text-sm sm:text-base text-stone-300/90 italic font-serif-vintage pt-0.5">
                  {currentSubtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
