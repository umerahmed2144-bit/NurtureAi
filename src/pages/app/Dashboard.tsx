import { useNavigate } from 'react-router-dom'
import { Sparkline } from '../../components/Sparkline'
import { useDemo } from '../../store/useDemoStore'
import { computeAreas, referralSignal } from '../../logic/patterns'
import { ScreenHeader } from '../../components/ScreenHeader'
import { EmptyState } from '../../components/EmptyState'
import { accentVars, Card, StatusBadge, TrendArrow } from '../../components/ui'
import { DOMAIN_META } from '../../data/domains'

export function Dashboard() {
  const navigate = useNavigate()
  const { activeChild, observationsFor, assessmentFor } = useDemo()
  if (!activeChild) return <EmptyState title="No child selected" body="Choose or create a child profile to see this." />

  const obs = observationsFor(activeChild.id).sort((a, b) => a.date.localeCompare(b.date))
  const areas = computeAreas(activeChild, obs, assessmentFor(activeChild.id))
  const ref = referralSignal(areas, obs)

  const readingSeries = obs.map((o) => o.readingMinutes)

  return (
    <div className="flex flex-col gap-4 pb-6">
      <ScreenHeader title="Development profile" subtitle={`${activeChild.name} · ${activeChild.grade}`} />

      <div className="px-5">
        <Card className="p-5">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[13px] font-bold text-[var(--color-muted)]">Reading minutes / day</p>
            <span className="text-xs font-extrabold text-[var(--color-status-strong)]">trending up ↑</span>
          </div>
          <Sparkline values={readingSeries} />
          <div className="mt-1 flex justify-between text-[10px] font-bold text-[var(--color-muted)]">
            <span>4 weeks ago</span>
            <span>today</span>
          </div>
          <p className="mt-1 text-xs font-semibold leading-snug text-[var(--color-ink-soft)]">
            Reading practice has increased over the last few weeks, independent reading is still growing.
          </p>
        </Card>
      </div>

      <div className="px-5">
        <p className="mb-3 text-[17px] font-semibold">Areas at a glance</p>
        <div className="flex flex-col gap-3">
          {areas.map((a) => {
            const { color, soft } = accentVars(DOMAIN_META[a.key].accent)
            return (
              <Card key={a.key} className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl"
                    style={{ background: soft }}
                  >
                    {a.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[15px] font-bold">{a.label}</p>
                      <TrendArrow trend={a.trend} />
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <StatusBadge status={a.status} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--color-line)]">
                  <div className="h-full rounded-full" style={{ width: `${a.score}%`, background: color }} />
                </div>
                <p className="mt-2 text-xs font-semibold leading-snug text-[var(--color-muted)]">{a.blurb}</p>
              </Card>
            )
          })}
        </div>
      </div>

      {ref.triggered && (
        <div className="px-5">
          <Card
            className="border-2 p-4"
            style={{ borderColor: 'var(--color-status-monitor)', background: 'var(--color-mango-soft)' }}
          >
            <p className="mb-1 flex items-center gap-2 text-[15px] font-bold">💛 A gentle suggestion</p>
            <p className="text-[13px] font-semibold leading-snug text-[var(--color-ink-soft)]">{ref.message}</p>
            <button
              onClick={() => navigate('/app/directory')}
              className="mt-3 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-[13px] font-bold text-white"
            >
              Explore support options →
            </button>
          </Card>
        </div>
      )}
    </div>
  )
}
