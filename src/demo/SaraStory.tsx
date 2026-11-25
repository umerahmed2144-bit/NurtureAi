import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useDemo } from '../store/useDemoStore'
import { Mascot } from '../components/characters'
import { STORY_CHILD_ID } from '../data/children'
import { useT } from '../components/lang'

interface Step {
  title: string
  body: string
  route: string
  tag: string
}

const STEPS: Step[] = [
  {
    tag: 'The moment',
    title: 'Meet Sara, age 8',
    body: 'Her mother notices: “She understands stories when I read them, but avoids reading herself.” She opens NurtureAI to make sense of it.',
    route: '/app',
  },
  {
    tag: 'Observe',
    title: 'A 30-second check-in',
    body: 'Instead of a long form, Sara’s mum logs a quick observation, reading, focus, mood. Low-friction, a few times a week.',
    route: '/app/log',
  },
  {
    tag: 'Understand',
    title: 'The pattern surfaces',
    body: 'NurtureAI flags reading independence as “needs monitoring”, and shows the trend, not a one-off bad day. Reading practice is rising, but independent reading is still low.',
    route: '/app/dashboard',
  },
  {
    tag: 'Support',
    title: 'A 4-week plan, built around animals',
    body: 'Because Sara loves animals, the AI recommends the “Animal Detective Reading Game”, reading practice disguised as something she already enjoys. Week 1 guided reading → Week 2 animal vocabulary → Week 3 short independent story → Week 4 progress check.',
    route: '/app/activities',
  },
  {
    tag: 'Monitor',
    title: 'Progress you can see',
    body: 'After several weeks: reading engagement up ~25%, vocabulary recognition improved. The weekly report turns raw check-ins into plain-language progress.',
    route: '/app/report',
  },
  {
    tag: 'Refer (only if needed)',
    title: 'Escalate gently, never diagnose',
    body: 'If difficulty had persisted, NurtureAI would suggest a qualified professional, framed as “consider an assessment,” with booking one tap away. The diagnosis is always the professional’s, never the app’s.',
    route: '/app/directory',
  },
]

export function SaraStory({ onExit }: { onExit: () => void }) {
  const navigate = useNavigate()
  const { setActiveChild } = useDemo()
  const [step, setStep] = useState(0)
  const { t, rtl } = useT()

  useEffect(() => {
    setActiveChild(STORY_CHILD_ID)
  }, [setActiveChild])

  useEffect(() => {
    navigate(STEPS[step].route)
  }, [step, navigate])

  const s = STEPS[step]
  const last = step === STEPS.length - 1

  return (
    <div className="w-full max-w-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 font-display text-sm font-semibold text-white/90">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><Mascot size={24} expr="wave" /></span>
          {t('Guided story')}
        </span>
        <button onClick={onExit} className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white hover:bg-white/25">
          {t('Exit ✕')}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28 }}
          dir={rtl ? 'rtl' : 'ltr'}
          className="rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-pop)]"
        >
          <span className="inline-block rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-extrabold text-[var(--color-brand-strong)]">
            {t(s.tag)}
          </span>
          <h3 className="mt-3 text-[22px] leading-tight">{t(s.title)}</h3>
          <p className="mt-2 text-[14px] font-semibold leading-relaxed text-[var(--color-ink-soft)]">{t(s.body)}</p>

          <div className="mt-5 flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === step ? 24 : 8,
                  background: i <= step ? 'var(--color-brand)' : 'var(--color-line)',
                }}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="rounded-full px-4 py-2.5 text-sm font-bold text-[var(--color-ink-soft)] disabled:opacity-30"
            >
              {t('‹ Back')}
            </button>
            <button
              onClick={() => (last ? onExit() : setStep(step + 1))}
              className="flex-1 rounded-full bg-[var(--color-ink)] py-3 font-display text-[15px] font-medium text-white"
            >
              {last ? t('Finish story') : t('Next step ›')}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-3 text-center text-xs font-semibold text-white/70">
        {t('Step {n} of {total} · the phone on the right follows along', { n: step + 1, total: STEPS.length })}
      </p>
    </div>
  )
}
