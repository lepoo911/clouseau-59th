import React, { useEffect } from 'react';
import { fireConfetti } from '../utils/confetti';
import { Clock, Mail, RefreshCw } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function DecisionBanner({
  selectedLocation,
  selectedTime,
  isUnanimous = false,
  isLocationUnanimous = false,
  isTimeUnanimous = false,
  erhardLocation,
  claireLocation,
  erhardTime,
  claireTime,
  onReset,
  tDecision,
  lang = 'en',
}) {
  useEffect(() => {
    if (isUnanimous && selectedLocation && selectedTime) {
      // Fire celebratory confetti!
      fireConfetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#e11d48', '#f59e0b', '#10b981', '#ffffff']
      });

      // Play victory fanfare
      sound.playFanfare();
    }
  }, [isUnanimous, selectedLocation, selectedTime]);

  // If not unanimous yet, show friendly consensus checklist
  if (!isUnanimous) {
    return (
      <div
        data-dog-obstacle="true"
        className="decision-card h-full w-full bg-stone-100/80 border-2 border-dashed border-amber-400/80 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between text-center select-none animate-fadeIn"
      >
        <div className="w-full flex flex-col items-center">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-500 bg-[#fcf8e1] shadow-xs mb-1.5 flex items-center justify-center relative">
            <img
              src={`${import.meta.env.BASE_URL}assets/clouseau_disney_suspicious.png`}
              alt="Inspector Clouseau"
              className="w-full h-full object-cover animate-suspicious-clouseau"
            />
          </div>
          <h4 className="text-base sm:text-lg font-black font-serif-vintage text-stone-900 leading-tight mb-1">
            {lang === 'de'
              ? 'Einstimmige Wahl erforderlich'
              : lang === 'fr'
              ? 'Vote unanime requis'
              : 'Unanimous Vote Required'}
          </h4>
          <p className="text-xs text-stone-600 max-w-[260px] leading-snug mb-3">
            {lang === 'de'
              ? 'Erhard & Claire müssen denselben Ort und dieselbe Zeit wählen!'
              : lang === 'fr'
              ? 'Erhard et Claire doivent choisir le même endroit et la même heure !'
              : 'Erhard & Claire must both agree on the same location & arrival time!'}
          </p>

          {/* Side-by-Side Voter Status Cards */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm mb-3">
            {/* Erhard Vote Box (Blue) */}
            <div className="bg-blue-50/90 border-2 border-blue-400 rounded-xl p-2 text-left shadow-xs">
              <div className="flex items-center gap-1.5 mb-1.5">
                <img
                  src={`${import.meta.env.BASE_URL}assets/erhard_avatar.png`}
                  alt="Erhard"
                  className="w-5 h-5 rounded-full object-cover border border-blue-500"
                />
                <span className="text-xs font-black font-typewriter text-blue-900">Erhard 💙</span>
              </div>
              <div className="text-[11px] space-y-1">
                <div className="truncate text-stone-800">
                  <span className="font-bold text-blue-900">Ort:</span> {erhardLocation?.title || '...'}
                </div>
                <div className="truncate text-stone-800">
                  <span className="font-bold text-blue-900">Zeit:</span> {erhardTime || '...'}
                </div>
              </div>
            </div>

            {/* Claire Vote Box (Rose) */}
            <div className="bg-rose-50/90 border-2 border-rose-400 rounded-xl p-2 text-left shadow-xs">
              <div className="flex items-center gap-1.5 mb-1.5">
                <img
                  src={`${import.meta.env.BASE_URL}assets/claire_avatar.png`}
                  alt="Claire"
                  className="w-5 h-5 rounded-full object-cover border border-rose-500"
                />
                <span className="text-xs font-black font-typewriter text-rose-900">Claire ❤️</span>
              </div>
              <div className="text-[11px] space-y-1">
                <div className="truncate text-stone-800">
                  <span className="font-bold text-rose-900">Ort:</span> {claireLocation?.title || '...'}
                </div>
                <div className="truncate text-stone-800">
                  <span className="font-bold text-rose-900">Zeit:</span> {claireTime || '...'}
                </div>
              </div>
            </div>
          </div>

          {/* Agreement Status Indicators */}
          <div className="space-y-1.5 text-xs text-left w-full max-w-sm">
            <div className={`flex items-center justify-between px-3 py-1.5 rounded-lg border ${
              isLocationUnanimous
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <span className="flex items-center gap-1.5">
                <span>{isLocationUnanimous ? '✓' : '1.'}</span>
                <span>{lang === 'de' ? 'Ort-Einigung :' : lang === 'fr' ? 'Accord sur l\'endroit :' : 'Location Agreement :'}</span>
              </span>
              <span className="font-typewriter font-bold text-[11px]">
                {isLocationUnanimous
                  ? (lang === 'de' ? 'Einstimmig!' : lang === 'fr' ? 'Unanime !' : 'Agreed!')
                  : (erhardLocation || claireLocation ? (lang === 'de' ? 'Nicht einig' : lang === 'fr' ? 'Différent' : 'Differing') : '...')}
              </span>
            </div>

            <div className={`flex items-center justify-between px-3 py-1.5 rounded-lg border ${
              isTimeUnanimous
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <span className="flex items-center gap-1.5">
                <span>{isTimeUnanimous ? '✓' : '2.'}</span>
                <span>{lang === 'de' ? 'Zeit-Einigung :' : lang === 'fr' ? 'Accord sur l\'heure :' : 'Time Agreement :'}</span>
              </span>
              <span className="font-typewriter font-bold text-[11px]">
                {isTimeUnanimous
                  ? (lang === 'de' ? 'Einstimmig!' : lang === 'fr' ? 'Unanime !' : 'Agreed!')
                  : (erhardTime || claireTime ? (lang === 'de' ? 'Nicht einig' : lang === 'fr' ? 'Différent' : 'Differing') : '...')}
              </span>
            </div>
          </div>
        </div>

        {/* Clouseau Guidance Tip at Bottom */}
        <p className="text-[11px] text-amber-950/80 italic font-serif-vintage mt-2 bg-amber-100/60 rounded-lg px-2.5 py-1 border border-amber-300/50">
          {lang === 'de'
            ? '« Beide VIP-Detektive müssen zustimmen, bevor das Urteil besiegelt werden kann ! »'
            : lang === 'fr'
            ? '« Les deux détectives VIP doivent convenir du même choix pour clore l\'enquête ! »'
            : '« Both VIP detectives must agree on the same choice to seal the verdict! »'}
        </p>
      </div>
    );
  }

  const letter = tDecision?.letter || {};
  const punchline = letter.punchlines?.[selectedLocation.id] || letter.punchlines?.default || '';

  const emailRecipient = 'tubywuby@gmail.com';
  const emailSubject = lang === 'fr'
    ? `lePoo's 59 - Verdict officiel de EB & Claire : ${selectedLocation.title} à ${selectedTime} ⛳`
    : lang === 'de'
    ? `lePoo's 59 - Offizielles Urteil von EB & Claire : ${selectedLocation.title} um ${selectedTime} ⛳`
    : `lePoo's 59 - Official Verdict from EB & Claire : ${selectedLocation.title} at ${selectedTime} ⛳`;

  const emailBody = typeof tDecision?.smsMessage === 'function'
    ? tDecision.smsMessage(selectedLocation.title, selectedLocation.address, selectedTime)
    : `Dear Jacques (lePoo)! Official 19th-hole verdict for your 59th birthday: We have locked in ${selectedLocation.title} at ${selectedTime}! Ready our table at the clubhouse, no mulligans allowed! - EB & Claire ⛳`;

  const handleSendToLePoo = () => {
    sound.playClick();
    const mailtoUrl = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailRecipient)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // If mobile, open native email client / Gmail app
    const isMobile = typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = mailtoUrl;
    } else {
      // On desktop, open Gmail compose tab with mailto fallback
      const win = window.open(gmailUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = mailtoUrl;
      }
    }
  };

  const rawImage = selectedLocation?.image || '';
  const cleanImage = rawImage.startsWith('/') ? rawImage.slice(1) : rawImage;
  const imageSrc = cleanImage ? `${import.meta.env.BASE_URL}${cleanImage}` : '';

  return (
    <div
      data-dog-obstacle="true"
      className="decision-card h-full w-full bg-[#fdfcf7] border-2 sm:border-3 border-amber-700/60 rounded-2xl p-2.5 sm:p-3.5 shadow-xl flex flex-col justify-between text-left select-none relative overflow-hidden animate-fadeIn"
    >
      {/* Scrollable Letter Body */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        {/* Letterhead & Postage Stamp */}
        <div className="flex items-start justify-between gap-2 border-b border-amber-800/20 pb-2 mb-2">
          {/* Memo Headers */}
          <div className="font-typewriter text-xs sm:text-sm text-stone-800 leading-normal space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-amber-900">{letter.toLabel || 'TO :'}</span>
              <span className="font-bold text-stone-950">{letter.toName || 'Chief Inspector Jacques Clouseau'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-amber-900">{letter.fromLabel || 'FROM :'}</span>
              <span className="font-bold text-stone-950">{letter.fromName || 'EB & Claire ⛳'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-amber-900">{letter.subjectLabel || 'RE :'}</span>
              <span className="text-emerald-900 font-extrabold truncate max-w-[200px] sm:max-w-[260px]">
                {letter.subject || 'Official 19th Hole Verdict • Birthday #59'}
              </span>
            </div>
          </div>

          {/* Faux Postage Stamp & Cancellation Seal */}
          <div className="flex items-center gap-1 shrink-0">
            <div className="relative border-2 border-dashed border-amber-600 bg-amber-50/90 rounded px-1.5 py-1 text-center shadow-2xs rotate-2">
              <div className="text-[9px] font-black font-typewriter text-amber-950 leading-none">59¢</div>
              <div className="text-[10px] leading-none my-0.5">⛳</div>
              <div className="text-[7px] font-bold text-stone-500 uppercase tracking-tighter">SÛRETÉ</div>
              {/* Postal cancellation bar */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <span className="text-[8px] font-typewriter tracking-widest text-red-900 -rotate-12">≋≋≋</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onReset}
              className="p-1 text-stone-400 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition cursor-pointer ml-1"
              title={letter.changeBtn || 'Modify choice'}
              aria-label="Modify"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Erhard & Claire Happy Faces Portrait */}
        <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md mb-2 relative bg-amber-100">
          <img
            src={`${import.meta.env.BASE_URL}assets/erhard_claire_happy.png`}
            alt="Erhard & Claire"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 via-amber-500 to-rose-600 text-white text-[10px] sm:text-[11px] font-black font-typewriter px-2 py-0.5 rounded-full shadow-md border border-white/80 animate-pulse">
            {lang === 'de' ? '🤝 Einstimmig vereinbart !' : lang === 'fr' ? '🤝 Accord unanime !' : '🤝 Unanimous Decision!'}
          </div>
        </div>

        {/* Salutation */}
        <h3 className="text-base sm:text-lg font-black font-serif-vintage text-stone-950 mb-1">
          {letter.salutation || 'Dear Jacques,'}
        </h3>

        {/* Opening */}
        <p className="text-xs sm:text-sm font-serif-vintage text-stone-900 leading-snug mb-2">
          {letter.opening ||
            'After calculating the wind drift and sinking a solid gold putt on the greens, our official scorecard is in! For your 59th birthday celebration, we hereby confirm our arrival at:'}
        </p>

        {/* Official Dispatch Location Box with Image */}
        <div className="bg-gradient-to-r from-amber-100/90 to-amber-50 border-2 border-amber-600/70 rounded-xl p-2 sm:p-2.5 mb-2 shadow-2xs flex items-center gap-3">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={selectedLocation.title}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-amber-400/80 shadow-xs shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-base sm:text-lg font-black font-serif-vintage text-stone-950 leading-tight truncate mb-1">
              {selectedLocation.title}
            </h4>
            <span className="inline-flex items-center gap-1.5 bg-emerald-700 text-white px-2.5 py-1 rounded-md font-typewriter font-black text-xs sm:text-sm shrink-0 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-emerald-200" />
              <span>{selectedTime}</span>
            </span>
          </div>
        </div>

        {/* Humorous Location Punchline (Golf & Gold banter) */}
        {punchline && (
          <p className="text-xs sm:text-sm text-stone-800 leading-snug italic bg-amber-50/70 border-l-3 border-emerald-600 pl-2.5 py-1.5 mb-2.5 rounded-r-md font-medium">
            {punchline}
          </p>
        )}

        {/* Closing & Signoff */}
        <div className="pt-1 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs sm:text-sm font-serif-vintage text-stone-700 italic">
              {letter.signoff || 'Yours on the greens & in mystery,'}
            </p>
            <p className="text-sm sm:text-base font-black font-serif-vintage text-amber-950 tracking-tight">
              {letter.signature || 'EB & Claire ⛳'}
            </p>
          </div>

          {/* Official Rubber Stamp in Corner */}
          <div className="border-2 border-red-700 text-red-800 px-2 py-0.5 rounded-md font-typewriter text-[10px] sm:text-xs font-black uppercase tracking-wider -rotate-3 select-none shrink-0 shadow-2xs bg-red-50/50">
            {letter.stampBadge || 'VERDICT CONFIRMED • 19TH HOLE'}
          </div>
        </div>
      </div>

      {/* Action Button Below the Letter: Send to lePoo with his suspicious face */}
      <div className="pt-2.5 border-t border-amber-800/20 shrink-0 mt-1">
        <button
          type="button"
          onClick={handleSendToLePoo}
          title={`Send verdict to tubywuby@gmail.com`}
          aria-label={`Send verdict to tubywuby@gmail.com`}
          className="w-full min-h-[50px] sm:min-h-[54px] py-2 sm:py-2.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white text-base sm:text-lg font-black flex items-center justify-between gap-3 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-200 active:scale-98 group"
        >
          {/* lePoo's Suspicious Face Avatar */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-amber-300 shadow-sm shrink-0 bg-amber-100 group-hover:scale-110 transition-transform">
              <img
                src={`${import.meta.env.BASE_URL}assets/lepoo_suspicious.jpg`}
                alt="lePoo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left leading-tight min-w-0">
              <span className="truncate">{letter.smsBtn || 'Send to lePoo'}</span>
              <span className="text-[11px] font-normal text-emerald-100 font-mono opacity-90 truncate">tubywuby@gmail.com</span>
            </div>
          </div>
          <Mail className="w-5 h-5 text-emerald-200 group-hover:scale-110 group-hover:text-white transition-all shrink-0 ml-2" />
        </button>
      </div>
    </div>
  );
}
