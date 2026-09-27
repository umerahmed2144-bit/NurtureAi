import type { DomainKey, StatusKey } from './types'

export const DOMAIN_META: Record<
  DomainKey,
  { label: string; emoji: string; accent: string; short: string }
> = {
  reading: { label: 'Reading', emoji: '📖', accent: 'brand', short: 'Reading' },
  attention: { label: 'Attention & focus', emoji: '🎯', accent: 'mango', short: 'Attention' },
  social: { label: 'Social skills', emoji: '🤝', accent: 'grass', short: 'Social' },
  learning_habits: { label: 'Learning habits', emoji: '🧩', accent: 'grape', short: 'Habits' },
  language: { label: 'Language', emoji: '💬', accent: 'sky', short: 'Language' },
  screen_habits: { label: 'Screen habits', emoji: '📱', accent: 'coral', short: 'Screen' },
}

export const STATUS_META: Record<
  StatusKey,
  { label: string; color: string; soft: string }
> = {
  strong: { label: 'Strong', color: 'var(--color-status-strong)', soft: 'var(--color-grass-soft)' },
  developing: {
    label: 'Developing',
    color: 'var(--color-status-developing)',
    soft: 'var(--color-brand-soft)',
  },
  monitor: {
    label: 'Needs monitoring',
    color: 'var(--color-status-monitor)',
    soft: 'var(--color-mango-soft)',
  },
  attention: {
    label: 'Needs attention',
    color: 'var(--color-status-attention)',
    soft: 'var(--color-coral-soft)',
  },
}

export interface AssessmentQuestion {
  id: string
  domain: DomainKey
  text: string
}

// Plain-language, non-clinical. 0 = concern ... 3 = strong.
export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  { id: 'read_indep', domain: 'reading', text: 'Does your child read independently, without being asked?' },
  { id: 'read_words', domain: 'reading', text: 'Can they work out unfamiliar words on their own?' },
  { id: 'attn_15', domain: 'attention', text: 'Can they stay with a 15-minute activity to the end?' },
  { id: 'attn_instr', domain: 'attention', text: 'Do they follow instructions without lots of reminders?' },
  { id: 'soc_peers', domain: 'social', text: 'Do they interact comfortably with other children?' },
  { id: 'soc_group', domain: 'social', text: 'Do they join in group activities happily?' },
  { id: 'hab_when', domain: 'learning_habits', text: 'Do they have a time of day when they focus best?' },
  { id: 'hab_distract', domain: 'learning_habits', text: 'Do they stay on task without getting distracted?' },
]

export const ANSWER_OPTIONS: { value: 0 | 1 | 2 | 3; label: string }[] = [
  { value: 0, label: 'Not yet' },
  { value: 1, label: 'Sometimes' },
  { value: 2, label: 'Mostly' },
  { value: 3, label: 'Definitely' },
]

export const OBSERVATION_FIELDS = {
  focus: [
    { value: 'poor', label: 'Distracted', emoji: '😵‍💫' },
    { value: 'ok', label: 'Okay', emoji: '🙂' },
    { value: 'good', label: 'Focused', emoji: '🤩' },
  ],
  sleep: [
    { value: 'poor', label: 'Restless', emoji: '😴' },
    { value: 'ok', label: 'Okay', emoji: '😌' },
    { value: 'good', label: 'Great', emoji: '💤' },
  ],
  mood: [
    { value: 'low', label: 'Low', emoji: '😔' },
    { value: 'neutral', label: 'Neutral', emoji: '😐' },
    { value: 'positive', label: 'Happy', emoji: '😄' },
  ],
  homework: [
    { value: 'independent', label: 'On their own', emoji: '✅' },
    { value: 'needed_help', label: 'Needed help', emoji: '🤝' },
    { value: 'not_done', label: 'Not done', emoji: '⏳' },
  ],
} as const
