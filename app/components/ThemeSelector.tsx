// app/components/ThemeSelector.tsx
import React from 'react';

const AVAILABLE = ['romance','seductive','thrilling','mystery','horror','fantasy','calm','intimate'];

export default function ThemeSelector({ value, onChange }: { value: string[], onChange: (s:string[])=>void }) {
  function toggle(t: string) {
    if (value.includes(t)) onChange(value.filter(x=>x!==t));
    else onChange([...value, t]);
  }
  return (
    <div>
      <label className="block mb-2 text-sm">Choose themes (multi-select):</label>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE.map(t => (
          <button key={t}
            onClick={() => toggle(t)}
            className={`px-3 py-1 rounded-full border ${value.includes(t) ? 'bg-rose-500 border-rose-500' : 'bg-transparent border-gray-600'}`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
