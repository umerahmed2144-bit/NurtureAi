import type { Activity } from './types'

// Pre-authored activity library. The scripted engine picks from these by
// matching a child's concern (domain) to their interest tag. Every item has a
// plain-language, parent-facing explanation, the "why this, for my child".
export const ACTIVITY_LIBRARY: Activity[] = [
  {
    id: 'animal-detective',
    title: 'Animal Detective Reading Game',
    emoji: '🦁',
    domain: 'reading',
    interestTag: 'Animals',
    durationMin: 15,
    accent: 'mango',
    description:
      'Your child reads a short animal story, then hunts for new words, the characters, and what happened first, next and last.',
    steps: [
      'Read the 1-page “Lion who lost his roar” story together.',
      'Circle 3 words that looked new or tricky.',
      'Act out the order of events, beginning, middle, end.',
      'Draw the animal and label it with one new word.',
    ],
    parentExplanation:
      'Sara is more engaged when learning connects to animals. This turns reading practice into a game about something she already loves.',
  },
  {
    id: 'story-swap',
    title: 'Story Swap Read-Aloud',
    emoji: '📚',
    domain: 'reading',
    interestTag: 'Stories',
    durationMin: 10,
    accent: 'brand',
    description:
      'You read one page, your child reads the next. Trading pages keeps the pressure low while building independent reading.',
    steps: [
      'Pick a short story you both like.',
      'Take turns, one page each.',
      'When a word is tricky, sound out the first two letters together.',
      'Finish by asking “what do you think happens next?”',
    ],
    parentExplanation:
      'Taking turns lowers the pressure of reading alone and slowly grows the amount your child reads independently.',
  },
  {
    id: 'goal-line-focus',
    title: 'Goal-Line Focus Sprints',
    emoji: '⚽',
    domain: 'attention',
    interestTag: 'Football',
    durationMin: 12,
    accent: 'grass',
    description:
      'Short “match halves” of focused work with a mini celebration between each, built for a child who loves sport.',
    steps: [
      'Set a 6-minute “first half” timer for one task.',
      'Half-time: 60-second stretch or a quick goal celebration.',
      'Play the “second half”, 6 more focused minutes.',
      'Full-time whistle: mark the task done on the chart.',
    ],
    parentExplanation:
      'Ahmed sustains attention better in short bursts. Framing focus time as match halves makes finishing feel like a win.',
  },
  {
    id: 'countdown-mission',
    title: 'Space Mission Countdown',
    emoji: '🚀',
    domain: 'attention',
    interestTag: 'Space',
    durationMin: 12,
    accent: 'grape',
    description:
      'One task becomes a rocket launch, the work has to be finished before the countdown reaches lift-off.',
    steps: [
      'Choose one homework task = one “mission”.',
      'Set a visible 10-minute countdown.',
      'Finish before lift-off to “launch” the rocket sticker.',
      'Log the mission as complete.',
    ],
    parentExplanation:
      'A visible countdown gives an end-point to aim for, which helps a child who often leaves tasks unfinished.',
  },
  {
    id: 'draw-the-day',
    title: 'Draw-the-Day Check-in',
    emoji: '🎨',
    domain: 'social',
    interestTag: 'Drawing',
    durationMin: 8,
    accent: 'coral',
    description:
      'Your child draws one thing that happened with friends today and tells you the story of it.',
    steps: [
      'Ask them to draw one moment from their day with others.',
      'Let them narrate the picture to you.',
      'Ask one gentle question: “how did that feel?”',
    ],
    parentExplanation:
      'Drawing gives a comfortable way to open up about friendships and feelings without it feeling like an interview.',
  },
  {
    id: 'best-time-routine',
    title: 'Find-Your-Best-Time Routine',
    emoji: '⏰',
    domain: 'learning_habits',
    interestTag: 'any',
    durationMin: 10,
    accent: 'sky',
    description:
      'A one-week experiment to discover the time of day your child naturally focuses best, then anchor study there.',
    steps: [
      'Try 10 minutes of focus at 3 different times this week.',
      'Rate each with a 😵‍💫 / 🙂 / 🤩 sticker.',
      'Pick the winning time as the daily “focus slot”.',
    ],
    parentExplanation:
      'Studying at a child’s natural best time makes short sessions far more productive than long, tired ones.',
  },
  {
    id: 'screen-swap',
    title: 'Screen-Swap Adventure',
    emoji: '🌳',
    domain: 'screen_habits',
    interestTag: 'any',
    durationMin: 15,
    accent: 'grass',
    description:
      'Trade 15 minutes of screen time for a hands-on version of the same theme your child was watching.',
    steps: [
      'Notice what they were watching (e.g. animals, football).',
      'Offer a real-world version, a book, a ball, a build.',
      'Do it together for 15 minutes.',
    ],
    parentExplanation:
      'Swapping, rather than simply removing, screen time keeps the theme they enjoy while cutting passive hours.',
  },
]
