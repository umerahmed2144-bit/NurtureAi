import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui'
import { Reveal, StickyStack, BlobField, Loader, ScrollProgress, Confetti } from '../components/motion'
import { Mascot, CartoonAnimal } from '../components/characters'
import { useT } from '../components/lang'
import { LangSwitch } from '../components/LangSwitch'

const EASE = [0.22, 1, 0.36, 1] as const

function Rise({ children, delay = 0, y = 24, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</section>
}

export function Landing() {
  const [heroIn, setHeroIn] = useState(false)
  const { rtl } = useT()
  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="overflow-hidden bg-[var(--color-canvas)]">
      <ScrollProgress />
      <Loader onFinish={() => setHeroIn(true)} />
      <Nav />
      <StickyStack className="bg-[var(--color-canvas)]">
        <Hero heroIn={heroIn} />
        <Problem />
        <HowItWorks />
      </StickyStack>
      <AiEngine />
      <Pricing />
      <TrustGuardrail />
      <FinalCta />
      <Footer />
    </div>
  )
}

function Nav() {
  const { t } = useT()
  return (
    <div className="sticky top-0 z-[60] border-b border-[var(--color-line)]/60 bg-[var(--color-canvas)]/85 backdrop-blur">
      <Section className="flex items-center justify-between py-3.5">
        <div className="flex items-center gap-2">
          <Mascot size={34} expr="happy" />
          <span className="keep-font hidden font-display text-xl font-semibold min-[420px]:inline">NurtureAI</span>
        </div>
        <div className="hidden items-center gap-7 text-sm font-bold text-[var(--color-ink-soft)] md:flex">
          <a href="#how" className="transition-colors hover:text-[var(--color-brand)]">{t('How it works')}</a>
          <a href="#why" className="transition-colors hover:text-[var(--color-brand)]">{t('Why AI')}</a>
          <a href="#pricing" className="transition-colors hover:text-[var(--color-brand)]">{t('Pricing')}</a>
          <Link to="/feedback" className="transition-colors hover:text-[var(--color-brand)]">{t('Feedback')}</Link>
        </div>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <Link to="/app">
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Button variant="brand" className="whitespace-nowrap px-4 sm:px-6">
                <span className="sm:hidden">{t('Demo')}</span>
                <span className="hidden sm:inline">{t('Launch demo →')}</span>
              </Button>
            </motion.span>
          </Link>
        </div>
      </Section>
    </div>
  )
}

function FloatEmoji({ e, x, y, d = 5, size = '2rem' }: { e: string; x: string; y: string; d?: number; size?: string }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute select-none"
      style={{ left: x, top: y, fontSize: size }}
      animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
      transition={{ duration: d, repeat: Infinity, ease: 'easeInOut' }}
    >
      {e}
    </motion.span>
  )
}

function Hero({ heroIn }: { heroIn: boolean }) {
  const { t } = useT()
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[var(--color-canvas)]">
      <BlobField opacity={0.18} />
      <Section className="relative grid items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <Rise>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[var(--color-brand-strong)] shadow-[var(--shadow-card)]">
              {t('🇵🇰 Built for Pakistani families · Ages 4–12')}
            </span>
          </Rise>
          <Reveal
            as="h1"
            text={t('Understand how your child learns.')}
            type="word"
            bounce
            trigger="mount"
            delay={heroIn ? 0 : 0.9}
            className="mt-5 text-[42px] leading-[1.02] md:text-[58px]"
          />
          <Rise delay={0.15}>
            <p className="mt-5 max-w-md text-[17px] font-semibold leading-relaxed text-[var(--color-ink-soft)]">
              {t('Report cards show grades. NurtureAI gives a holistic view of your child: reading, attention, habits and wellbeing, turned into simple, personalized guidance. Playful for kids, reassuring for you, and it never diagnoses.')}
            </p>
          </Rise>
          <Rise delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/app">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
                  <Button variant="brand" className="text-base">{t('▶ Try the live demo')}</Button>
                </motion.span>
              </Link>
              <a href="#how"><Button variant="soft">{t('See how it works')}</Button></a>
            </div>
          </Rise>
        </div>

        <Rise delay={0.2} className="relative flex justify-center">
          <HeroPhone />
          <FloatEmoji e="🦊" x="2%" y="6%" d={5} />
          <FloatEmoji e="⭐" x="88%" y="0%" d={6} size="1.6rem" />
          <FloatEmoji e="📚" x="90%" y="72%" d={5.5} size="1.8rem" />
          <FloatEmoji e="🐨" x="-2%" y="78%" d={6.5} />
          <motion.div
            className="absolute -bottom-6 -left-2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Mascot size={88} expr="wave" />
          </motion.div>
        </Rise>
      </Section>
    </section>
  )
}

