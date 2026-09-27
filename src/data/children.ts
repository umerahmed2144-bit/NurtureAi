import type { Child } from './types'

// Seeded profiles. Sara drives the guided story; Ahmed provides the
// personalization contrast (Child A vs Child B from the proposal).
export const SEED_CHILDREN: Child[] = [
  {
    id: 'sara',
    name: 'Sara',
    emoji: '🦊',
    accent: 'grape',
    age: 8,
    grade: 'Grade 3',
    languages: ['English', 'Urdu'],
    schoolType: 'Private school',
    interests: ['Animals', 'Drawing', 'Stories'],
    concerns: ['reading', 'attention'],
    createdAt: new Date('2026-08-16').toISOString(),
  },
  {
    id: 'ahmed',
    name: 'Ahmed',
    emoji: '⚽',
    accent: 'grass',
    age: 7,
    grade: 'Grade 2',
    languages: ['English', 'Urdu'],
    schoolType: 'Private school',
    interests: ['Cricket', 'Football', 'Space'],
    concerns: ['attention', 'screen_habits'],
    createdAt: new Date('2026-08-20').toISOString(),
  },
]

export const STORY_CHILD_ID = 'sara'
