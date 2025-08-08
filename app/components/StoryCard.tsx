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

  // Play story audio
  const playAudio = () => {
    if (!audioBase64) return;
    const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
    audio.play();
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <div className="relative mt-6 rounded-3xl bg-gradient-to-b from-rose-800 via-purple-900 to-black/80 p-7 shadow-2xl border border-white/20 overflow-hidden">
      {/* Seductive Glossy Overlay */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0">
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="story-gloss" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff3" />
              <stop offset="70%" stopColor="#fff0" />
            </linearGradient>
          </defs>
          <ellipse
            cx="60%" cy="15%"
            rx="80%" ry="16%"
            fill="url(#story-gloss)"
            className="animate-gloss"
          />
        </svg>
      </div>

      {/* Floating Emojis / Hearts */}
      <div className="pointer-events-none absolute left-5 top-7 z-0 text-4xl opacity-25 animate-pulse-slow">💋</div>
      <div className="pointer-events-none absolute right-10 bottom-7 z-0 text-4xl opacity-20 animate-float">👄</div>

      {/* Story Title */}
      <h2 className="relative z-10 text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-rose-300 via-pink-400 to-purple-300 bg-clip-text text-transparent drop-shadow">
        Your Desire Story
      </h2>

      {/* Story Text */}
      <div className="relative z-10 prose prose-lg prose-p:my-2 prose-p:text-pink-100 max-w-none text-pink-100 whitespace-pre-wrap font-medium px-1">
        {text}
      </div>

      {/* Audio Button */}
      {audioBase64 && (
        <div className="relative z-10 mt-7 flex justify-center">
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition font-semibold shadow-lg text-white 
              ${isPlaying
                ? 'bg-gradient-to-r from-gray-600 to-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500'
              }`
            }
          >
            {isPlaying ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Playing...</span>
              </>
            ) : (
              <>
                <span className="text-2xl">🔊</span>
                <span>Listen to Your Fantasy</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