function HeroPhone() {
  const { t } = useT()
  const tiles = [
    { e: '📊', l: 'Development', a: 'brand' },
    { e: '🎯', l: 'Activities', a: 'mango' },
    { e: '📄', l: 'Weekly report', a: 'grape' },
    { e: '🩺', l: 'Find support', a: 'coral' },
  ]
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="w-[280px] rounded-[2.5rem] border-[8px] border-[#101322] bg-[var(--color-canvas)] p-4 shadow-[var(--shadow-pop)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-grape-soft)] text-lg">🦊</span>
          <div>
            <p className="text-[10px] font-bold text-[var(--color-muted)]">{t('Hi Sara’s parent,')}</p>
            <p className="text-[11px] font-extrabold text-[var(--color-grape)]">{t('⚡ 76% profile')}</p>
          </div>
        </div>
        <span className="text-sm">🔔</span>
      </div>
      <p className="font-display text-[19px] font-semibold leading-tight">{t('Your child’s learning journey')}</p>
      <div className="mt-3 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-[var(--shadow-card)]">
        <span className="text-xs text-[var(--color-muted)]">🔍</span>
        <span className="text-[11px] font-semibold text-[var(--color-muted)]">{t('Search activities…')}</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.l}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: EASE }}
            className="rounded-2xl bg-white p-3 shadow-[var(--shadow-card)]"
          >
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl text-lg" style={{ background: `var(--color-${tile.a}-soft)` }}>{tile.e}</div>
            <p className="text-[11px] font-bold leading-tight">{t(tile.l)}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function Problem() {
  const { t } = useT()
  const items = [
    { e: '🏫', t: 'School report cards', d: 'Mostly academic grades', a: 'coral' },
    { e: '📚', t: 'Paid tutors', d: 'Focused on marks, not development', a: 'mango' },
    { e: '🔍', t: 'Google searches', d: 'Generic, not about your child', a: 'sky' },
    { e: '💬', t: 'WhatsApp advice', d: 'Well-meaning but inconsistent', a: 'grape' },
  ]
  return (
    <section className="relative flex min-h-screen items-center bg-[var(--color-brand-soft)]">
      <Section className="py-16">
        <div id="why" className="scroll-mt-24" />
        <Reveal as="p" text={t('The problem')} type="letter" className="text-sm font-extrabold uppercase tracking-wide text-[var(--color-coral)]" />
        <Reveal as="h2" text={t('Parents can see the grades, but not how their child is learning.')} type="word" bounce className="mt-2 max-w-2xl text-[32px] leading-tight md:text-[42px]" />
        <Rise delay={0.1}>
          <p className="mt-4 max-w-2xl text-[16px] font-semibold text-[var(--color-ink-soft)]">
            {t('Reading, attention, social skills, wellbeing, screen habits: scattered across five disconnected places. Fragmented, reactive, and hard to make sense of.')}
          </p>
        </Rise>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Rise key={it.t} delay={i * 0.07}>
              <motion.div whileHover={{ y: -6 }} className="h-full rounded-[1.5rem] bg-white p-5 shadow-[var(--shadow-card)]">
                <span className="text-3xl">{it.e}</span>
                <p className="mt-3 text-[15px] font-bold">{t(it.t)}</p>
                <p className="mt-1 text-[13px] font-semibold text-[var(--color-muted)]">{t(it.d)}</p>
              </motion.div>
            </Rise>
          ))}
        </div>
      </Section>
      <FloatEmoji e="🐰" x="6%" y="12%" d={6} />
      <FloatEmoji e="🎈" x="92%" y="18%" d={5.5} />
    </section>
  )
}

