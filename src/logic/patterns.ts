import type {
  AssessmentAnswers,
  Child,
  DevelopmentArea,
  DomainKey,
  Observation,
  StatusKey,
  TrendKey,
} from '../data/types'
import { DOMAIN_META } from '../data/domains'

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n))

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)

const focusScore = (f: Observation['focus']) => (f === 'good' ? 100 : f === 'ok' ? 60 : 25)
const homeworkScore = (h: Observation['homework']) =>
  h === 'independent' ? 100 : h === 'needed_help' ? 55 : 20
const moodScore = (m: Observation['mood']) => (m === 'positive' ? 100 : m === 'neutral' ? 60 : 30)

function trendFor(values: number[], higherIsBetter = true): TrendKey {
  if (values.length < 4) return 'flat'
  const half = Math.floor(values.length / 2)
  const earlier = avg(values.slice(0, half))
  const later = avg(values.slice(half))
  const delta = later - earlier
  const signed = higherIsBetter ? delta : -delta
  if (signed > 6) return 'up'
  if (signed < -6) return 'down'
  return 'flat'
}

function statusFromScore(score: number): StatusKey {
  if (score >= 75) return 'strong'
  if (score >= 60) return 'developing'
  if (score >= 45) return 'monitor'
  return 'attention'
}

function ansAvg(a: AssessmentAnswers | undefined, ids: string[]): number | null {
  if (!a) return null
  const vals = ids.map((id) => a.values[id]).filter((v) => v !== undefined) as number[]
  if (!vals.length) return null
  return (avg(vals) / 3) * 100 // 0..3 -> 0..100
}

// Blend assessment self-report with observed behaviour into a 0-100 score.
function blend(assessment: number | null, observed: number | null): number {
  if (assessment !== null && observed !== null) return assessment * 0.5 + observed * 0.5
  return assessment ?? observed ?? 60
}

export function computeAreas(
  child: Child,
  observations: Observation[],
  assessment?: AssessmentAnswers,
): DevelopmentArea[] {
  const obs = [...observations].sort((a, b) => a.date.localeCompare(b.date))

  const reading = blend(
    ansAvg(assessment, ['read_indep', 'read_words']),
    obs.length ? clamp(avg(obs.map((o) => o.readingMinutes)) * 4) : null,
  )
  const attention = blend(
    ansAvg(assessment, ['attn_15', 'attn_instr']),
    obs.length ? avg(obs.map((o) => (focusScore(o.focus) + homeworkScore(o.homework)) / 2)) : null,
  )
  const social = blend(ansAvg(assessment, ['soc_peers', 'soc_group']), obs.length ? avg(obs.map((o) => moodScore(o.mood))) : null)
  const habits = blend(
    ansAvg(assessment, ['hab_when', 'hab_distract']),
    obs.length ? avg(obs.map((o) => homeworkScore(o.homework))) : null,
  )
  // Language: not directly observed; lean on child profile (multilingual) + a strong default.
  const language = child.languages.length > 1 ? 82 : 70
  // Screen habits: lower hours -> higher score. 1h≈100, 4h≈30.
  const screen = obs.length ? clamp(120 - avg(obs.map((o) => o.screenHours)) * 24) : 55

  const scores: Record<DomainKey, number> = {
    reading,
    attention,
    social,
    learning_habits: habits,
    language,
    screen_habits: screen,
  }

  const trends: Record<DomainKey, TrendKey> = {
    reading: trendFor(obs.map((o) => o.readingMinutes)),
    attention: trendFor(obs.map((o) => focusScore(o.focus))),
    social: trendFor(obs.map((o) => moodScore(o.mood))),
    learning_habits: trendFor(obs.map((o) => homeworkScore(o.homework))),
    language: 'up',
    // Trend on the health score (0-100), not raw hours, fewer hours = higher
    // score = improving = ↑. trendFor's threshold assumes a 0-100 scale.
    screen_habits: trendFor(obs.map((o) => clamp(120 - o.screenHours * 24))),
  }

  const order: DomainKey[] = [
    'reading',
    'attention',
    'language',
    'social',
    'learning_habits',
    'screen_habits',
  ]

  return order.map((key) => {
    const score = Math.round(clamp(scores[key]))
    const status = statusFromScore(score)
    return {
      key,
      label: DOMAIN_META[key].label,
      emoji: DOMAIN_META[key].emoji,
      status,
      trend: trends[key],
      score,
      blurb: blurbFor(key, status, trends[key]),
    }
  })
}

function blurbFor(key: DomainKey, status: StatusKey, trend: TrendKey): string {
  const up = trend === 'up'
  switch (key) {
    case 'reading':
      return up
        ? 'Reading practice is increasing, independent reading is still growing.'
        : 'Reading practice has been steady this month.'
    case 'attention':
      return status === 'monitor' || status === 'attention'
        ? 'Focus varies task to task, worth keeping an eye on.'
        : 'Holding attention well across activities.'
    case 'screen_habits':
      return up
        ? 'Screen time is coming down week on week, nice progress.'
        : 'Screen time is on the higher side.'
    case 'language':
      return 'Comfortable across more than one language.'
    case 'social':
      return 'Interacting comfortably and in good spirits.'
    case 'learning_habits':
      return up ? 'Study routine is settling into a rhythm.' : 'Building a consistent study routine.'
  }
}

export interface ReferralSignal {
  triggered: boolean
  domain?: DomainKey
  message?: string
  weeksObserved: number
}

// Conservative: only suggest professional support after a sustained pattern
// across enough weeks, never on a single bad day. Recommendation, not diagnosis.
export function referralSignal(
  areas: DevelopmentArea[],
  observations: Observation[],
): ReferralSignal {
  const weeksObserved = weeksSpanned(observations)
  const concern = areas.find((a) => a.status === 'attention' || (a.status === 'monitor' && a.trend !== 'up'))

  if (!concern || weeksObserved < 3) {
    return { triggered: false, weeksObserved }
  }

  const label = DOMAIN_META[concern.key].label.toLowerCase()
  return {
    triggered: true,
    domain: concern.key,
    weeksObserved,
    message: `Over the last ${weeksObserved} weeks, ${label} has stayed an area to watch. It may benefit from a professional assessment. This is a suggestion to explore support, not a diagnosis.`,
  }
}

function weeksSpanned(observations: Observation[]): number {
  if (observations.length < 2) return observations.length
  const dates = observations.map((o) => new Date(o.date).getTime()).sort((a, b) => a - b)
  const days = (dates[dates.length - 1] - dates[0]) / 86400000
  return Math.max(1, Math.round(days / 7) + 1)
}
