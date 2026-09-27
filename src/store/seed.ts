import { SEED_CHILDREN } from '../data/children'
import type { AssessmentAnswers, Observation } from '../data/types'

const daysAgo = (n: number) => {
  const d = new Date('2026-09-13T09:00:00')
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

// Deterministic 4-week history so dashboard trends read the way the proposal
// describes (reading rising, attention flat, screen high).
function saraObservations(): Observation[] {
  // oldest -> newest, ~3 per week for 4 weeks. Tuned so the dashboard reads the
  // way the proposal describes: reading Developing ↑, attention Needs monitoring
  // (the gentle-referral trigger), screen habits Needs attention (improving).
  const reading = [11, 13, 12, 15, 14, 17, 19, 18, 22, 23, 24, 26]
  const focus: Observation['focus'][] = [
    'good', 'ok', 'poor', 'ok', 'good', 'poor', 'good', 'ok', 'poor', 'ok', 'good', 'poor',
  ]
  const screen = [4.0, 3.9, 3.7, 3.5, 3.3, 3.1, 2.9, 2.8, 2.6, 2.5, 2.4, 2.3]
  const homework: Observation['homework'][] = [
    'needed_help', 'needed_help', 'needed_help', 'needed_help', 'needed_help', 'needed_help',
    'independent', 'independent', 'needed_help', 'independent', 'independent', 'independent',
  ]
  return reading.map((r, i) => ({
    id: `sara-obs-${i}`,
    childId: 'sara',
    date: daysAgo((reading.length - 1 - i) * 2 + 1),
    readingMinutes: r,
    focus: focus[i],
    sleep: i % 3 === 0 ? 'ok' : 'good',
    screenHours: screen[i],
    mood: i % 5 === 0 ? 'neutral' : 'positive',
    homework: homework[i],
  }))
}

function ahmedObservations(): Observation[] {
  const focus: Observation['focus'][] = ['poor', 'ok', 'poor', 'poor', 'ok', 'poor', 'ok', 'ok']
  const screen = [4.2, 4.0, 4.3, 3.9, 3.8, 3.7, 3.6, 3.5]
  return focus.map((f, i) => ({
    id: `ahmed-obs-${i}`,
    childId: 'ahmed',
    date: daysAgo((focus.length - 1 - i) * 2 + 1),
    readingMinutes: 12 + (i % 3),
    focus: f,
    sleep: 'ok',
    screenHours: screen[i],
    mood: i % 2 === 0 ? 'positive' : 'neutral',
    homework: i % 3 === 0 ? 'not_done' : 'needed_help',
  }))
}

export function seedObservations(): Observation[] {
  return [...saraObservations(), ...ahmedObservations()]
}

export function seedAssessments(): AssessmentAnswers[] {
  return [
    {
      childId: 'sara',
      completedAt: daysAgo(26),
      values: {
        read_indep: 1,
        read_words: 2,
        attn_15: 1,
        attn_instr: 1,
        soc_peers: 3,
        soc_group: 2,
        hab_when: 2,
        hab_distract: 1,
      },
    },
    {
      childId: 'ahmed',
      completedAt: daysAgo(22),
      values: {
        read_indep: 2,
        read_words: 2,
        attn_15: 0,
        attn_instr: 1,
        soc_peers: 2,
        soc_group: 3,
        hab_when: 1,
        hab_distract: 0,
      },
    },
  ]
}

export function seedChildren() {
  return SEED_CHILDREN.map((c) => ({ ...c }))
}
