import React, { useState, useEffect } from 'react';
import { sound } from '../utils/soundEffects';
import { Monitor, RefreshCw } from 'lucide-react';

const CLOUSEAU_QUOTES = {
  en: [
    "« Sacré bleu! This will NOT work! A grand inquiry of this magnitude cannot possibly fit on such a miniature telephone! Switch to a computer or laptop at once! »",
    "« This won't work! My magnifying glass is larger than your entire contraption! The 59th birthday investigation requires a desktop or laptop! »",
    "« Non, non, non! This will not work! I am Chief Inspector Jacques Clouseau, not a circus flea! I demand a proper screen with ample room for deduction! »",
    "« Preposterous! This won't work! Even Cato would refuse to stage an ambush in a space this diminutive! Return on a wider screen immediately! »",
    "« Aha! My sharp detective instincts tell me this will not work! You cannot solve the mystery of lePoo's 59th through a keyhole! Open this on a laptop! »",
    "« This won't work! The case dossier and the canine squad (Enzo, Mariah & Doodle) require a real display, not a pocket calculator! »",
    "« Sacré bleu! This will not work! My trenchcoat alone occupies more space than your screen! Please proceed to a desktop computer! »"
  ],
  fr: [
    "« Sacré bleu ! Ça ne marchera PAS ! Une enquête d'une telle envergure ne peut pas tenir sur un téléphone aussi minuscule ! Passez immédiatement sur un ordinateur ! »",
    "« Ça ne marchera pas ! Ma loupe d'enquêteur est plus grande que tout votre appareil ! Le 59e anniversaire de lePoo exige un vrai écran d'ordinateur ! »",
    "« Non, non, non ! Ça ne marchera pas ! Je suis l'Inspecteur Principal Jacques Clouseau, pas une puce de cirque ! J'exige un bureau digne de ce nom ! »",
    "« Inouï ! Ça ne marchera pas ! Même Cato refuserait de m'attaquer dans un espace aussi étroit ! Revenez vite sur un ordinateur portable ou fixe ! »",
    "« Aha ! Mon flair légendaire me dit que ça ne marchera pas ! L'escouade canine (Enzo, Mariah & Doodle) a besoin de place ! Ouvrez ceci sur grand écran ! »",
    "« Ça ne marchera pas ! Mon imperméable prend déjà plus de place que votre écran ! Rendez-vous sur un véritable ordinateur ! »"
  ],
  de: [
    "« Sacré bleu! Das wird NICHT funktionieren! Eine hochoffizielle Ermittlung dieser Tragweite passt unmöglich auf ein solches Miniatur-Telefon! Bitte sofort am Computer öffnen! »",
    "« Das wird nicht funktionieren! Meine Lupe ist größer als Ihr gesamter Apparat! Die Ermittlung zum 59. Geburtstag verlangt einen richtigen Bildschirm! »",
    "« Nein, nein, nein! Das wird nicht funktionieren! Ich bin Chefinspektor Jacques Clouseau, kein Zirkusfloh! Ich verlange einen anständigen Desktop-Bildschirm! »",
    "« Unerhört! Das wird nicht funktionieren! Selbst Cato würde sich weigern, mich auf so engem Raum zu attackieren! Bitte wechseln Sie an einen Laptop! »",
    "« Aha! Meine scharfe Ermittler-Nase sagt mir: Das wird nicht funktionieren! Die 59. Geburtstagsfeier braucht einen Computerbildschirm! »"
  ]
};