function HowItWorks() {
  const { t } = useT()
  const steps = [
    { n: '01', e: '🐣', t: 'Build a profile', d: 'Age, grade, languages, interests and any focus areas, in under 5 minutes.', a: 'brand' },
    { n: '02', e: '📝', t: 'Log tiny check-ins', d: 'Reading, focus, sleep, screen time, mood: a few times a week, under a minute each.', a: 'grass' },
    { n: '03', e: '✨', t: 'Get personalized play', d: 'The AI turns patterns into interest-matched activities, a weekly report, and support when needed.', a: 'grape' },
  ]
  return (
    <section className="relative flex min-h-screen items-center bg-white">
      <Section className="py-16">
        <div id="how" className="scroll-mt-24" />
        <Reveal as="p" text={t('How it works')} type="letter" className="text-sm font-extrabold uppercase tracking-wide text-[var(--color-brand)]" />
        <Reveal as="h2" text={t('Three simple steps for busy parents')} type="word" bounce className="mt-2 text-[32px] leading-tight md:text-[42px]" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Rise key={s.n} delay={i * 0.1}>
              <motion.div whileHover={{ y: -8 }} className="h-full rounded-[1.75rem] bg-[var(--color-canvas)] p-7 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl" style={{ background: `var(--color-${s.a}-soft)` }}>{s.e}</div>
                  <span className="font-display text-[26px] font-semibold text-[var(--color-line)]">{s.n}</span>
                </div>
                <p className="mt-4 text-[18px] font-bold">{t(s.t)}</p>
                <p className="mt-2 text-[14px] font-semibold leading-relaxed text-[var(--color-ink-soft)]">{t(s.d)}</p>
              </motion.div>
            </Rise>
          ))}
        </div>
      </Section>
    </section>
  )
}

