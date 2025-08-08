// app/page.tsx
'use client';

import React, { useState } from 'react';
import ThemeSelector from './components/ThemeSelector';
import StoryCard from './components/StoryCard';

export default function HomePage() {
  const [themes, setThemes] = useState<string[]>([]);
  const [story, setStory] = useState<{ text: string; audioBase64?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [voice, setVoice] = useState<string>('default');

  async function generate() {
    setError(null);
    setStory(null);

    if (themes.length === 0) {
      setError('Please select at least one theme.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themes, length, voice }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to generate story');

      setStory({
        text: data.storyText,
        audioBase64: data.audioBase64,
      });
    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-rose-900 via-purple-900 to-slate-900 text-white">
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Horny Animated Overlays */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Sparkles */}
        <div className="absolute left-1/4 top-1/3 w-24 h-24 animate-pulse-slow opacity-70">
          <svg fill="none" viewBox="0 0 24 24" className="w-full h-full text-rose-300/80">
            <path d="M12 2l2.4 6.6L21 9l-5 4.9L17.6 21 12 17.3 6.4 21 8 13.9 3 9l6.6-0.4L12 2z" fill="currentColor"/>
          </svg>
        </div>
        {/* Animated Hearts */}
        <div className="absolute right-16 bottom-32 animate-float opacity-50">
          <span className="text-pink-400 text-6xl">💗</span>
        </div>
        {/* Floating Desire Words */}
        <div className="absolute left-1/2 top-3/4 text-3xl text-rose-200/15 font-bold italic select-none pointer-events-none animate-float">
          desire
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 flex-grow">
        {/* Glass Card */}
        <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden">
          {/* Gloss Overlay */}
          <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
            <svg width="100%" height="100%">
              <defs>
                <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff80" />
                  <stop offset="70%" stopColor="#ffffff10" />
                </linearGradient>
              </defs>
              <ellipse
                cx="50%" cy="20%"
                rx="80%" ry="20%"
                fill="url(#gloss)"
                className="animate-gloss"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold mb-3 text-center bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
            Bedtime Story Generator
          </h1>
          <p className="text-center text-gray-300 mb-8 text-sm italic">
            Sensual but non-explicit — perfect for dreamy nights ✨
          </p>

          {/* Theme Selector */}
          <ThemeSelector value={themes} onChange={setThemes} />

          {/* Controls */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm mb-2 text-gray-200 font-medium">Length</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value as 'short' | 'medium' | 'long')}
                className="w-full rounded-lg p-2 bg-slate-800/60 text-white border border-rose-400/40 focus:ring-2 focus:ring-rose-400 transition"
              >
                <option value="short">Short (~150–250 words)</option>
                <option value="medium">Medium (~300–500 words)</option>
                <option value="long">Long (~600–1000 words)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-200 font-medium">Voice</label>
              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="w-full rounded-lg p-2 bg-slate-800/60 text-white border border-purple-400/40 focus:ring-2 focus:ring-purple-400 transition"
              >
                <option value="default">Default</option>
                <option value="warm_male">Warm Male</option>
                <option value="soft_female">Soft Female</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={generate}
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 font-semibold text-white shadow-lg transition disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Generating...
                  </span>
                ) : (
                  'Generate Story'
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Story Output */}
          <div className="mt-10">
            {story ? (
              <StoryCard text={story.text} audioBase64={story.audioBase64} />
            ) : (
              <p className="text-sm text-gray-400 text-center">No story yet. Your magical tale awaits...</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-gray-300 text-sm backdrop-blur-md bg-white/5 border-t border-white/10">
        <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent font-semibold">
          Developer @ArnR
        </span>
      </footer>
    </main>
  );
}
