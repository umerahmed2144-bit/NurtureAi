import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mascot } from '../components/characters'
import { Button } from '../components/ui'

const EASE = [0.22, 1, 0.36, 1] as const
const FORM_URL = 'https://forms.gle/NTiLgZ3fhQvu73Nj8'

function Rise({ children, delay = 0, y = 20, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-4xl px-6 ${className}`}>{children}</section>
}

export function Feedback() {
  const [copied, setCopied] = useState(false)
  const email = 'umerahmed2144@gmail.com'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      {/* nav */}
      <div className="sticky top-0 z-20 border-b border-[var(--color-line)]/60 bg-[var(--color-canvas)]/85 backdrop-blur">
        <Section className="flex items-center justify-between py-3.5">
          <Link to="/" className="flex items-center gap-2">
            <Mascot size={30} expr="happy" />
            <span className="font-display text-lg font-semibold">NurtureAI</span>
          </Link>
          <span className="rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[var(--color-brand-strong)]">
            Reviewer kit
          </span>
        </Section>
      </div>

      {/* hero */}
      <Section className="grid items-center gap-10 py-12 md:grid-cols-[1.15fr_0.85fr] md:py-16">
        <Rise>
          <h1 className="text-[32px] leading-[1.05] md:text-[42px]">Help us build a better NurtureAI</h1>
          <p className="mt-4 max-w-lg text-[16px] font-semibold leading-relaxed text-[var(--color-ink-soft)]">
            We're testing NurtureAI, an AI-powered child development and learning companion for
            Pakistani parents, with the two audiences who matter most: <b>parents</b> who'd actually
            use it, and <b>child psychologists and therapists</b> who can tell us whether it's clinically
            sound and safe. Ten minutes of your time genuinely shapes what we build next.
          </p>
        </Rise>
        <Rise delay={0.1} className="flex justify-center">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
            <Mascot size={160} expr="wave" />
          </motion.div>
        </Rise>
      </Section>

      {/* step one: try the demo */}
      <Section className="pb-8">
        <Rise>
          <div className="rounded-[1.75rem] bg-white p-7 shadow-[var(--shadow-card)]">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--color-brand-strong)]">Step one</p>
            <h2 className="mt-1 text-[22px]">Try the live demo first</h2>
            <ol className="mt-4 flex flex-col gap-3">
              {[
                'Open the demo, it runs right here on this site, no install or login needed.',
                'Tap "Guided story" at the top of the app to walk through Sara’s journey (about 3 minutes), the fastest way to see everything NurtureAI does.',
                'Come back here and share your thoughts below, it takes about 5–10 minutes.',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-soft)] font-display text-sm font-semibold text-[var(--color-brand-strong)]">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-[14px] font-semibold leading-relaxed text-[var(--color-ink-soft)]">{text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <Link to="/app">
                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
                  <Button variant="brand" className="text-base">▶ Open the live demo</Button>
                </motion.span>
              </Link>
            </div>
          </div>
        </Rise>
      </Section>

      {/* step two: two tracks */}
      <Section className="pb-8">
        <Rise>
          <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--color-brand-strong)]">Step two</p>
          <h2 className="mt-1 text-[22px]">Tell us what you think</h2>
        </Rise>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Rise delay={0.05}>
            <div className="flex h-full flex-col gap-3 rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-card)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-mango-soft)] text-2xl">👪</div>
              <h3 className="text-[18px] font-bold">I'm a parent or caregiver</h3>
              <ul className="flex flex-col gap-1 text-[13px] font-semibold text-[var(--color-ink-soft)]">
                <li>• How easy the app was to use and understand</li>
                <li>• Whether the activities felt genuinely personalized</li>
                <li>• Whether you'd trust it and use it regularly</li>
              </ul>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-1">
                <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                  <Button variant="brand">Give your feedback →</Button>
                </motion.span>
              </a>
              <p className="text-xs font-semibold text-[var(--color-muted)]">Takes about 7 minutes · anonymous</p>
            </div>
          </Rise>
          <Rise delay={0.12}>
            <div className="flex h-full flex-col gap-3 rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-card)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-grape-soft)] text-2xl">🧑‍⚕️</div>
              <h3 className="text-[18px] font-bold">I'm a child psychologist or therapist</h3>
              <ul className="flex flex-col gap-1 text-[13px] font-semibold text-[var(--color-ink-soft)]">
                <li>• Whether the guardrails (never diagnosing) hold up</li>
                <li>• Clinical appropriateness of the questions and activities</li>
                <li>• Risks we should know about before going further</li>
              </ul>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-1">
                <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                  <Button variant="brand">Give your feedback →</Button>
                </motion.span>
              </a>
              <p className="text-xs font-semibold text-[var(--color-muted)]">Takes about 7 minutes · anonymous</p>
            </div>
          </Rise>
        </div>
        <p className="mt-3 text-xs font-semibold text-[var(--color-muted)]">
          Both buttons open the same short form, the first question routes you to the right section automatically.
        </p>
      </Section>

      {/* guardrail */}
      <Section className="pb-10">
        <Rise>
          <div className="rounded-[1.75rem] bg-white p-7 shadow-[var(--shadow-card)]">
            <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--color-brand-strong)]">Why we're asking</p>
            <h2 className="mt-1 text-[20px]">The one rule NurtureAI never breaks</h2>
            <p className="mt-3 max-w-2xl text-[14px] font-semibold leading-relaxed text-[var(--color-ink-soft)]">
              NurtureAI surfaces patterns worth a parent's attention, it never diagnoses. Any assessment
              or diagnosis is made only by a qualified professional the family chooses. That's exactly why
              your feedback on both sides, as a parent, and as a professional, matters before this goes
              any further.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--color-canvas)] px-3 py-1.5 text-xs font-bold shadow-[var(--shadow-card)]">🛡️ Never diagnoses</span>
              <span className="rounded-full bg-[var(--color-canvas)] px-3 py-1.5 text-xs font-bold shadow-[var(--shadow-card)]">📈 Referral only after weeks of signal</span>
              <span className="rounded-full bg-[var(--color-canvas)] px-3 py-1.5 text-xs font-bold shadow-[var(--shadow-card)]">🔒 Feedback is anonymous</span>
            </div>
          </div>
        </Rise>
      </Section>

      <footer className="border-t border-[var(--color-line)] py-8">
        <Section className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <Mascot size={24} expr="happy" />
            <span className="font-display font-semibold">NurtureAI</span>
          </div>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-canvas)] py-1.5 pl-3.5 pr-1.5 text-xs font-bold text-[var(--color-ink-soft)]"
          >
            <span>{email}</span>
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-extrabold text-[var(--color-brand-strong)] shadow-[var(--shadow-card)]">
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </button>
        </Section>
        <Section>
          <p className="mt-4 text-xs font-semibold text-[var(--color-muted)]">
            Thank you for helping shape NurtureAI. Demo prototype · Business proposal · Pakistan.
          </p>
        </Section>
      </footer>
    </div>
  )
}
