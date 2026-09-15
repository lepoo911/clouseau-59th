import React from 'react';
import { fireConfetti } from '../utils/confetti';
import { Check } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function LocationCard({
  location,
  erhardVoted = false,
  claireVoted = false,
  currentUser = 'erhard',
  onSelect,
  tCards = {},
  lang = 'en',
  isHorizontal = false,
}) {
  const isUnanimous = erhardVoted && claireVoted;
  const isSelectedByCurrent = currentUser === 'erhard' ? erhardVoted : claireVoted;
  const isSelectedByOther = currentUser === 'erhard' ? claireVoted : erhardVoted;

  const handleSelect = () => {
    sound.playInspectorAha();
    if (isSelectedByOther && !isSelectedByCurrent) {
      // Reaching agreement triggers extra celebration!
      fireConfetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#e11d48', '#f59e0b', '#ffffff'],
      });
    } else {
      sound.playClick();
    }
    onSelect(location);
  };

  // Normalize image path to handle base URL correctly
  const rawImage = location?.image || '';
  const cleanImage = rawImage.startsWith('/') ? rawImage.slice(1) : rawImage;
  const imageSrc = cleanImage ? `${import.meta.env.BASE_URL}${cleanImage}` : '';

  // Google Maps URL
  const query = (location?.googleMapsQuery || location?.address || location?.title || '').replace(/\+/g, ' ');
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const viewMapLabel = tCards?.viewMap || (lang === 'fr' ? 'Voir sur Google Maps' : lang === 'de' ? 'Auf Google Maps ansehen' : 'View on Google Maps');

  // Card border styling based on two-user votes & active user hover color
  const cardBorderClass = isUnanimous
    ? 'bg-gradient-to-br from-emerald-50/80 via-green-50/40 to-emerald-50/80 border-emerald-500 ring-4 ring-emerald-400/50 shadow-xl shadow-emerald-500/25 scale-[1.01]'
    : erhardVoted
    ? currentUser === 'erhard'
      ? 'bg-blue-50/50 border-blue-500 ring-3 ring-blue-400/40 shadow-md scale-[1.005] hover:ring-4 hover:ring-blue-300'
      : 'bg-blue-50/50 border-blue-500 ring-3 ring-blue-400/40 shadow-md scale-[1.005] hover:border-rose-500 hover:ring-4 hover:ring-rose-400/50'
    : claireVoted
    ? currentUser === 'claire'
      ? 'bg-rose-50/50 border-rose-500 ring-3 ring-rose-400/40 shadow-md scale-[1.005] hover:ring-4 hover:ring-rose-300'
      : 'bg-rose-50/50 border-rose-500 ring-3 ring-rose-400/40 shadow-md scale-[1.005] hover:border-blue-500 hover:ring-4 hover:ring-blue-400/50'
    : currentUser === 'erhard'
    ? 'bg-white/95 border-stone-200 hover:border-blue-500 hover:bg-blue-50/30 hover:ring-3 hover:ring-blue-400/30 hover:shadow-md hover:shadow-blue-500/10'
    : 'bg-white/95 border-stone-200 hover:border-rose-500 hover:bg-rose-50/30 hover:ring-3 hover:ring-rose-400/30 hover:shadow-md hover:shadow-rose-500/10';

  return (
    <div
      onClick={handleSelect}
      data-dog-obstacle="true"
      className={`location-card group relative rounded-2xl transition-all duration-200 flex flex-col justify-between text-left cursor-pointer select-none border-2 shadow-sm ${cardBorderClass} ${
        isHorizontal
          ? 'h-full p-3 sm:p-4'
          : 'p-2 sm:p-2.5'
      }`}
    >
      <div className={isHorizontal ? 'flex-1 flex flex-col min-h-0' : ''}>
        {/* Render of Location */}
        {imageSrc && (
          <div className={`w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-2xs relative shrink-0 ${
            isHorizontal
              ? 'flex-1 min-h-[140px] sm:min-h-[160px] md:min-h-[190px] max-h-[300px] mb-2 sm:mb-3'
              : 'h-20 sm:h-24 md:h-20 lg:h-22 mb-1.5'
          }`}>
            <img
              src={imageSrc}
              alt={location?.title || ''}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="eager"
            />

            {/* Voting Badges in Top Right */}
            <div className="absolute top-2 right-2 flex flex-col items-end gap-1.5 z-10">
              {isUnanimous ? (
                <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white px-2.5 py-1 rounded-full shadow-lg border border-emerald-300/90 animate-glowing-green flex items-center gap-1.5">
                  <span className="text-[11px] font-black font-typewriter tracking-tight">
                    {lang === 'de' ? '🤝 Beide einig!' : lang === 'fr' ? '🤝 Accord unanime !' : '🤝 Unanimous!'}
                  </span>
                </div>
              ) : (
                <>
                  {erhardVoted && (
                    <div className="bg-blue-600 text-white px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white/80">
                      <img
                        src={`${import.meta.env.BASE_URL}assets/erhard_avatar.png`}
                        alt="Erhard"
                        className="w-3.5 h-3.5 rounded-full object-cover"
                      />
                      <span className="text-[10px] font-black font-typewriter">Erhard</span>
                    </div>
                  )}
                  {claireVoted && (
                    <div className="bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white/80">
                      <img
                        src={`${import.meta.env.BASE_URL}assets/claire_avatar.png`}
                        alt="Claire"
                        className="w-3.5 h-3.5 rounded-full object-cover"
                      />
                      <span className="text-[10px] font-black font-typewriter">Claire</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Centered Location Title - Perfectly centered under image, clicking opens in Google Maps */}
        <div className="w-full flex items-center justify-center text-center my-1.5 sm:my-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
            }}
            title={viewMapLabel}
            aria-label={`${location?.title || ''} (${viewMapLabel})`}
            className={`group/map block text-center text-stone-900 transition cursor-pointer max-w-full ${
              currentUser === 'erhard' ? 'hover:text-blue-800' : 'hover:text-rose-800'
            }`}
          >
            <h3 className={`w-full text-center font-black font-serif-vintage tracking-tight leading-snug group-hover/map:underline underline-offset-4 ${
              currentUser === 'erhard' ? 'decoration-blue-500/70' : 'decoration-rose-500/70'
            } ${
              isHorizontal
                ? 'text-base sm:text-lg lg:text-xl'
                : 'text-xs sm:text-sm truncate'
            }`}>
              {location?.title || ''}
            </h3>
          </a>
        </div>
      </div>

      {/* Senior-Friendly Big Selection Button with Two-User Awareness */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
        className={`w-full rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
          isHorizontal
            ? 'min-h-[46px] sm:min-h-[52px] py-2.5 sm:py-3 px-3 text-sm sm:text-base mb-5'
            : 'min-h-[36px] sm:min-h-[38px] py-1.5 px-2 text-xs sm:text-sm mb-1.5'
        } ${
          isUnanimous
            ? 'bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white ring-3 ring-emerald-300 animate-glowing-green hover:brightness-110 hover:scale-[1.01]'
            : isSelectedByCurrent
            ? currentUser === 'erhard'
              ? 'bg-blue-600 text-white ring-2 ring-blue-300 hover:bg-blue-500 hover:ring-4 hover:ring-blue-200'
              : 'bg-rose-600 text-white ring-2 ring-rose-300 hover:bg-rose-500 hover:ring-4 hover:ring-rose-200'
            : isSelectedByOther
            ? currentUser === 'erhard'
              ? 'bg-rose-100 hover:bg-blue-600 hover:text-white text-rose-900 border-2 border-rose-500 hover:border-blue-600 font-black hover:ring-4 hover:ring-blue-300 shadow-xs hover:shadow-md'
              : 'bg-blue-100 hover:bg-rose-600 hover:text-white text-blue-900 border-2 border-blue-500 hover:border-rose-600 font-black hover:ring-4 hover:ring-rose-300 shadow-xs hover:shadow-md'
            : currentUser === 'erhard'
            ? 'bg-stone-900 group-hover:bg-blue-600 hover:!bg-blue-500 text-white font-black shadow-md hover:shadow-lg hover:shadow-blue-900/30 hover:ring-4 hover:ring-blue-300 hover:scale-[1.02]'
            : 'bg-stone-900 group-hover:bg-rose-600 hover:!bg-rose-500 text-white font-black shadow-md hover:shadow-lg hover:shadow-rose-900/30 hover:ring-4 hover:ring-rose-300 hover:scale-[1.02]'
        }`}
      >
        {isUnanimous ? (
          <>
            <Check className="w-4 h-4 text-white stroke-[3]" />
            <span>
              {lang === 'de'
                ? '✓ Einstimmige Wahl !'
                : lang === 'fr'
                ? '✓ Choix unanime !'
                : '✓ Unanimous Choice !'}
            </span>
          </>
        ) : isSelectedByCurrent ? (
          <>
            <Check className="w-4 h-4 text-white stroke-[3]" />
            <span>
              {lang === 'de' ? 'Ihre Wahl ✓' : lang === 'fr' ? 'Votre choix ✓' : 'Your Choice ✓'}
            </span>
          </>
        ) : isSelectedByOther ? (
          <span>
            {currentUser === 'erhard'
              ? (lang === 'de' ? '❤️ Claire hat dies gewählt! Zustimmen?' : lang === 'fr' ? '❤️ Claire a choisi ceci ! D\'accord ?' : '❤️ Claire voted this! Agree?')
              : (lang === 'de' ? '💙 Erhard hat dies gewählt! Zustimmen?' : lang === 'fr' ? '💙 Erhard a choisi ceci ! D\'accord ?' : '💙 Erhard voted this! Agree?')}
          </span>
        ) : (
          <span>
            {lang === 'de' ? 'Wählen' : lang === 'fr' ? 'Choisir' : 'Choose'}
          </span>
        )}
      </button>
    </div>
  );
}
