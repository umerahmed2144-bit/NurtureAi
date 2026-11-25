import { useDemo } from '../../store/useDemoStore'
import { computeAreas } from '../../logic/patterns'
import { buildWeeklyReport } from '../../logic/report'
import { ScreenHeader } from '../../components/ScreenHeader'
import { EmptyState } from '../../components/EmptyState'
import { Card } from '../../components/ui'
import { GuardrailBanner } from '../../components/GuardrailBanner'
import { useT } from '../../components/lang'

export function Report() {
  const { activeChild, observationsFor, assessmentFor } = useDemo()
  const { t, lang } = useT()
  if (!activeChild) return <EmptyState title={t('No child selected')} body={t('Choose or create a child profile to see this.')} />
  const obs = observationsFor(activeChild.id)
  const areas = computeAreas(activeChild, obs, assessmentFor(activeChild.id))
  const report = buildWeeklyReport(activeChild, areas, obs, lang)

  return (
    <div className="flex flex-col gap-4 pb-6">
      <ScreenHeader
        title={t('Weekly report')}
        subtitle={report.rangeLabel}
        right={
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface)] text-lg shadow-[var(--shadow-card)]" title="Share">
            📤
          </button>
        }
      />

      <div className="px-5">
        <Card className="overflow-hidden">
          {/* header band */}
          <div className="bg-[var(--color-brand)] p-5 text-white">
            <p className="text-[12px] font-bold opacity-90">{t('NurtureAI · Weekly summary')}</p>
            <p className="mt-1 font-display text-[19px] font-semibold leading-snug">{report.headline}</p>
          </div>

          {/* metrics */}
          <div className="grid grid-cols-2 gap-px bg-[var(--color-line)]">
            {report.metrics.map((m) => (
              <div key={m.label} className="bg-[var(--color-surface)] p-4">
                <p className="text-[11px] font-bold text-[var(--color-muted)]">{m.label}</p>
                <p className="mt-0.5 font-display text-[22px] font-semibold">{m.value}</p>
                <p className="text-[11px] font-extrabold" style={{ color: m.positive ? 'var(--color-status-strong)' : 'var(--color-status-attention)' }}>
                  {m.delta}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="px-5">
        <Card className="p-4">
          <p className="mb-2 flex items-center gap-2 text-[15px] font-bold">{t('🌟 Wins this week')}</p>
          <ul className="flex flex-col gap-2">
            {report.wins.map((w, i) => (
              <li key={i} className="flex gap-2 text-[13px] font-semibold text-[var(--color-ink-soft)]">
                <span className="text-[var(--color-status-strong)]">✓</span>
                {w}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="px-5">
        <Card className="p-4">
          <p className="mb-2 flex items-center gap-2 text-[15px] font-bold">{t('👀 Worth watching')}</p>
          <ul className="flex flex-col gap-2">
            {report.watch.map((w, i) => (
              <li key={i} className="flex gap-2 text-[13px] font-semibold text-[var(--color-ink-soft)]">
                <span className="text-[var(--color-status-monitor)]">•</span>
                {w}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="px-5">
        <Card className="p-4" style={{ background: 'var(--color-grass-soft)' }}>
          <p className="text-[11px] font-extrabold uppercase tracking-wide" style={{ color: 'var(--color-grass)' }}>
            {t('Focus for next week')}
          </p>
          <p className="mt-1 text-[14px] font-bold leading-snug text-[var(--color-ink-soft)]">{report.focusNext}</p>
        </Card>
      </div>

      {report.referral && (
        <div className="px-5">
          <GuardrailBanner />
        </div>
      )}
    </div>
  )
}
