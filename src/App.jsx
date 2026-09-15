import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import Header from './components/Header';
import LocationCard from './components/LocationCard';
import TimeSelector from './components/TimeSelector';
import DecisionBanner from './components/DecisionBanner';
import MusicPlayer from './components/MusicPlayer';
import WanderingDogs from './components/WanderingDogs';
import { TRANSLATIONS } from './data/translations';
import { sound } from './utils/soundEffects';
import { parseUrlParams, syncUrlParams } from './utils/urlState';
import { votingManager } from './utils/votingState';

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      const urlLang = parseUrlParams().lang;
      if (urlLang && ['fr', 'en', 'de'].includes(urlLang)) return urlLang;
      const stored = localStorage.getItem('clouseau_lang');
      if (stored && ['fr', 'en', 'de'].includes(stored)) return stored;
      return 'en';
    } catch {
      return 'en';
    }
  });

  const [voting, setVoting] = useState(() => votingManager.getState());
  const [isModifying, setIsModifying] = useState(false);

  useEffect(() => {
    const unsubscribe = votingManager.subscribe((newState) => {
      setVoting(newState);
    });
    return unsubscribe;
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const handleSelectLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('clouseau_lang', newLang);
      syncUrlParams({ lang: newLang });
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSelectUser = (user) => {
    votingManager.setCurrentUser(user);
  };

  const handleSelectLocation = (location) => {
    setIsModifying(false);
    votingManager.voteLocation(location.id);
  };

  const handleSelectTime = (time) => {
    setIsModifying(false);
    votingManager.voteTime(time);
  };

  const handleReset = () => {
    sound.playClick();
    setIsModifying(false);
    votingManager.resetVotes();
  };

  const handleChangeMind = () => {
    sound.playClick();
    setIsModifying(true);
  };

  // Find location details from translations
  const locations = t?.cards?.locations || [];
  const erhardLocation = locations.find((loc) => loc.id === voting.erhardVote.locationId) || null;
  const claireLocation = locations.find((loc) => loc.id === voting.claireVote.locationId) || null;
  const agreedLocation = voting.isLocationUnanimous ? erhardLocation : null;
  const agreedTime = voting.isTimeUnanimous ? voting.erhardVote.time : null;

  const activeUserVote = voting.votes[voting.currentUser] || {};
  const activeLocation = locations.find((loc) => loc.id === activeUserVote.locationId) || null;

  // Progressive reveal conditions
  const hasAnyLocation = Boolean(voting.erhardVote.locationId || voting.claireVote.locationId);
  const hasActiveTimeOrBoth = Boolean(activeUserVote.time || (voting.erhardVote.time && voting.claireVote.time));

  // Step 1 Component
  const renderStep1Location = (isHorizontal = false) => (
    <section className="flex flex-col min-h-0 h-full w-full">
      <div className="flex items-center gap-2 mb-2 shrink-0">
        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-600 text-white font-black text-xs sm:text-sm flex items-center justify-center font-typewriter shadow-xs">
          1
        </span>
        <h2 className="text-base sm:text-lg font-black font-serif-vintage text-stone-950 truncate">
          {lang === 'de'
            ? '1. Ort wählen :'
            : lang === 'en'
            ? '1. Choose Location :'
            : '1. Choisir l\'endroit :'}
        </h2>
      </div>

      <div
        className={`flex-1 min-h-0 ${
          isHorizontal
            ? 'grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-stretch overflow-hidden'
            : 'overflow-y-auto flex flex-col gap-2 pr-1'
        }`}
      >
        {locations.map((loc) => (
          <LocationCard
            key={loc.id}
            location={loc}
            erhardVoted={voting.erhardVote.locationId === loc.id}
            claireVoted={voting.claireVote.locationId === loc.id}
            currentUser={voting.currentUser}
            onSelect={handleSelectLocation}
            tCards={t.cards}
            lang={lang}
            isHorizontal={isHorizontal}
          />
        ))}
      </div>
    </section>
  );

  // Step 2 Column Component
  const renderStep2Time = () => (
    <section className="flex flex-col min-h-0 h-full animate-slowReveal">
      <div className="flex items-center gap-2 mb-1.5 shrink-0">
        <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-600 text-white font-black text-xs sm:text-sm flex items-center justify-center font-typewriter shadow-xs">
          2
        </span>
        <h2 className="text-base sm:text-lg font-black font-serif-vintage text-stone-950 truncate">
          {lang === 'de'
            ? '2. Ankunft :'
            : lang === 'en'
            ? '2. Arrival Time :'
            : '2. Heure d\'arrivée :'}
        </h2>
      </div>

      <div className="flex-1 min-h-0">
        <TimeSelector
          erhardTime={voting.erhardVote.time}
          claireTime={voting.claireVote.time}
          currentUser={voting.currentUser}
          onSelectTime={handleSelectTime}
          hasLocation={hasAnyLocation}
          lang={lang}
        />
      </div>
    </section>
  );

  // Step 3 Column Component
  const renderStep3Decision = (isOnlyStep = false) => (
    <section className={`flex flex-col min-h-0 h-full animate-slowReveal ${
      isOnlyStep ? 'w-full max-w-xl md:max-w-2xl mx-auto' : ''
    }`}>
      <div className="flex items-center justify-between gap-2 mb-1.5 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-white font-black text-xs sm:text-sm flex items-center justify-center font-typewriter shadow-xs shrink-0 ${
            voting.isUnanimous ? 'bg-emerald-600' : 'bg-amber-600'
          }`}>
            3
          </span>
          <h2 className="text-base sm:text-lg font-black font-serif-vintage text-stone-950 truncate">
            {voting.isUnanimous
              ? (lang === 'de' ? '3. Einstimmiges Urteil 🎉 :' : lang === 'fr' ? '3. Verdict unanime 🎉 :' : '3. Unanimous Verdict 🎉 :')
              : (lang === 'de' ? '3. Abstimmungs-Status :' : lang === 'fr' ? '3. Statut du vote :' : '3. Voting Status :')}
          </h2>
        </div>

        {isOnlyStep && (
          <button
            type="button"
            onClick={handleChangeMind}
            className={`flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-xl border-2 text-xs sm:text-sm font-black font-typewriter shadow-xs transition active:scale-95 cursor-pointer shrink-0 ${
              voting.currentUser === 'erhard'
                ? 'bg-blue-100/90 hover:bg-blue-200 border-blue-500 text-blue-950'
                : 'bg-rose-100/90 hover:bg-rose-200 border-rose-500 text-rose-950'
            }`}
            title={lang === 'de' ? 'Ich ändere meine Meinung!' : lang === 'fr' ? "Je change d'avis !" : 'I change my mind!'}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${voting.currentUser === 'erhard' ? 'text-blue-700' : 'text-rose-700'}`} />
            <span>{lang === 'de' ? 'Ich ändere meine Meinung!' : lang === 'fr' ? "Je change d'avis !" : 'I change my mind!'}</span>
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0">
        <DecisionBanner
          selectedLocation={agreedLocation || activeLocation || erhardLocation || claireLocation}
          selectedTime={agreedTime || activeUserVote.time || voting.erhardVote.time || voting.claireVote.time}
          isUnanimous={voting.isUnanimous}
          isLocationUnanimous={voting.isLocationUnanimous}
          isTimeUnanimous={voting.isTimeUnanimous}
          erhardLocation={erhardLocation}
          claireLocation={claireLocation}
          erhardTime={voting.erhardVote.time}
          claireTime={voting.claireVote.time}
          currentUser={voting.currentUser}
          onReset={handleReset}
          onChangeMind={handleChangeMind}
          isOnlyStep={isOnlyStep}
          tDecision={t.decision}
          lang={lang}
          isSimulation={voting.isSimulation}
        />
      </div>
    </section>
  );

  return (
    <div className="min-h-screen min-h-[100dvh] md:h-screen md:max-h-[100dvh] w-full overflow-x-hidden overflow-y-auto md:overflow-hidden flex flex-col justify-between bg-[#faf7f0] p-2 sm:p-3 text-stone-900 selection:bg-amber-200">
      {/* 1. Header at Top with Separated Erhard & Claire Avatars */}
      <Header
        t={t}
        lang={lang}
        onSelectLang={handleSelectLang}
        onRestart={handleReset}
        currentUser={voting.currentUser}
        onSelectUser={handleSelectUser}
        erhardVote={voting.erhardVote}
        claireVote={voting.claireVote}
        isUnanimous={voting.isUnanimous}
        isSimulation={voting.isSimulation}
      />

      {/* 2. Main Center Area: Dynamic Progressive Reveal */}
      <main className="flex-1 min-h-0 py-1.5 sm:py-2 pb-18 sm:pb-20 md:pb-24 flex items-center justify-center w-full">
        {/* State 1: ONLY Step 1 in center area when no location voted - 3 choices horizontally, zero scrollbars */}
        {!hasAnyLocation && (
          <div className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl h-full animate-slowFadeIn flex flex-col justify-center">
            {renderStep1Location(true)}
          </div>
        )}

        {/* State 2: Step 1 + Step 2 revealed side-by-side */}
        {hasAnyLocation && !hasActiveTimeOrBoth && !voting.isUnanimous && (
          <div className="w-full max-w-3xl lg:max-w-4xl h-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch animate-slowFadeIn">
            {renderStep1Location()}
            {renderStep2Time()}
          </div>
        )}

        {/* State 4: Unanimous verdict reached - ONLY show Step 3 (The Unanimous Verdict card) in the main part of the screen */}
        {voting.isUnanimous && !isModifying && (
          <div className="w-full max-w-xl md:max-w-2xl h-full animate-slowFadeIn flex flex-col justify-center">
            {renderStep3Decision(true)}
          </div>
        )}

        {/* State 3: All 3 Steps revealed (while voting is in progress, or when modifying choices) */}
        {hasAnyLocation && hasActiveTimeOrBoth && (!voting.isUnanimous || isModifying) && (
          <div className="w-full max-w-6xl h-full flex flex-col min-h-0 animate-slowFadeIn">
            {isModifying && (
              <div className="mb-2 px-3 py-1.5 bg-amber-100/95 border-2 border-amber-500 rounded-xl flex items-center justify-between gap-2 shadow-xs shrink-0">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold font-typewriter text-amber-950 min-w-0 truncate">
                  <span className="text-base shrink-0">✏️</span>
                  <span className="truncate">
                    {lang === 'de'
                      ? 'Auswahl anpassen: Wählen Sie unten einen neuen Ort oder eine neue Zeit.'
                      : lang === 'fr'
                      ? 'Modifier votre choix : Cliquez sur un nouvel endroit ou heure ci-dessous.'
                      : 'Modifying choices: Select a different location or arrival time below.'}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      votingManager.voteTime(null);
                    }}
                    className="px-2 py-1 bg-amber-200/90 hover:bg-amber-300 text-amber-950 rounded-lg text-xs font-bold font-typewriter shadow-2xs transition active:scale-95 cursor-pointer"
                    title="Unset my time vote"
                  >
                    {lang === 'de' ? 'Zeit löschen' : lang === 'fr' ? "Effacer l'heure" : 'Clear time'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModifying(false)}
                    className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold font-typewriter shadow-xs transition active:scale-95 cursor-pointer"
                  >
                    {lang === 'de' ? '✓ Fertig / Urteil' : lang === 'fr' ? '✓ Voir le verdict' : '✓ Done / View Verdict'}
                  </button>
                </div>
              </div>
            )}
            <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3.5 items-stretch">
              <div className="md:col-span-4 lg:col-span-4 min-h-0 h-full">
                {renderStep1Location()}
              </div>
              <div className="md:col-span-3 lg:col-span-3 min-h-0 h-full">
                {renderStep2Time()}
              </div>
              <div className="md:col-span-5 lg:col-span-5 min-h-0 h-full">
                {renderStep3Decision(false)}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Centered Music Control at Bottom: 300% enlarged vinyl record, 50% submerged off screen */}
      <MusicPlayer lang={lang} />

      {/* 4. Wandering Canine Detectives (Doodle, Enzo, Mariah walking on/off and bumping into UI) */}
      <WanderingDogs lang={lang} />
    </div>
  );
}
