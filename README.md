# NurtureAI — Demo Prototype

An offline, laptop-ready demo of **NurtureAI**: an AI-powered child-development &
learning companion for Pakistani parents (children aged 4–12). Built to present
alongside the business proposal.

> NurtureAI surfaces patterns worth a parent's attention — it **never diagnoses**.
> Any assessment or diagnosis is made only by a qualified professional.

## Run it

```bash
npm install
npm run dev
```

Then open the printed URL (default http://localhost:5190).

- **Landing page** (`/`) — the marketing story: problem, solution, how it works,
  the AI engine, pricing (3 revenue models), and the trust/guardrail section.
- **Live demo** (`/app`) — the product inside a phone frame. Explore every screen,
  or hit **▶ Guided story** to run the scripted 6-step walkthrough of Sara's
  reading journey. **↺ Reset** restores the seeded demo data.

## What's inside (Phase-1 MVP)

Child profile · parent assessment · development dashboard · personalized activity
recommendations · quick observation logging · weekly AI report · professional
referral directory.

## How it works

- **No backend, no internet, no login.** Seeded TypeScript data + `localStorage`.
- The "AI" is a **deterministic, rule-based engine** (`src/logic/`) that matches
  activities to each child's interests and needs — reliable for a live demo.
- Full EN / Urdu / Roman Urdu switch (top bar): every screen of the demo, including the guided story, activities and the generated weekly report, changes language. Urdu renders right to left. Translations live in `src/i18n/dict.ts` (English text is the key; a missing entry falls back to English and logs a warning in dev). The choice is remembered in `localStorage`.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · Recharts · Framer Motion.
