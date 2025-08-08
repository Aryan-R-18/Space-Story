// lib/moderation.ts
import axios from 'axios';

const BAD_PATTERNS = [
  // basic checks — extend with your own logic
  /sexual act/i,
  /explicit/i,
  /underage|minor/i,
  /non-?consent/i,
];

export async function moderateText(text: string) {
  const lower = text.toLowerCase();

  for (const p of BAD_PATTERNS) {
    if (p.test(lower)) {
      return { allowed: false, reason: 'Contains disallowed content' };
    }
  }

  // Optional: call an external moderation API if you have one
  // Example skeleton (commented):
  // if (process.env.MODERATION_API_KEY) {
  //   const resp = await axios.post('https://moderation.example/v1/moderate', { input: text }, { headers: { Authorization: `Bearer ${process.env.MODERATION_API_KEY}` } });
  //   if (resp.data.flagged) return { allowed: false, reason: 'Flagged by moderation API' };
  // }

  return { allowed: true };
}
