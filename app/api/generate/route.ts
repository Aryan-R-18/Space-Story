import { NextResponse } from 'next/server';
import { buildPrompt } from '@/lib/promptBuilder';
import { callGemini } from '@/lib/geminiClient';
import { moderateText } from '@/lib/moderation';

import gTTS from 'gtts'; // ⬅️ Ignore type errors for now

export async function POST(req: Request) {
  try {
    const { themes = [], length = 'medium', voice = 'default' } = await req.json();

    if (!Array.isArray(themes) || themes.length === 0) {
      return NextResponse.json({ error: 'No themes provided' }, { status: 400 });
    }

    const prompt = buildPrompt(themes as string[], length as 'short' | 'medium' | 'long');

    // Generate text via Gemini
    const gResponse = await callGemini(prompt);
    const storyText = gResponse?.text?.trim ? gResponse.text.trim() : '';

    if (!storyText) {
      return NextResponse.json({ error: 'Empty story from model' }, { status: 500 });
    }

    // Moderate the generated text
    const mod = await moderateText(storyText);
    if (!mod.allowed) {
      return NextResponse.json({ error: 'Content rejected by moderation' }, { status: 400 });
    }

    // Map your UI "voice" options to actual gTTS language codes (and maybe accents later)
    const language = 'en'; // English for all voices

    // Convert text to speech using gTTS
    const tts = new gTTS(storyText, language);
    const audioChunks: Buffer[] = [];

    await new Promise<void>((resolve, reject) => {
      tts.stream()
        .on('data', (chunk) => audioChunks.push(chunk)) // or (chunk: Buffer)
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    const audioBuffer = Buffer.concat(audioChunks);
    const audioBase64 = audioBuffer.toString('base64');

    return NextResponse.json({ storyText, audioBase64 });

  } catch (err: any) {
    console.error('Generate error', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
