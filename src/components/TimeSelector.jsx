import React from 'react';
import { Clock, Check } from 'lucide-react';
import { sound } from '../utils/soundEffects';

const DEFAULT_SLOTS = [
  '16h00',
  '16h15',
  '16h30',
  '16h45',
  '17h00',
  '17h15',
  '17h30',
  '17h45',
  '18h00',
];

export default function TimeSelector({
  erhardTime,
  claireTime,
  currentUser = 'erhard',
  onSelectTime,
  hasLocation,
  lang = 'en',
}) {
  const isUnanimous = Boolean(erhardTime && claireTime && erhardTime === claireTime);

  const handleSlotClick = (slot) => {
    sound.playClick();
    onSelectTime(slot);
  };

  if (!hasLocation) {
    return (
      <div className="h-full w-full bg-stone-100/70 border-2 border-dashed border-stone-300 rounded-2xl p-4 flex flex-col items-center justify-center text-center text-stone-400 select-none">
        <Clock className="w-9 h-9 mb-2 opacity-50 text-stone-400" />
        <p className="text-sm sm:text-base font-bold text-stone-600 max-w-[220px]">
          {lang === 'de'
            ? '👈 Bitte zuerst links einen Ort wählen'
            : lang === 'en'
            ? '👈 Please choose a location on the left first'
            : '👈 Choisissez d\'abord un endroit à gauche'}
        </p>
      </div>
    );
  }

  return (
    <div
      data-dog-obstacle="true"
      className="time-selector-card h-full w-full bg-white/95 border-2 border-amber-400/90 rounded-2xl p-2.5 sm:p-3 shadow-sm flex flex-col justify-between select-none animate-fadeIn"
    >
      {/* 9 Time Slot Buttons arranged vertically in 2 columns */}
      <div className="grid grid-cols-2 gap-1.5 flex-1 min-h-0 content-between py-1">
        {DEFAULT_SLOTS.map((slot, idx) => {
          const erhardSelected = erhardTime === slot;
          const claireSelected = claireTime === slot;
          const slotUnanimous = erhardSelected && claireSelected;
          const currentSelected = currentUser === 'erhard' ? erhardSelected : claireSelected;
          const otherSelected = currentUser === 'erhard' ? claireSelected : erhardSelected;
          const isLast = idx === DEFAULT_SLOTS.length - 1;

          let btnClass = currentUser === 'erhard'
            ? 'bg-stone-50 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-950 hover:ring-2 hover:ring-blue-400/40 border border-stone-200 text-stone-800'
            : 'bg-stone-50 hover:bg-rose-50 hover:border-rose-500 hover:text-rose-950 hover:ring-2 hover:ring-rose-400/40 border border-stone-200 text-stone-800';

          if (slotUnanimous) {
            btnClass = 'bg-gradient-to-r from-blue-600 via-amber-500 to-rose-600 text-white shadow-md ring-3 ring-amber-300 scale-[1.02] border-amber-400 hover:brightness-110';
          } else if (currentSelected) {
            btnClass = currentUser === 'erhard'
              ? 'bg-blue-600 text-white shadow-sm ring-3 ring-blue-300 scale-[1.01] hover:bg-blue-500 hover:ring-4 hover:ring-blue-200'
              : 'bg-rose-600 text-white shadow-sm ring-3 ring-rose-300 scale-[1.01] hover:bg-rose-500 hover:ring-4 hover:ring-rose-200';
          } else if (otherSelected) {
            btnClass = currentUser === 'erhard'
              ? 'bg-rose-100 hover:bg-blue-600 hover:text-white border-2 border-rose-500 hover:border-blue-600 text-rose-900 font-bold hover:ring-3 hover:ring-blue-300 shadow-xs'
              : 'bg-blue-100 hover:bg-rose-600 hover:text-white border-2 border-blue-500 hover:border-rose-600 text-blue-900 font-bold hover:ring-3 hover:ring-rose-300 shadow-xs';
          }

          return (
            <button
              key={slot}
              type="button"
              onClick={() => handleSlotClick(slot)}
              className={`min-h-[40px] sm:min-h-[46px] px-2 py-1.5 rounded-xl flex items-center justify-between text-xs sm:text-sm md:text-base font-black font-typewriter tracking-wide transition cursor-pointer shadow-2xs active:scale-95 ${
                isLast ? 'col-span-2' : ''
              } ${btnClass}`}
            >
              <div className="flex items-center gap-1">
                {slotUnanimous ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[3] shrink-0" />
                ) : currentSelected ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[3] shrink-0" />
                ) : null}
                <span>{slot}</span>
              </div>

              {/* Vote Indicators inside Slot Button */}
              <div className="flex items-center gap-1">
                {slotUnanimous ? (
                  <span className="text-[10px] bg-white/30 px-1.5 py-0.5 rounded-full text-white font-bold">
                    🤝
                  </span>
                ) : (
                  <>
                    {erhardSelected && (
                      <span
                        className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-bold shadow-xs border border-white/80"
                        title="Erhard"
                      >
                        EB
                      </span>
                    )}
                    {claireSelected && (
                      <span
                        className="w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] flex items-center justify-center font-bold shadow-xs border border-white/80"
                        title="Claire"
                      >
                        C
                      </span>
                    )}
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Time Indicator / Two-User Status */}
      <div className="pt-2 border-t border-stone-200 text-center text-xs font-bold text-stone-700">
        {isUnanimous ? (
          <span className="text-amber-900 font-black flex items-center justify-center gap-1.5 animate-pulse">
            <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            <span>
              {lang === 'de'
                ? `🤝 Einstimmig vereinbart: ${erhardTime} !`
                : lang === 'fr'
                ? `🤝 Heure unanime convenue : ${erhardTime} !`
                : `🤝 Unanimous Agreement: ${erhardTime} !`}
            </span>
          </span>
        ) : (erhardTime || claireTime) ? (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${erhardTime ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-500'}`}>
              <span className="font-bold">Erhard:</span> {erhardTime || '...'}
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${claireTime ? 'bg-rose-100 text-rose-800' : 'bg-stone-100 text-stone-500'}`}>
              <span className="font-bold">Claire:</span> {claireTime || '...'}
            </span>
          </div>
        ) : (
          <span>
            {lang === 'de'
              ? 'Wählen Sie Ihre gewünschte Ankunftszeit'
              : lang === 'fr'
              ? 'Choisissez votre heure d\'arrivée'
              : 'Choose your arrival time'}
          </span>
        )}
      </div>
    </div>
  );
}
