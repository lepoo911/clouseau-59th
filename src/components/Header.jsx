import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { sound } from '../utils/soundEffects';

function SuspiciousClouseau({ lang = 'en', isUnanimous = false }) {
  const [direction, setDirection] = useState('left');
  const [showQuote, setShowQuote] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const quoteTimerRef = React.useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection((prev) => (prev === 'left' ? 'right' : 'left'));
    }, 2800);
    return () => {
      clearInterval(timer);
      if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current);
    };
  }, []);

  const quotes = {
    de: [
      "« Ich verdächtige jeden... und ich verdächtige niemanden! »",
      "« Was hecken diese beiden da drüben aus?! »",
      "« Eine verdächtige Bewegung auf dem Bildschirm! »",
      "« Inspektor Clouseau observiert jeden Klick! »"
    ],
    fr: [
      "« Je soupçonne tout le monde... et personne ! »",
      "« Que complotent ces deux-là derrière mon dos ?! »",
      "« Un mouvement très suspect sur cet écran ! »",
      "« L'Inspecteur Clouseau surveille vos faits et gestes ! »"
    ],
    en: [
      "« I suspect everyone... and I suspect no one! »",
      "« What are these two plotting behind my back?! »",
      "« A highly suspicious movement on this screen! »",
      "« Inspector Clouseau is watching your every move! »"
    ]
  };

  const currentQuotes = quotes[lang] || quotes.en;

  const triggerQuoteDisplay = () => {
    setShowQuote(true);
    if (quoteTimerRef.current) clearTimeout(quoteTimerRef.current);
    // Added 3 seconds: was 4.5s -> now 7.5s (7500ms)
    quoteTimerRef.current = setTimeout(() => {
      setShowQuote(false);
    }, 7500);
  };

  const handleClick = () => {
    sound.playClick();
    setQuoteIdx((prev) => (prev + 1) % currentQuotes.length);
    triggerQuoteDisplay();
  };

  return (
    <div className="relative shrink-0 flex flex-col items-center ml-1 sm:ml-1.5 border-l border-stone-300 pl-1.5 sm:pl-2">
      {/* Speech bubble popup: positioned DOWN below avatar to prevent clipping at top of screen */}
      {showQuote && (
        <div className="absolute top-full mt-2.5 right-0 sm:left-1/2 sm:-translate-x-1/2 w-52 sm:w-64 p-2.5 bg-amber-50 border-2 border-amber-600 rounded-xl shadow-2xl z-50 text-center animate-fadeIn font-serif-vintage pointer-events-none">
          <div className="text-xs sm:text-sm font-black text-amber-950 leading-snug">
            {isUnanimous
              ? (lang === 'de' ? '« AHA! Der Fall ist gelöst! Einstimmiges Urteil! »' : lang === 'fr' ? '« AHA ! L\'affaire est classée ! Accord unanime ! »' : '« AHA! The case is solved! Unanimous verdict! »')
              : currentQuotes[quoteIdx]}
          </div>
          {/* Caret pointing UP to Clouseau */}
          <div className="absolute -top-1.5 right-4 sm:left-1/2 sm:-translate-x-1/2 w-3 h-3 bg-amber-50 border-t-2 border-l-2 border-amber-600 rotate-45"></div>
        </div>
      )}

      {/* Clouseau Avatar Box */}
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={triggerQuoteDisplay}
        className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 border-amber-600 ring-2 ring-amber-400/60 shadow-md transition-all cursor-pointer group bg-[#fcf8e1] hover:scale-108 active:scale-95 animate-suspicious-clouseau"
        title={lang === 'de' ? 'Chefinspektor Clouseau observiert verdächtig...' : lang === 'fr' ? 'L\'Inspecteur Clouseau observe avec suspicion...' : 'Chief Inspector Clouseau is suspiciously observing...'}
        aria-label="Inspector Clouseau"
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/${
            direction === 'left' ? 'clouseau_disney_suspicious.png' : 'clouseau_disney_suspicious_right.png'
          }`}
          alt="Inspector Clouseau"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Detective Badge */}
        <span className="absolute top-0 right-0 bg-amber-600 text-white font-black text-[8px] px-1 py-0.2 rounded-bl-md leading-none shadow-xs font-typewriter">
          🕵️‍♂️
        </span>

        {/* Suspicious Eye Indicator Badge */}
        <span className="absolute bottom-0 left-0 text-[9px] w-4 h-4 rounded-tr-lg flex items-center justify-center font-bold shadow-xs bg-amber-200/90 text-amber-900 border-t border-r border-amber-400">
          👀
        </span>
      </button>

      <span className="text-[10px] font-black font-typewriter text-amber-900 mt-0.5 tracking-tight flex items-center gap-0.5">
        Clouseau
      </span>
    </div>
  );
}

export default function Header({
  t,
  lang = 'en',
  onSelectLang,
  onRestart,
  currentUser = 'erhard',
  onSelectUser,
  erhardVote = {},
  claireVote = {},
  isUnanimous = false,
  isSimulation = false,
}) {
  const languages = [
    { code: 'fr', label: 'FR', title: 'Français' },
    { code: 'en', label: 'EN', title: 'English' },
    { code: 'de', label: 'DE', title: 'Deutsch' },
  ];

  return (
    <div className="w-full shrink-0 select-none">
      <header className="w-full text-stone-900 px-4 sm:px-[50px] py-1 sm:py-1.5 flex items-center justify-between gap-2 sm:gap-4 relative">
        {/* Left: Erhard (Blue) & Claire (Rose) Separate Avatars */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Erhard Avatar (Blue) */}
        <div className="relative shrink-0 flex flex-col items-center">
          {isSimulation ? (
            <button
              type="button"
              onClick={() => onSelectUser && onSelectUser('erhard')}
              className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                currentUser === 'erhard'
                  ? 'border-blue-600 ring-4 ring-blue-400 shadow-md shadow-blue-500/25 scale-105'
                  : 'border-stone-300 opacity-60 hover:opacity-100'
              }`}
              title="Click to switch to Erhard (Simulation Mode)"
              aria-label="Switch to Erhard"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/erhard_avatar.png`}
                alt="Erhard"
                className="w-full h-full object-cover"
              />
              {currentUser === 'erhard' && (
                <span className="absolute top-0 left-0 bg-blue-600 text-white font-black text-[9px] px-1 py-0.2 rounded-br-md leading-none shadow-xs font-typewriter">
                  YOU
                </span>
              )}
              <span
                className={`absolute bottom-0 right-0 text-[10px] w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-tl-lg flex items-center justify-center font-bold shadow-xs ${
                  erhardVote?.locationId && erhardVote?.time
                    ? 'bg-blue-600 text-white'
                    : erhardVote?.locationId
                    ? 'bg-blue-400 text-white'
                    : 'bg-stone-300 text-stone-600'
                }`}
              >
                {erhardVote?.locationId && erhardVote?.time ? '✓' : erhardVote?.locationId ? '½' : '•'}
              </span>
            </button>
          ) : (
            <div
              className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 transition-all cursor-default ${
                currentUser === 'erhard'
                  ? 'border-blue-600 ring-3 ring-blue-500/60 shadow-md shadow-blue-500/25 scale-105'
                  : 'border-stone-300 opacity-75'
              }`}
              title={
                currentUser === 'erhard'
                  ? (lang === 'de' ? 'Erhard (Sie)' : lang === 'fr' ? 'Erhard (Vous)' : 'Erhard (You)')
                  : (lang === 'de' ? 'Erhard (Partner)' : lang === 'fr' ? 'Erhard (Partenaire)' : 'Erhard (Partner)')
              }
              aria-label="Erhard"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/erhard_avatar.png`}
                alt="Erhard"
                className="w-full h-full object-cover"
              />
              {currentUser === 'erhard' && (
                <span className="absolute top-0 left-0 bg-blue-600 text-white font-black text-[9px] px-1 py-0.2 rounded-br-md leading-none shadow-xs font-typewriter">
                  YOU
                </span>
              )}
              <span
                className={`absolute bottom-0 right-0 text-[10px] w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-tl-lg flex items-center justify-center font-bold shadow-xs ${
                  erhardVote?.locationId && erhardVote?.time
                    ? 'bg-blue-600 text-white'
                    : erhardVote?.locationId
                    ? 'bg-blue-400 text-white'
                    : 'bg-stone-300 text-stone-600'
                }`}
              >
                {erhardVote?.locationId && erhardVote?.time ? '✓' : erhardVote?.locationId ? '½' : '•'}
              </span>
            </div>
          )}
          <span className="text-[10px] font-black font-typewriter text-blue-800 mt-0.5 tracking-tight">
            Erhard
          </span>
        </div>

        {/* Claire Avatar (Rose) */}
        <div className="relative shrink-0 flex flex-col items-center">
          {isSimulation ? (
            <button
              type="button"
              onClick={() => onSelectUser && onSelectUser('claire')}
              className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                currentUser === 'claire'
                  ? 'border-rose-600 ring-4 ring-rose-400 shadow-md shadow-rose-500/25 scale-105'
                  : 'border-stone-300 opacity-60 hover:opacity-100'
              }`}
              title="Click to switch to Claire (Simulation Mode)"
              aria-label="Switch to Claire"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/claire_avatar.png`}
                alt="Claire"
                className="w-full h-full object-cover"
              />
              {currentUser === 'claire' && (
                <span className="absolute top-0 left-0 bg-rose-600 text-white font-black text-[9px] px-1 py-0.2 rounded-br-md leading-none shadow-xs font-typewriter">
                  YOU
                </span>
              )}
              <span
                className={`absolute bottom-0 right-0 text-[10px] w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-tl-lg flex items-center justify-center font-bold shadow-xs ${
                  claireVote?.locationId && claireVote?.time
                    ? 'bg-rose-600 text-white'
                    : claireVote?.locationId
                    ? 'bg-rose-400 text-white'
                    : 'bg-stone-300 text-stone-600'
                }`}
              >
                {claireVote?.locationId && claireVote?.time ? '✓' : claireVote?.locationId ? '½' : '•'}
              </span>
            </button>
          ) : (
            <div
              className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 transition-all cursor-default ${
                currentUser === 'claire'
                  ? 'border-rose-600 ring-3 ring-rose-500/60 shadow-md shadow-rose-500/25 scale-105'
                  : 'border-stone-300 opacity-75'
              }`}
              title={
                currentUser === 'claire'
                  ? (lang === 'de' ? 'Claire (Sie)' : lang === 'fr' ? 'Claire (Vous)' : 'Claire (You)')
                  : (lang === 'de' ? 'Claire (Partnerin)' : lang === 'fr' ? 'Claire (Partenaire)' : 'Claire (Partner)')
              }
              aria-label="Claire"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/claire_avatar.png`}
                alt="Claire"
                className="w-full h-full object-cover"
              />
              {currentUser === 'claire' && (
                <span className="absolute top-0 left-0 bg-rose-600 text-white font-black text-[9px] px-1 py-0.2 rounded-br-md leading-none shadow-xs font-typewriter">
                  YOU
                </span>
              )}
              <span
                className={`absolute bottom-0 right-0 text-[10px] w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-tl-lg flex items-center justify-center font-bold shadow-xs ${
                  claireVote?.locationId && claireVote?.time
                    ? 'bg-rose-600 text-white'
                    : claireVote?.locationId
                    ? 'bg-rose-400 text-white'
                    : 'bg-stone-300 text-stone-600'
                }`}
              >
                {claireVote?.locationId && claireVote?.time ? '✓' : claireVote?.locationId ? '½' : '•'}
              </span>
            </div>
          )}
          <span className="text-[10px] font-black font-typewriter text-rose-800 mt-0.5 tracking-tight">
            Claire
          </span>
        </div>

        {/* Suspicious Disney Inspector Clouseau Inquisitive Avatar */}
        <SuspiciousClouseau lang={lang} isUnanimous={isUnanimous} />
      </div>

      {/* Center: Centered Title & Happy Subtitle */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-1 sm:px-2 min-w-0">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <span className="text-lg sm:text-2xl animate-pulse" aria-hidden="true">🎉</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif-vintage tracking-tight text-amber-950 leading-tight truncate">
            {t?.header?.title || "lepoo's 59"}
          </h1>
          <span className="text-lg sm:text-2xl animate-pulse" aria-hidden="true">🎂</span>
        </div>
        <p className="text-sm sm:text-base md:text-lg font-black text-emerald-800 font-serif-vintage tracking-wider truncate mt-0.5">
          {isSimulation ? (
            <span className="inline-flex items-center gap-1 text-xs sm:text-sm bg-purple-100 text-purple-900 border border-purple-300 px-2.5 py-0.5 rounded-full font-bold font-typewriter">
              🎮 Simulation Mode • Click avatars to switch user
            </span>
          ) : isUnanimous ? (
            (lang === 'de' ? '🤝 Einstimmiges Scorecard-Urteil !' : lang === 'fr' ? '🤝 Accord unanime des golfeurs !' : '🤝 Unanimous Golfers\' Verdict!')
          ) : (
            (t?.header?.forClaireErhard || "EB & Claire")
          )}
        </p>
      </div>

      {/* Right Controls: Restart Button & 3-Way Language Selector */}
      <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">

        {/* Restart Button (Styled identically to Language Selector) */}
        <div className="flex items-center bg-amber-100/90 rounded-xl p-1 border border-amber-300 shadow-inner">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              if (onRestart) onRestart();
            }}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-black font-typewriter text-stone-700 hover:text-stone-950 hover:bg-amber-200/70 active:bg-amber-500 active:text-stone-950 transition cursor-pointer group"
            title="Restart"
            aria-label="Restart"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-700 group-hover:text-stone-950 group-hover:-rotate-90 transition-transform duration-200 shrink-0" />
            <span>Restart</span>
          </button>
        </div>

        {/* Language Selector */}
        <div
          className="flex items-center bg-amber-100/90 rounded-xl p-1 border border-amber-300 shadow-inner"
          role="group"
          aria-label={lang === 'de' ? 'Sprachauswahl' : lang === 'fr' ? 'Choix de la langue' : 'Language selection'}
        >
          {languages.map(({ code, label, title }) => {
            const active = lang === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => {
                  sound.playClick();
                  if (onSelectLang) onSelectLang(code);
                }}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-black font-typewriter transition cursor-pointer ${
                  active
                    ? 'bg-amber-500 text-stone-950 shadow-sm ring-1 ring-amber-600/30'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-amber-200/70'
                }`}
                aria-pressed={active}
                title={title}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
    <hr className="border-0 border-t-2 border-stone-300/70 my-1.5 sm:my-2 w-full" />
  </div>
  );
}
