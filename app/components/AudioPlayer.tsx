// app/components/AudioPlayer.tsx
import React from 'react';

export default function AudioPlayer({ base64 }: { base64: string }) {
  const src = `data:audio/mpeg;base64,${base64}`;
  return (
    <audio controls src={src} className="w-full mt-2" />
  );
}