function AiEngine() {
  const { t } = useT()
  const A = { name: 'Ahmed', e: '⚽', traits: ['Strong reading', 'Building focus', 'Loves football'], rec: 'Goal-Line Focus Sprints: short “match halves” of focused play.', an: 'fox' as const }
  const B = { name: 'Sara', e: '🦊', traits: ['Growing reader', 'Strong attention', 'Loves animals'], rec: 'Animal Detective Reading Game: reading practice built around animals.', an: 'owl' as const }
  return (
    <Section className="py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Reveal as="p" text={t('Why AI')} type="letter" className="text-sm font-extrabold uppercase tracking-wide text-[var(--color-grape)]" />
          <Reveal as="h2" text={t('Two children should never get the same worksheet.')} type="word" bounce className="mt-2 text-[32px] leading-tight md:text-[42px]" />
          <Rise delay={0.1}>
            <p className="mt-4 text-[16px] font-semibold leading-relaxed text-[var(--color-ink-soft)]">
              {t('NurtureAI looks at each child’s profile, check-in history and trend, then recommends an activity matched to their interests and needs, with a plain-language reason for parents. Real personalization, not generic content with an “AI” label.')}
            </p>
          </Rise>
          <Rise delay={0.15}>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Interest-matched play', 'Plain-language reports', 'EN / Urdu / Roman Urdu', 'Local Pakistani context'].map((c) => (
                <span key={c} className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[var(--color-ink-soft)] shadow-[var(--shadow-card)]">{t(c)}</span>
              ))}
            </div>
          </Rise>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[A, B].map((c, i) => (
            <Rise key={c.name} delay={i * 0.12}>
              <motion.div whileHover={{ y: -8 }} className="h-full rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2">
                  <CartoonAnimal kind={c.an} size={44} />
                  <span className="text-3xl">{c.e}</span>
                </div>
                <p className="mt-3 font-display text-[18px] font-semibold">{t(c.name)}</p>
                <ul className="mt-2 flex flex-col gap-1">
                  {c.traits.map((tr) => (
                    <li key={tr} className="text-[13px] font-bold text-[var(--color-ink-soft)]">• {t(tr)}</li>
                  ))}
                </ul>
                <div className="mt-4 rounded-2xl bg-[var(--color-brand-soft)] p-3">
                  <p className="text-[11px] font-extrabold uppercase tracking-wide text-[var(--color-brand-strong)]">{t('AI recommends')}</p>
                  <p className="mt-1 text-[13px] font-semibold text-[var(--color-ink-soft)]">{t(c.rec)}</p>
                </div>
              </motion.div>
            </Rise>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Pricing() {
  const { t } = useT()
  const plans = [
    { name: 'Parents', icon: '👨‍👩‍👧', accent: 'brand', price: 'Freemium → PKR 1,000–2,000', unit: '/ month', features: ['AI personalized play', 'Full development dashboard', 'Weekly reports & insights', 'Professional referral directory'], note: 'Priced below a single tuition session.', highlight: true },
    { name: 'Schools', icon: '🏫', accent: 'grape', price: 'PKR 1,500–3,000', unit: '/ student / year', features: ['Teacher observation portal', 'School-wide analytics', 'Bulk parent onboarding', 'Parent ↔ school ↔ NurtureAI loop'], note: '500 students ≈ PKR 1M / school / year.', highlight: false },
    { name: 'Professionals', icon: '🩺', accent: 'grass', price: 'Commission', unit: '/ booking', features: ['Pre-qualified referrals', 'Verified profile listing', 'Direct in-app booking', 'Listing & premium options'], note: 'Revenue aligned with successful referrals.', highlight: false },
  ]
  return (
    <Section className="py-16">
      <div id="pricing" className="scroll-mt-24" />
      <Reveal as="p" text={t('Business model')} type="letter" className="text-sm font-extrabold uppercase tracking-wide text-[var(--color-brand)]" />
      <Reveal as="h2" text={t('Three revenue streams, one ecosystem')} type="word" bounce className="mt-2 text-[32px] leading-tight md:text-[42px]" />
      <Rise delay={0.1}><p className="mt-3 max-w-2xl text-[15px] font-semibold text-[var(--color-ink-soft)]">{t('Illustrative pricing, to be validated through customer interviews.')}</p></Rise>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((p, i) => (
          <Rise key={p.name} delay={i * 0.09}>
            <motion.div whileHover={{ y: -8 }} className="relative h-full rounded-[1.75rem] p-7 shadow-[var(--shadow-card)]" style={{ background: p.highlight ? 'var(--color-brand)' : 'var(--color-surface)', color: p.highlight ? '#fff' : 'inherit' }}>
              {p.highlight && <span className="absolute end-6 top-6 rounded-full bg-white/20 px-3 py-1 text-[10px] font-extrabold">{t('START HERE')}</span>}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ background: p.highlight ? 'rgba(255,255,255,0.18)' : `var(--color-${p.accent}-soft)` }}>{p.icon}</div>
              <p className="mt-4 font-display text-[20px] font-semibold">{t(p.name)}</p>
              <p className="mt-3 font-display text-[22px] font-semibold leading-tight">{t(p.price)}</p>
              <p className={`text-xs font-bold ${p.highlight ? 'text-white/70' : 'text-[var(--color-muted)]'}`}>{t(p.unit)}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {p.features.map((f) => (
                  <li key={f} className={`flex gap-2 text-[13px] font-semibold ${p.highlight ? 'text-white/90' : 'text-[var(--color-ink-soft)]'}`}>
                    <span style={{ color: p.highlight ? '#fff' : 'var(--color-status-strong)' }}>✓</span>{t(f)}
                  </li>
                ))}
              </ul>
              <p className={`mt-5 text-[12px] font-bold ${p.highlight ? 'text-white/70' : 'text-[var(--color-muted)]'}`}>{t(p.note)}</p>
            </motion.div>
          </Rise>
        ))}
      </div>
    </Section>
  )
}

