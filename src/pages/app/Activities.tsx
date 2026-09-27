import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDemo } from '../../store/useDemoStore'
import { computeAreas } from '../../logic/patterns'
import { recommendActivities } from '../../logic/recommend'
import { ScreenHeader } from '../../components/ScreenHeader'
import { EmptyState } from '../../components/EmptyState'
import { accentVars, Card, Tag } from '../../components/ui'

export function Activities() {
  const { activeChild, observationsFor, assessmentFor } = useDemo()
  const [open, setOpen] = useState<string | null>(null)
  if (!activeChild) return <EmptyState title="No child selected" body="Choose or create a child profile to see this." />

  const areas = computeAreas(activeChild, observationsFor(activeChild.id), assessmentFor(activeChild.id))
  const recs = recommendActivities(activeChild, areas, 4)

  return (
    <div className="flex flex-col gap-4 pb-6">
      <ScreenHeader
        title="Recommended activities"
        subtitle={`Personalized for ${activeChild.name}`}
      />

      <div className="px-5">
        <div
          className="flex items-start gap-3 rounded-2xl p-4"
          style={{ background: 'var(--color-grape-soft)' }}
        >
          <span className="text-lg">✨</span>
          <p className="text-[12px] font-semibold leading-snug" style={{ color: 'var(--color-grape)' }}>
            These aren’t generic worksheets. NurtureAI matched each activity to {activeChild.name}’s
            interests and what the dashboard shows they’re building.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5">
        {recs.map((r) => {
          const { color, soft } = accentVars(r.accent)
          const isOpen = open === r.id
          return (
            <Card key={r.id} className="overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : r.id)} className="flex w-full items-center gap-4 p-4 text-left">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl" style={{ background: soft }}>
                  {r.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap gap-1.5">
                    <Tag accent={r.accent}>{r.durationMin} min</Tag>
                    {r.matchedInterest && <Tag accent="grass">❤ {r.matchedInterest}</Tag>}
                  </div>
                  <p className="text-[15px] font-bold leading-tight">{r.title}</p>
                </div>
                <span className="text-xl text-[var(--color-muted)]" style={{ color: isOpen ? color : undefined }}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[var(--color-line)] px-4 pb-4 pt-3">
                      <p className="text-[13px] font-semibold leading-snug text-[var(--color-ink-soft)]">
                        {r.description}
                      </p>

                      <p className="mt-3 text-[11px] font-extrabold uppercase tracking-wide text-[var(--color-muted)]">
                        Steps
                      </p>
                      <ol className="mt-1.5 flex flex-col gap-1.5">
                        {r.steps.map((s, i) => (
                          <li key={i} className="flex gap-2 text-[13px] font-semibold text-[var(--color-ink-soft)]">
                            <span
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                              style={{ background: color }}
                            >
                              {i + 1}
                            </span>
                            {s}
                          </li>
                        ))}
                      </ol>

                      <div className="mt-3 rounded-2xl p-3" style={{ background: soft }}>
                        <p className="text-[11px] font-extrabold uppercase tracking-wide" style={{ color }}>
                          Why this, for {activeChild.name}
                        </p>
                        <p className="mt-0.5 text-[13px] font-semibold leading-snug text-[var(--color-ink-soft)]">
                          {r.parentExplanation}
                        </p>
                      </div>

                      <button
                        className="mt-3 w-full rounded-full py-3 text-[14px] font-bold text-white"
                        style={{ background: 'var(--color-ink)' }}
                      >
                        Start activity
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
