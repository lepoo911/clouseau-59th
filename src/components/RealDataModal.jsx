import React, { useState } from 'react';
import { X, Copy, Check, Database } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export default function RealDataModal({
  isOpen,
  onClose,
  voting = {},
  locations = []
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const erhardVote = voting.erhardVote || {};
  const claireVote = voting.claireVote || {};
  const erhardLoc = locations.find((l) => l.id === erhardVote.locationId);
  const claireLoc = locations.find((l) => l.id === claireVote.locationId);

  const rawData = {
    currentUser: voting.currentUser,
    isUnanimous: Boolean(voting.isUnanimous),
    isLocationUnanimous: Boolean(voting.isLocationUnanimous),
    isTimeUnanimous: Boolean(voting.isTimeUnanimous),
    votes: {
      erhard: {
        locationId: erhardVote.locationId || null,
        locationTitle: erhardLoc?.title || null,
        time: erhardVote.time || null,
      },
      claire: {
        locationId: claireVote.locationId || null,
        locationTitle: claireLoc?.title || null,
        time: claireVote.time || null,
      }
    },
    url: typeof window !== 'undefined' ? window.location.href : ''
  };

  const jsonString = JSON.stringify(rawData, null, 2);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(jsonString);
      setCopied(true);
      sound.playClick();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#faf7f0] border-2 border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-amber-100 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" />
            <span className="font-typewriter font-bold text-sm tracking-wide">
              Real Voting Data (Read-Only)
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm font-typewriter text-stone-900">
          {/* Quick Read-Only Table */}
          <div className="bg-white border border-stone-300 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-300 text-[11px] uppercase tracking-wider text-stone-600">
                  <th className="p-2">Voter</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr className={voting.currentUser === 'erhard' ? 'bg-blue-50/70 font-bold' : ''}>
                  <td className="p-2 text-blue-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    Erhard {voting.currentUser === 'erhard' ? '(Active)' : ''}
                  </td>
                  <td className="p-2 text-stone-800">{erhardLoc?.title || '—'}</td>
                  <td className="p-2 text-stone-800">{erhardVote.time || '—'}</td>
                  <td className="p-2">
                    {erhardVote.locationId && erhardVote.time ? (
                      <span className="text-emerald-700 font-bold">Complete ✓</span>
                    ) : erhardVote.locationId ? (
                      <span className="text-amber-700">Location only</span>
                    ) : (
                      <span className="text-stone-400">Pending</span>
                    )}
                  </td>
                </tr>
                <tr className={voting.currentUser === 'claire' ? 'bg-rose-50/70 font-bold' : ''}>
                  <td className="p-2 text-rose-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    Claire {voting.currentUser === 'claire' ? '(Active)' : ''}
                  </td>
                  <td className="p-2 text-stone-800">{claireLoc?.title || '—'}</td>
                  <td className="p-2 text-stone-800">{claireVote.time || '—'}</td>
                  <td className="p-2">
                    {claireVote.locationId && claireVote.time ? (
                      <span className="text-emerald-700 font-bold">Complete ✓</span>
                    ) : claireVote.locationId ? (
                      <span className="text-amber-700">Location only</span>
                    ) : (
                      <span className="text-stone-400">Pending</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Consensus status summary */}
          <div className="flex flex-wrap gap-2 text-xs">
            <div className={`px-2.5 py-1 rounded-lg border font-bold ${
              voting.isLocationUnanimous
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              Location Match: {voting.isLocationUnanimous ? 'Agreed ✓' : 'Differing ✗'}
            </div>
            <div className={`px-2.5 py-1 rounded-lg border font-bold ${
              voting.isTimeUnanimous
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              Time Match: {voting.isTimeUnanimous ? 'Agreed ✓' : 'Differing ✗'}
            </div>
            <div className={`px-2.5 py-1 rounded-lg border font-bold ${
              voting.isUnanimous
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-stone-200 text-stone-800 border-stone-300'
            }`}>
              Unanimous Verdict: {voting.isUnanimous ? 'YES 🎉' : 'NO'}
            </div>
          </div>

          {/* Raw JSON block */}
          <div className="relative">
            <div className="flex items-center justify-between text-[11px] text-stone-600 font-bold mb-1">
              <span>RAW JSON DATA:</span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-stone-700 hover:text-stone-950 underline cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="bg-stone-900 text-emerald-400 p-3 rounded-xl text-[11px] font-mono overflow-x-auto border border-stone-700 max-h-48 leading-snug">
              {jsonString}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-100 px-4 py-2 border-t border-stone-300 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold font-typewriter cursor-pointer transition shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
