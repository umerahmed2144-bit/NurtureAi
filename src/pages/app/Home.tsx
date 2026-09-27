import { useNavigate } from 'react-router-dom'
import { useDemo } from '../../store/useDemoStore'
import { useLang } from '../../components/lang'
import { ADVENTURE_LINE, GREETING } from '../../data/strings'
import { computeAreas } from '../../logic/patterns'
import { recommendActivities } from '../../logic/recommend'
import { accentVars, Card } from '../../components/ui'
import { EmptyState } from '../../components/EmptyState'

const TILES = [
  { to: '/app/dashboard', emoji: '📊', label: 'Development', sub: 'Dashboard', accent: 'brand' },
  { to: '/app/activities', emoji: '🎯', label: 'Activities', sub: 'For today', accent: 'mango' },
  { to: '/app/log', emoji: '📝', label: 'Check-in', sub: 'Under 1 min', accent: 'grass' },
  { to: '/app/report', emoji: '📄', label: 'Weekly report', sub: 'AI summary', accent: 'grape' },
  { to: '/app/assessment', emoji: '🧭', label: 'Assessment', sub: 'Quick questions', accent: 'sky' },
  { to: '/app/directory', emoji: '🩺', label: 'Find support', sub: 'Professionals', accent: 'coral' },
]

export function Home() {
  const navigate = useNavigate()
  const { activeChild, observationsFor, assessmentFor, children, setActiveChild } = useDemo()
  const { lang } = useLang()

  if (!activeChild)
    return (
      <EmptyState
        title="No child yet"
        body="Add your child’s profile and NurtureAI will start their learning journey."
        expr="wave"
        action={
          <button
            onClick={() => navigate('/app/onboarding')}
            className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-soft)]"
          >
            Create a profile →
          </button>
        }
      />
    )
  const obs = observationsFor(activeChild.id)
  const areas = computeAreas(activeChild, obs, assessmentFor(activeChild.id))
  const overall = Math.round(areas.reduce((s, a) => s + a.score, 0) / areas.length)
  const topPick = recommendActivities(activeChild, areas, 1)[0]
  const { color, soft } = accentVars(activeChild.accent)

  return (
    <div className="flex flex-col gap-5 px-5 pb-6 pt-2">
      {/* greeting row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const other = children.find((c) => c.id !== activeChild.id)
              if (other) setActiveChild(other.id)
            }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-2xl"
            style={{ background: soft }}
            title="Switch child"
          >
            {activeChild.emoji}
          </button>
          <div>
            <p className="text-[13px] font-bold text-[var(--color-muted)]">{GREETING[lang](activeChild.name)}</p>
            <p className="flex items-center gap-1.5 text-[13px] font-extrabold" style={{ color }}>
              ⚡ {activeChild.name} · {overall}% profile
            </p>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
          🔔
        </button>
      </div>

      <h1 className="text-[30px] leading-[1.1]">
        {lang === 'en' ? (
          <>
            {ADVENTURE_LINE.en} <span style={{ color }}>awaits</span>
          </>
        ) : (
          ADVENTURE_LINE[lang]
        )}
      </h1>

      {/* search (decorative) */}
      <div className="flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-4 py-3 shadow-[var(--shadow-card)]">
        <span className="text-[var(--color-muted)]">🔍</span>
        <input
          placeholder="Search activities, insights…"
          className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-[var(--color-muted)]"
        />
        <span className="rounded-lg bg-[var(--color-brand-soft)] px-2 py-1 text-xs">⚙️</span>
      </div>

      {/* today's AI pick */}
      {topPick && (
        <Card onClick={() => navigate(`/app/activities`)} className="overflow-hidden">
          <div className="flex items-center gap-4 p-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
              style={{ background: accentVars(topPick.accent).soft }}
            >
              {topPick.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-extrabold uppercase tracking-wide" style={{ color: 'var(--color-brand)' }}>
                ✨ Today’s AI pick
              </p>
              <p className="truncate text-[15px] font-bold">{topPick.title}</p>
              <p className="text-xs font-semibold text-[var(--color-muted)]">
                {topPick.durationMin} min · {topPick.matchedInterest ? `matched to ${topPick.matchedInterest}` : 'personalized'}
              </p>
            </div>
            <span className="text-xl text-[var(--color-muted)]">›</span>
          </div>
        </Card>
      )}

      {/* category grid */}
      <div>
        <p className="mb-3 text-[17px] font-semibold">Explore</p>
        <div className="grid grid-cols-2 gap-3.5">
          {TILES.map((t) => (
            <Card key={t.to} onClick={() => navigate(t.to)} className="p-4">
              <div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                style={{ background: accentVars(t.accent).soft }}
              >
                {t.emoji}
              </div>
              <p className="text-[15px] font-bold leading-tight">{t.label}</p>
              <p className="text-xs font-semibold text-[var(--color-muted)]">{t.sub}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
