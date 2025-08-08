// app/components/ThemeSelector.tsx
import React from 'react';

// Expanded seductive themes with emoji
const AVAILABLE = [
  'Romance 💋',
  'Seductive 👄',
  'Thrilling 🔥',
  'Mystery 🖤',
  'Horror 😈',
  'Fantasy ✨',
  'Calm 🦋',
  'Intimate 💗',
  'Temptation 🍒',
  'Fever 💦',
  'Sultry 🌹',
];

export default function ThemeSelector({
  value,
  onChange,
}: { value: string[], onChange: (s:string[])=>void }) {
  function toggle(t: string) {
    if (value.includes(t)) onChange(value.filter(x=>x!==t));
    else onChange([...value, t]);
  }
  return (
    <div className="relative max-w-md p-6 bg-gradient-to-b from-rose-900 via-rose-700 to-black rounded-2xl shadow-2xl overflow-hidden">
      {/* Seductive Floating Emojis */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <span className="absolute left-3 top-3 text-5xl opacity-30 animate-pulse-slow">💋</span>
        <span className="absolute right-5 bottom-2 text-5xl opacity-20 animate-float">👄</span>
        <span className="absolute left-1/2 -translate-x-1/2 top-1/2 text-4xl opacity-10 animate-pulse-slow">💗</span>
        <span className="absolute right-10 top-8 text-3xl opacity-20 animate-float">🍒</span>
      </div>
      
      <label className="block mb-3 text-md font-semibold text-rose-100 drop-shadow">
        Choose your fantasy <span className="italic text-rose-400">(multi-select):</span>
      </label>

      <div className="flex flex-wrap gap-3 z-10 relative">
        {AVAILABLE.map(t => (
          <button
            key={t}
            onClick={() => toggle(t)}
            className={`transition-all duration-200 px-4 py-2 rounded-full border-2 outline-none focus:ring-2 focus:ring-rose-400
              ${value.includes(t)
                ? 'bg-gradient-to-br from-rose-500 via-rose-700 to-pink-700 border-pink-300 text-white shadow-pink-200/50 shadow-lg scale-110'
                : 'bg-black/60 border-rose-700 text-pink-100 hover:shadow-pink-400/30 hover:shadow-lg hover:border-pink-400 hover:text-pink-200'
              }`
            }
            style={{ letterSpacing: '0.06em', fontWeight: 600 }}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="text-xs text-rose-300 mt-4 italic">
        * Select one or more and uncover your desires.
      </p>
    </div>
  );
}
