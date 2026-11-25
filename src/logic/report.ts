import type { Child, DevelopmentArea, Observation, WeeklyReport } from '../data/types'
import { referralSignal } from './patterns'
import type { Lang } from '../data/strings'
import { tr } from '../i18n'

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)

// Assemble the plain-language weekly report from the same underlying data.
export function buildWeeklyReport(
  child: Child,
  areas: DevelopmentArea[],
  observations: Observation[],
  lang: Lang = 'en',
): WeeklyReport {
  const T = (en: string, vars?: Record<string, string | number>) => tr(lang, en, vars)
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
    wins.push(readPct > 0 ? T('Reading practice is up about {n}% over the period.', { n: readPct }) : T('Reading practice is up over the period.'))
  const language = areas.find((a) => a.key === 'language')
  if (language && language.status === 'strong') wins.push(T('Language stays a clear strength.'))
  const social = areas.find((a) => a.key === 'social')
  if (social && (social.status === 'strong' || social.status === 'developing'))
    wins.push(T('Mood and social engagement have been positive.'))

  if (reading && reading.status !== 'strong')
    watch.push(T('Independent reading is still growing, keep the short daily sessions going.'))
  const attention = areas.find((a) => a.key === 'attention')
  if (attention && (attention.status === 'monitor' || attention.status === 'attention'))
    watch.push(T('Focus varies task to task; short timed bursts are helping.'))
  const screen = areas.find((a) => a.key === 'screen_habits')
  if (screen && screen.status !== 'strong')
    watch.push(screenDelta < 0 ? T('Screen time is on the higher side but trending down.') : T('Screen time is on the higher side.'))

  if (!wins.length) wins.push(T('Steady, consistent check-ins this week, that itself builds the picture.'))
  if (!watch.length) watch.push(T('Nothing pressing to watch this week.'))

  const ref = referralSignal(areas, observations, lang)

  return {
    childName: child.name,
    rangeLabel: rangeLabel(sorted, lang),
    headline: T('{name} kept building steady habits this period, reading is moving in the right direction.', { name: T(child.name) }),
    wins,
    watch,
    focusNext: T('Keep the 15-minute interest-led reading sessions, and log a quick check-in a few times this week.'),
    metrics: [
      {
        label: T('Avg reading / day'),
        value: T('{n} min', { n: Math.round(readLate) }),
        delta: T('{n} min', { n: `${readDelta >= 0 ? '+' : ''}${Math.round(readDelta)}` }),
        positive: readDelta >= 0,
      },
      {
        label: T('Focused sessions'),
        value: `${late.filter((o) => o.focus === 'good').length}/${late.length || 1}`,
        delta: T('this week'),
        positive: true,
      },
      {
        label: T('Avg screen / day'),
        value: T('{n} h', { n: screenLate.toFixed(1) }),
        delta: T('{n} h', { n: `${screenDelta <= 0 ? '' : '+'}${screenDelta.toFixed(1)}` }),
        positive: screenDelta <= 0,
      },
      {
        label: T('Check-ins logged'),
        value: `${observations.length}`,
        delta: T('total'),
        positive: true,
      },
    ],
    referral: ref.triggered ? ref.message : undefined,
  }
}

function rangeLabel(obs: Observation[], lang: Lang): string {
  if (!obs.length) return tr(lang, 'This week')
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-GB', { day: 'numeric', month: 'short' })
  return `${fmt(obs[0].date)} – ${fmt(obs[obs.length - 1].date)}`
}