export default function SmallScreenNotice({ lang = 'en', onSelectLang, onOverride }) {
  const quotes = CLOUSEAU_QUOTES[lang] || CLOUSEAU_QUOTES.en;
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    // Pick a random quote on mount or language change
    const randomIdx = Math.floor(Math.random() * quotes.length);
    setQuoteIdx(randomIdx);
  }, [quotes.length, lang]);

  const handleNextQuote = () => {
    sound.playClick();
    setQuoteIdx((prev) => {
      let next = Math.floor(Math.random() * quotes.length);
      if (next === prev && quotes.length > 1) {
        next = (prev + 1) % quotes.length;
      }
      return next;
    });
  };

  const titles = {
    fr: "Ça ne marchera pas !",
    de: "Das wird nicht funktionieren !",
    en: "THIS WON'T WORK !"
  };

  const subtitles = {
    fr: "Dossier N° 59 • Sûreté Nationale",
    de: "Ermittlungsakte Nr. 59 • Sûreté Nationale",
    en: "Case File #59 • Sûreté Nationale"
  };

  const requirements = {
    fr: "L'Inspecteur Clouseau exige un écran d'ordinateur (PC, Mac, portable ou grande tablette) pour afficher les dossiers, la musique et l'escouade canine !",
    de: "Chefinspektor Clouseau verlangt einen Computerbildschirm (PC, Mac, Laptop oder großes Tablet), um die Akten, die Musik und das Hunde-Rudel darzustellen!",
    en: "Chief Inspector Clouseau requires a computer screen (desktop, laptop, or large tablet) to properly display the investigation files, music lounge, and canine pack!"
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f5f0e6] flex flex-col items-center justify-between p-4 sm:p-6 text-center select-none overflow-y-auto">
      {/* Top Memo Header with Language Switcher */}
      <div className="w-full max-w-sm pt-2">
        <div className="flex items-center justify-between border-b-2 border-amber-800/30 pb-2 text-[11px] font-typewriter text-amber-900 font-bold">
          <span>RÉPUBLIQUE FRANÇAISE</span>
          <div className="flex items-center gap-1.5">
            {['fr', 'en', 'de'].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  sound.playClick();
                  onSelectLang?.(l);
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase cursor-pointer transition ${
                  lang === l
                    ? 'bg-amber-800 text-amber-50 shadow-xs'
                    : 'text-amber-800 hover:bg-amber-200/70'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[10px] font-typewriter text-amber-700/80 text-right mt-0.5">
          {subtitles[lang] || subtitles.en}
        </div>
      </div>

      {/* Center Character & Message Card */}
      <div className="my-auto w-full max-w-sm flex flex-col items-center py-4">
        {/* Animated Inspector Clouseau Avatar */}
        <button
          type="button"
          onClick={handleNextQuote}
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-3 border-amber-600 ring-4 ring-amber-400/60 shadow-2xl bg-[#fcf8e1] mb-4 cursor-pointer hover:scale-105 active:scale-95 transition-all group"
          title="Click Clouseau for another quote"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/clouseau_disney_suspicious.png`}
            alt="Inspector Clouseau"
            className="w-full h-full object-cover animate-suspicious-clouseau group-hover:scale-110 transition-transform"
          />
          {/* Magnifying Glass badge */}
          <span className="absolute bottom-1 right-1 bg-amber-200/90 text-amber-950 text-xs px-1.5 py-0.5 rounded-lg border border-amber-500 font-bold shadow-xs">
            🔍
          </span>
        </button>

        {/* Rubber Stamp Badge: THIS WON'T WORK */}
        <div className="inline-block border-2 border-red-700 bg-red-50/95 text-red-800 px-3.5 py-1 rounded-md font-typewriter text-sm sm:text-base font-black uppercase tracking-wider -rotate-2 shadow-xs mb-3">
          {titles[lang] || titles.en}
        </div>

        {/* Speech Bubble with Clouseau's Random Quote */}
        <div className="relative w-full bg-[#fdfcf7] border-2 border-amber-700/70 rounded-2xl p-4 shadow-xl mb-4 font-serif-vintage text-left">
          <p className="text-sm sm:text-base font-black text-amber-950 leading-relaxed italic">
            {quotes[quoteIdx]}
          </p>
          {/* Button inside bubble to roll next quote */}
          <div className="mt-2.5 pt-2 border-t border-amber-800/20 flex items-center justify-between text-[11px] font-typewriter text-amber-800 font-bold">
            <span className="truncate">— Inspecteur Jacques Clouseau</span>
            <button
              type="button"
              onClick={handleNextQuote}
              className="flex items-center gap-1 hover:text-amber-950 underline cursor-pointer shrink-0 ml-2"
            >
              <RefreshCw className="w-3 h-3" />
              <span>
                {lang === 'de' ? 'Anderer Protest' : lang === 'fr' ? 'Autre plainte' : 'Another complaint'}
              </span>
            </button>
          </div>
        </div>

        {/* Switch to Computer Device Recommendation */}
        <div className="w-full bg-amber-100/80 border border-amber-300 rounded-xl p-3 text-xs font-sans text-stone-800 leading-snug flex items-start gap-2.5 shadow-2xs text-left">
          <div className="p-1.5 bg-amber-200 rounded-lg text-amber-900 shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-amber-950 mb-0.5 font-typewriter flex items-center gap-1">
              <span>🖥️ {lang === 'de' ? 'Computer oder Laptop nutzen' : lang === 'fr' ? 'Utiliser un ordinateur ou PC' : 'Use a Computer or Laptop'}</span>
            </div>
            <p className="text-[11px] text-stone-700">
              {requirements[lang] || requirements.en}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Option: Override / Proceed Anyway */}
      <div className="w-full max-w-sm pt-2 pb-2 flex flex-col items-center gap-1">
        {onOverride && (
          <button
            type="button"
            onClick={onOverride}
            className="text-[11px] font-typewriter text-stone-500 hover:text-stone-800 underline transition cursor-pointer"
          >
            {lang === 'de'
              ? 'Trotzdem auf kleinem Bildschirm fortfahren →'
              : lang === 'fr'
              ? 'Je m\'obstine : inspecter quand même sur ce mini écran →'
              : 'I am stubborn: inspect anyway on this tiny screen →'}
          </button>
        )}
        <span className="text-[10px] text-stone-400 font-mono">
          lePoo's 59 • Mission Birthday
        </span>
      </div>
    </div>
  );
}
