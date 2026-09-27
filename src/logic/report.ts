import type { Child, DevelopmentArea, Observation, WeeklyReport } from '../data/types'
import { referralSignal } from './patterns'

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)

// Assemble the plain-language weekly report from the same underlying data.
export function buildWeeklyReport(
  child: Child,
  areas: DevelopmentArea[],
  observations: Observation[],
): WeeklyReport {
  const sorted = [...observations].sort((a, b) => a.date.localeCompare(b.date))
  const half = Math.floor(sorted.length / 2) || 1
  const early = sorted.slice(0, half)
  const late = sorted.slice(half)

  const readEarly = avg(early.map((o) => o.readingMinutes))
  const readLate = avg(late.map((o) => o.readingMinutes))
  const readDelta = readLate - readEarly
  const readPct = readEarly ? Math.round((readDelta / readEarly) * 100) : 0

  const screenLate = avg(late.map((o) => o.screenHours))
  const screenEarly = avg(early.map((o) => o.screenHours))
  const screenDelta = screenLate - screenEarly

  const wins: string[] = []
  const watch: string[] = []

  const reading = areas.find((a) => a.key === 'reading')
  if (reading && reading.trend === 'up')
    wins.push(`Reading practice is up${readPct > 0 ? ` about ${readPct}%` : ''} over the period.`)
  const language = areas.find((a) => a.key === 'language')
  if (language && language.status === 'strong') wins.push('Language stays a clear strength.')
  const social = areas.find((a) => a.key === 'social')
  if (social && (social.status === 'strong' || social.status === 'developing'))
    wins.push('Mood and social engagement have been positive.')

  if (reading && reading.status !== 'strong')
    watch.push('Independent reading is still growing, keep the short daily sessions going.')
  const attention = areas.find((a) => a.key === 'attention')
  if (attention && (attention.status === 'monitor' || attention.status === 'attention'))
    watch.push('Focus varies task to task; short timed bursts are helping.')
  const screen = areas.find((a) => a.key === 'screen_habits')
  if (screen && screen.status !== 'strong')
    watch.push(`Screen time is on the higher side${screenDelta < 0 ? ' but trending down' : ''}.`)

  if (!wins.length) wins.push('Steady, consistent check-ins this week, that itself builds the picture.')
  if (!watch.length) watch.push('Nothing pressing to watch this week.')

  const ref = referralSignal(areas, observations)

  return {
    childName: child.name,
    rangeLabel: rangeLabel(sorted),
    headline: `${child.name} kept building steady habits this period, reading is moving in the right direction.`,
    wins,
    watch,
    focusNext:
      'Keep the 15-minute interest-led reading sessions, and log a quick check-in a few times this week.',
    metrics: [
      {
        label: 'Avg reading / day',
        value: `${Math.round(readLate)} min`,
        delta: `${readDelta >= 0 ? '+' : ''}${Math.round(readDelta)} min`,
        positive: readDelta >= 0,
      },
      {
        label: 'Focused sessions',
        value: `${late.filter((o) => o.focus === 'good').length}/${late.length || 1}`,
        delta: 'this week',
        positive: true,
      },
      {
        label: 'Avg screen / day',
        value: `${screenLate.toFixed(1)} h`,
        delta: `${screenDelta <= 0 ? '' : '+'}${screenDelta.toFixed(1)} h`,
        positive: screenDelta <= 0,
      },
      {
        label: 'Check-ins logged',
        value: `${observations.length}`,
        delta: 'total',
        positive: true,
      },
    ],
    referral: ref.triggered ? ref.message : undefined,
  }
}

function rangeLabel(obs: Observation[]): string {
  if (!obs.length) return 'This week'
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  return `${fmt(obs[0].date)} – ${fmt(obs[obs.length - 1].date)}`
}
