# NurtureAI — Demo Script

**Total time: ~4–5 minutes.** Practice it once end-to-end before presenting — the timings below are a
guide, not a hard rule. Have the app open at `http://localhost:5190/` before you start talking.

---

## 0. Before you start (10 sec)

- Open **http://localhost:5190/** in the browser.
- If data looks messy from earlier testing, go to `/app` and hit **↺ Reset** to restore the clean demo.
- Have this open full-screen. Close other tabs/notifications.

---

## 1. The landing page (45 sec)

> "This is **NurtureAI** — an AI-powered child development and learning companion for Pakistani
> parents, for kids aged 4 to 12."

**Scroll down slowly** as you talk, so the reveals/animations play:

> "The core problem: parents see their child's exam grades, but not the fuller picture — how they're
> actually learning, their attention span, reading habits, social skills. That information is
> scattered across school reports, tuition centers, and WhatsApp advice."

Point at the "Why AI" section (Sara vs. Ahmed comparison):

> "The AI matters because two children are never the same. Here you can see — one child loves
> football, one loves animals, one needs help with reading, one with attention. The system
> recommends *different* activities for each, based on their actual profile — not generic worksheets."

Scroll to pricing briefly:

> "The business model is three revenue streams: a parent subscription, an annual school license per
> student, and a commission-based referral marketplace for therapists and tutors."

Click **"Try the live demo"**.

---

## 2. Enter the app — Home screen (30 sec)

You'll land on the phone-frame prototype.

> "This is the actual product — a mobile app. Right now we're looking at Sara's profile, age 8. At
> the top: today's AI pick — an 'Animal Detective Reading Game,' 15 minutes, matched specifically to
> her interest in animals."

Point at the tile grid:

> "From home, a parent can jump to the development dashboard, today's activities, log a quick
> check-in, or see the weekly report."

---

## 3. The main event — Guided Story (2 min) ⭐

This is the centerpiece. Click **▶ Guided story** in the top bar.

> "Rather than click around randomly, let me walk you through a real scenario the app is built to
> handle — I'll use the guided story mode."

**Step through each beat, reading the on-screen text and adding a line of your own:**

1. **"Meet Sara, age 8"**
   > "Sara's mother notices something: Sara understands stories when read aloud, but avoids reading
   > independently. That's the kind of thing that never shows up on a report card."

2. **"A 30-second check-in"**
   > "Instead of a long form, she logs a quick observation — reading minutes, focus, mood. Takes
   > under a minute, a few times a week."

3. **"The pattern surfaces"**
   > "Here's the dashboard. NurtureAI doesn't react to one bad day — it looks at the *trend*. Reading
   > independence is flagged as 'needs monitoring,' but you can see practice time is actually rising
   > over the past few weeks."

4. **"A 4-week plan, built around animals"**
   > "Because Sara loves animals, the AI recommends the Animal Detective Reading Game — not a random
   > worksheet. This is the personalization: same problem, different child, different activity."

5. **"Progress you can see"**
   > "After a few weeks: reading engagement is up about 25%. The weekly report turns raw check-ins
   > into a plain-language summary a busy parent can actually read in ten seconds."

6. **"Escalate gently, never diagnose"** ← *this is the most important slide*
   > "And here's the core guardrail of the whole product: if a pattern *had* persisted, NurtureAI
   > would suggest — never diagnose — a qualified professional, with booking built in. The app
   > surfaces patterns worth attention. The actual assessment is always made by a real, qualified
   > person, never the AI."

Click **Exit** on the story panel.

---

## 4. Quick tour of two more screens (45 sec)

**Tap "Find support"** (bottom nav):

> "This is the referral marketplace — vetted therapists, tutors, psychologists. Notice the guardrail
> banner repeated here too: 'NurtureAI does not diagnose.' It's baked into every touchpoint, not just
> one disclaimer page."

**Tap the language switcher (EN / UR / RU) in the top bar:**

*(Tip: switch to UR on the Home or Report screen. The whole app flips to Urdu, right to left, including the AI-written report text. Switch back to EN before handing the demo to the next judge.)*

> "And because this is built for Pakistani families specifically, the interface supports English,
> Urdu, and Roman Urdu — not just translated content, but content adapted to how families actually
> communicate at home."

---

## 5. Wrap-up (30 sec)

> "To summarize: NurtureAI turns scattered, reactive information into a continuous, proactive picture
> of a child's development. It personalizes using AI — not generic content — and it's designed with
> a hard ethical line: support and visibility, never diagnosis.
>
> This is a fully working prototype — everything you just saw is live, driven by real logic, not a
> slideshow. Happy to answer questions or click into anything you'd like to see again."

---

## Backup: if something doesn't load / behaves oddly

- Hit **↺ Reset** in the app header — restores clean seed data instantly.
- If a screen looks blank, you likely have no child selected — click **"Create a profile"** on the
  mascot empty-state screen, or just hit Reset.
- Everything runs 100% locally/offline — no internet dependency, so a wifi hiccup won't break it.

## One-liner if asked "is this real AI / a real backend?"

> "The recommendation logic is a deterministic rules engine — it matches each child's profile and
> check-in history to interest-tagged activities. It's built this way *on purpose* for a live demo:
> it's instant, offline, and 100% reliable to present. Production version would layer in a real ML
> model on top of the same personalization logic."
