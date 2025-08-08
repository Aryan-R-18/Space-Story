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
        audioBase64: data.audioBase64, // from gTTS
      });
    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-slate-900/40 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-semibold mb-4 text-white">
          Bedtime Story Generator — 18+ (gentle, non-explicit)
        </h1>

        <p className="mb-4 text-sm text-gray-300">
          Select themes, choose length &amp; voice. Generated stories are
          <em> sensual but non-explicit</em>. No account or billing required.
        </p>

        <ThemeSelector value={themes} onChange={setThemes} />

        <div className="mt-4 flex gap-4 items-center flex-wrap">
          <label className="text-sm text-white">Length:</label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value as any)}
            className="rounded p-2 bg-slate-800 text-white"
          >
            <option value="short">Short (~150–250 words)</option>
            <option value="medium">Medium (~300–500 words)</option>
            <option value="long">Long (~600–1000 words)</option>
          </select>

          <label className="text-sm text-white">Voice:</label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="rounded p-2 bg-slate-800 text-white"
          >
            <option value="default">Default</option>
            <option value="warm_male">Warm Male</option>
            <option value="soft_female">Soft Female</option>
          </select>

          <button
            onClick={generate}
            disabled={loading}
            className="ml-auto px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded text-white transition"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        <div className="mt-6">
          {story ? (
            <StoryCard text={story.text} audioBase64={story.audioBase64} />
          ) : (
            <p className="text-sm text-gray-400">No story yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
