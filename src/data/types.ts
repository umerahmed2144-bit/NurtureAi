// Core domain model for the NurtureAI demo.

export type DomainKey =
  | 'reading'
  | 'attention'
  | 'social'
  | 'learning_habits'
  | 'language'
  | 'screen_habits'

export type StatusKey = 'strong' | 'developing' | 'monitor' | 'attention'
export type TrendKey = 'up' | 'flat' | 'down'

export type SchoolType =
  | 'Private school'
  | 'Public school'
  | 'Montessori'
  | 'International school'
  | 'Home / other'

export interface Child {
  id: string
  name: string
  emoji: string
  accent: string // css var token name, e.g. 'grape'
  age: number
  grade: string
  languages: string[]
  schoolType: SchoolType
  interests: string[] // free tags, e.g. ['Animals', 'Drawing']
  concerns: DomainKey[]
  createdAt: string
}

export type FocusLevel = 'poor' | 'ok' | 'good'
export type SleepLevel = 'poor' | 'ok' | 'good'
export type Mood = 'low' | 'neutral' | 'positive'
export type Homework = 'independent' | 'needed_help' | 'not_done'

export interface Observation {
  id: string
  childId: string
  date: string // ISO
  readingMinutes: number
  focus: FocusLevel
  sleep: SleepLevel
  screenHours: number
  mood: Mood
  homework: Homework
  note?: string
}

// answer scale: 0 = concern, 1 = sometimes, 2 = mostly, 3 = strong
export interface AssessmentAnswers {
  childId: string
  values: Record<string, 0 | 1 | 2 | 3>
  completedAt: string
}

export interface DevelopmentArea {
  key: DomainKey
  label: string
  emoji: string
  status: StatusKey
  trend: TrendKey
  score: number // 0-100, for sparkline / bar
  blurb: string
}

export interface Activity {
  id: string
  title: string
  emoji: string
  domain: DomainKey
  interestTag: string // matches a child interest, or 'any'
  durationMin: number
  accent: string
  description: string
  steps: string[]
  parentExplanation: string
}

export interface WeekPlanItem {
  week: number
  title: string
  detail: string
}

export interface Professional {
  id: string
  name: string
  role: string
  emoji: string
  accent: string
  specialties: string[]
  city: string
  rating: number
  reviews: number
  credentials: string
  languages: string[]
  nextSlot: string
  feePkr: string
  verified: boolean
}

export interface WeeklyReport {
  childName: string
  rangeLabel: string
  headline: string
  wins: string[]
  watch: string[]
  focusNext: string
  metrics: { label: string; value: string; delta: string; positive: boolean }[]
  referral?: string
}
