# NurtureAI — Feedback Questions (Google Forms setup)

One form, two audiences. A single screener question branches parents into their
own section and psychologists/therapists into theirs, so you only need to
create and share **one form** and **one link**.

**Live demo to link in the form description:** https://nurture-ai-kappa.vercel.app

---

## Setting it up in Google Forms (~5 minutes)

1. Go to **forms.google.com** → **Blank form**.
2. **Title:** `NurtureAI — Parent & Professional Feedback`
3. **Description** (paste this in): *"Thank you for trying NurtureAI! Before you
   answer, please spend 2–3 minutes with the live demo:
   https://nurture-ai-kappa.vercel.app — try the 'Guided story' button in the
   app to see the full experience. Your honest feedback shapes what we build
   next. Responses are anonymous unless you choose to share contact info."*
4. **Settings (⚙️ gear icon) → Responses:** leave "Collect email addresses" **off**
   (keeps it anonymous and lowers friction).
5. Add the **screener question** below as your first question.
6. Click the **⋮ (three dots) menu on that question → "Go to section based on
   answer"** — this turns on branching.
7. Use the **"Add section"** icon in the right-side toolbar (looks like two
   stacked rectangles) to create two new sections: **"Section 2 — Parents"**
   and **"Section 3 — Professionals"**.
8. Back on the screener question, set each answer option to jump to its
   matching section (see below).
9. Add all **Parent questions** into Section 2, and all **Professional
   questions** into Section 3.
10. At the **bottom of each section**, set "After section 2" / "After section
    3" to **"Submit form"** — so nobody falls through into the wrong section.
11. For every question marked **[Linear scale 1–5]** below: click the question
    type dropdown → **Linear scale**, set range 1 to 5, and label the two ends
    as shown.
12. When done, click **Send → 🔗 (link icon) → Copy link**, and send that link
    back to Claude — it'll be wired into the branded briefing page.

---

## Screener (first question, before branching)

**Q0. Which best describes you?** *[Multiple choice]*
- A parent or caregiver → *jump to Section 2 (Parents)*
- A child psychologist, therapist, pediatrician, or educator → *jump to Section 3 (Professionals)*
- Other → *jump to Section 2 (Parents)*

---

## Section 2 — Parent questions

*Section description: "Thanks for being a parent reviewer! Please answer
honestly — there are no wrong answers, and this helps us build something
genuinely useful for families."*

1. **Roughly how old is your child (or your youngest, if more than one)?**
   *[Multiple choice]* Under 4 / 4–7 / 8–12 / 13+
2. **Did you try the "Guided story" walkthrough in the demo?**
   *[Multiple choice]* Yes / No / Not sure
3. **Overall, how easy was the app to understand and navigate?**
   *[Linear scale 1–5]* 1 = Very confusing → 5 = Very easy
4. **How relevant did the activity recommendations feel** (e.g., matching a
   child's interest in animals or football to a reading or focus activity)?
   *[Linear scale 1–5]* 1 = Not relevant → 5 = Very relevant
5. **How clear was it that NurtureAI does NOT diagnose your child, and only
   ever suggests seeking a professional when appropriate?**
   *[Linear scale 1–5]* 1 = Not clear at all → 5 = Very clear
6. **How comfortable would you feel logging a quick daily/weekly check-in**
   about your child (reading, mood, focus, screen time)?
   *[Linear scale 1–5]* 1 = Very uncomfortable → 5 = Very comfortable
7. **How much would you trust an AI-generated weekly report** about your
   child's development?
   *[Linear scale 1–5]* 1 = Not at all → 5 = Completely
8. **If NurtureAI were a real product, how likely would you be to use it
   regularly?**
   *[Linear scale 1–5]* 1 = Very unlikely → 5 = Very likely
9. **Would you consider paying a monthly subscription for this**
   (illustratively, PKR 1,000–2,000/month)?
   *[Multiple choice]* Yes / Maybe, depends on price / No
10. **What did you like most about the app?** *[Paragraph]*
11. **What confused you, or what would you change?** *[Paragraph]*
12. **Did anything about how the app talks about your child's development
    feel uncomfortable, judgmental, or worrying?** *[Paragraph]*
13. **Any other comments?** *[Paragraph, optional]*

---

## Section 3 — Child psychologist / therapist / educator questions

*Section description: "Thank you for reviewing this as a professional — your
perspective on clinical appropriateness and safety is the most important
feedback we can get."*

1. **What is your professional role?** *[Short answer]*
   (e.g. "Child psychologist," "Speech therapist," "School counselor")
2. **Years of experience working with children's development:**
   *[Multiple choice]* Under 2 / 2–5 / 6–10 / 10+
3. **Did you review the "quick assessment" screen** (plain-language questions
   like "Does your child read independently?")?
   *[Multiple choice]* Yes / No
4. **How developmentally appropriate and non-stigmatizing did the assessment
   questions and activity recommendations seem?**
   *[Linear scale 1–5]* 1 = Poor → 5 = Excellent
5. **NurtureAI only suggests professional support after a *sustained* pattern
   over several weeks — never from one observation — and always frames it as
   "a suggestion to explore," never a diagnosis. How clinically sound does
   this threshold and framing seem to you?**
   *[Linear scale 1–5]* 1 = Not sound at all → 5 = Very sound
6. **Do you see any risk of this tool causing:** *[Checkboxes — select all
   that apply]*
   - Parents delaying necessary professional help because the app reassures them
   - Parents becoming unnecessarily anxious from the reports
   - Over-reliance on the AI instead of professional judgment
   - Mislabeling normal developmental variation as "a concern"
   - None of the above
   - Other: ___
7. **How appropriate is the language used throughout** (plain, warm,
   non-clinical) **for a general parent audience, from a professional
   standpoint?**
   *[Linear scale 1–5]* 1 = Inappropriate → 5 = Very appropriate
8. **How comfortable would you be with a platform like this referring
   families to professionals like yourself through a booking marketplace?**
   *[Linear scale 1–5]* 1 = Very uncomfortable → 5 = Very comfortable
9. **What is the single biggest risk or red flag you see in this concept, as
   currently demoed?** *[Paragraph]*
10. **What would need to change before you'd feel comfortable recommending
    something like this to a family you work with?** *[Paragraph]*
11. **Any other feedback, clinical concerns, or suggestions?**
    *[Paragraph, optional]*

---

## After you have the link

Send it back and it'll be wired into the branded feedback briefing page (the
"Give feedback" buttons), so reviewers get one polished landing spot: try the
demo → see who should answer what → jump straight into their section.