function TrustGuardrail() {
  const { t } = useT()
  return (
    <Section className="py-16">
      <div className="grid gap-6 rounded-[2rem] bg-white p-8 shadow-[var(--shadow-card)] md:grid-cols-[1.2fr_1fr] md:p-12">
        <div>
          <motion.span animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="inline-block text-4xl">🛡️</motion.span>
          <Reveal as="h2" text={t('Early insight and guidance, never a diagnosis.')} type="word" bounce className="mt-4 text-[28px] leading-tight md:text-[38px]" />
          <Rise delay={0.1}>
            <p className="mt-4 text-[15px] font-semibold leading-relaxed text-[var(--color-ink-soft)]">
              {t('NurtureAI is a playful learning and development companion, not a psychology app. It surfaces patterns worth attention and, only after a sustained pattern, gently suggests a qualified professional. Any assessment or diagnosis is always the professional’s.')}
            </p>
          </Rise>
        </div>
        <div className="grid gap-3">
          {[
            { e: '🔒', t: 'Privacy first', d: 'Parental consent, encrypted storage, minimal data.' },
            { e: '🧑‍⚕️', t: 'Expert-designed', d: 'Assessments co-developed with child-development professionals.' },
            { e: '🌙', t: 'Conservative by design', d: 'Referrals only after weeks of consistent signals.' },
          ].map((x, i) => (
            <Rise key={x.t} delay={i * 0.07}>
              <div className="flex gap-3 rounded-2xl bg-[var(--color-canvas)] p-4">
                <span className="text-2xl">{x.e}</span>
                <div>
                  <p className="text-[14px] font-bold">{t(x.t)}</p>
                  <p className="text-[12px] font-semibold text-[var(--color-muted)]">{t(x.d)}</p>
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </Section>
  )
}

function FinalCta() {
  const [burst, setBurst] = useState(false)
  const { t } = useT()
  return (
    <Section className="pb-20 pt-4">
      <motion.div
        onViewportEnter={() => setBurst(true)}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--color-periwinkle)] to-[var(--color-brand-strong)] p-10 text-center text-white md:p-16"
      >
        <Confetti run={burst} />
        <div className="relative">
          <div className="mb-4 flex justify-center">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
              <Mascot size={96} expr="cheer" />
            </motion.div>
          </div>
          <Reveal as="h2" text={t('See the whole child, not just the report card.')} type="word" bounce className="mx-auto max-w-2xl justify-center text-center text-[30px] leading-tight text-white md:text-[44px]" />
          <Rise delay={0.1}>
            <p className="mx-auto mt-4 max-w-lg text-[16px] font-semibold text-white/85">
              {t('Explore the full working prototype, or run the guided story of Sara’s reading journey.')}
            </p>
          </Rise>
          <Rise delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/app">
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
                  <Button variant="dark" className="text-base">{t('▶ Launch the demo')}</Button>
                </motion.span>
              </Link>
            </div>
          </Rise>
        </div>
      </motion.div>
    </Section>
  )
}

function Footer() {
  const { t } = useT()
  return (
    <footer className="border-t border-[var(--color-line)] py-8">
      <Section className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-start">
        <div className="flex items-center gap-2">
          <Mascot size={26} expr="happy" />
          <span className="keep-font font-display font-semibold">NurtureAI</span>
        </div>
        <p className="text-xs font-bold text-[var(--color-muted)]">
          {t('Demo prototype · Business proposal · Pakistan · {year}', { year: new Date().getFullYear() })}
        </p>
      </Section>
    </footer>
  )
}
