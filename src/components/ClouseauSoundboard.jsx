import React, { useState } from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEffects';

const QUOTES = [
  {
    quote: "« I suspect everyone, and I suspect no one! »",
    context: "La philosophie d'enquête fondamentale de Jacques Clouseau"
  },
  {
    quote: "« That is not my dog! »",
    context: "L'incompréhension canine la plus célèbre du cinéma"
  },
  {
    quote: "« Cato! Not now, you fool! »",
    context: "Lors des embuscades d'arts martiaux à domicile"
  },
  {
    quote: "« There is a time to laugh and a time not to laugh, and this is not one of them! »",
    context: "Déclaration solennelle de l'Inspecteur Principal"
  },
  {
    quote: "« A 'rhombus' of extraordinary significance! »",
    context: "Analyse géométrique d'un indice crucial"
  }
];

export default function ClouseauSoundboard() {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextQuote = () => {
    sound.playInspectorAha();
    setActiveIdx((prev) => (prev + 1) % QUOTES.length);
  };

  const current = QUOTES[activeIdx];

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 text-center shadow-md relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-amber-300 font-typewriter text-xs uppercase tracking-wider mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Le Carnet de Citations de Clouseau</span>
        </div>

        <blockquote className="text-2xl sm:text-3xl font-extrabold font-serif-vintage text-stone-900 mb-3 transition-all">
          {current.quote}
        </blockquote>

        <p className="text-stone-600 text-base font-typewriter mb-6">
          — {current.context}
        </p>

        <button
          type="button"
          onClick={nextQuote}
          className="min-h-[48px] px-6 py-2.5 bg-stone-900 hover:bg-amber-600 text-amber-200 hover:text-white rounded-xl font-bold text-base shadow-sm cursor-pointer transition active:scale-95 inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Autre réplique culte de Clouseau</span>
        </button>
      </div>
    </div>
  );
}
