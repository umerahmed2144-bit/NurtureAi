import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useDemo } from '../../store/useDemoStore'
import { ScreenHeader } from '../../components/ScreenHeader'
import { EmptyState } from '../../components/EmptyState'
import { ANSWER_OPTIONS, ASSESSMENT_QUESTIONS, DOMAIN_META } from '../../data/domains'
import { accentVars } from '../../components/ui'
import { useT } from '../../components/lang'

export function Assessment() {
  const navigate = useNavigate()
  const { activeChild, saveAssessment } = useDemo()
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<Record<string, 0 | 1 | 2 | 3>>({})
  const { t } = useT()

  if (!activeChild) return <EmptyState title={t('No child selected')} body={t('Choose or create a child profile to see this.')} />
  const q = ASSESSMENT_QUESTIONS[step]
  const meta = DOMAIN_META[q.domain]
  const { color, soft } = accentVars(meta.accent)
  const progress = Math.round(((step + 1) / ASSESSMENT_QUESTIONS.length) * 100)

  const answer = (v: 0 | 1 | 2 | 3) => {
    const next = { ...values, [q.id]: v }
    setValues(next)
    if (step < ASSESSMENT_QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 180)
    } else {
      saveAssessment({ childId: activeChild.id, values: next, completedAt: new Date().toISOString() })
      setTimeout(() => navigate('/app/dashboard'), 220)
    }
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <ScreenHeader title={t('Quick assessment')} subtitle={t('Question {n} of {total}', { n: step + 1, total: ASSESSMENT_QUESTIONS.length })} />

      <div className="px-5">
        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-line)]">
          <motion.div className="h-full rounded-full" style={{ background: color }} animate={{ width: `${progress}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-5 px-5"
        >
          <div className="flex flex-col items-center gap-3 pt-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl text-4xl" style={{ background: soft }}>
              {meta.emoji}
            </div>
            <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: soft, color }}>
              {t(meta.label)}
            </span>
            <h2 className="px-2 text-[22px] leading-tight">{t(q.text)}</h2>
          </div>

          <div className="flex flex-col gap-2.5">
            {ANSWER_OPTIONS.map((o) => {
              const active = values[q.id] === o.value
              return (
                <button
                  key={o.value}
                  onClick={() => answer(o.value)}
                  className="flex items-center justify-between rounded-2xl border-2 bg-[var(--color-surface)] px-5 py-4 text-start transition-all active:scale-[0.98]"
                  style={{ borderColor: active ? color : 'var(--color-line)' }}
                >
                  <span className="text-[15px] font-bold">{t(o.label)}</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2" style={{ borderColor: color, background: active ? color : 'transparent' }}>
                    {active && <span className="text-xs text-white">✓</span>}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="text-center text-xs font-semibold text-[var(--color-muted)]">
            {t('These questions are co-designed with child-development professionals.')}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
