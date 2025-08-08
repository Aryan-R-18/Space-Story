// app/components/StoryCard.tsx
'use client';

import React, { useState } from 'react';

export default function StoryCard({
  text,
  audioBase64,
}: {
  text: string;
  audioBase64?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (!audioBase64) return;
    const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
    audio.play();
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <div className="mt-4 bg-slate-800/60 p-4 rounded">
      <h2 className="text-xl font-semibold mb-2 text-white">Your Story</h2>
      <div className="prose max-w-none text-gray-100 whitespace-pre-wrap">
        {text}
      </div>

      {audioBase64 && (
        <div className="mt-4">
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className={`px-4 py-2 rounded ${
              isPlaying
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition`}
          >
            {isPlaying ? 'Playing...' : '🔊 Listen to Story'}
          </button>
        </div>
      )}
    </div>
  );
}
