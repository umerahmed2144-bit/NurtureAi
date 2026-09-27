import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDemo } from '../../store/useDemoStore'
import { ScreenHeader } from '../../components/ScreenHeader'
import { Mascot } from '../../components/characters'
import { accentVars, Card } from '../../components/ui'
import { DOMAIN_META } from '../../data/domains'
import type { Child, DomainKey, SchoolType } from '../../data/types'

const EMOJIS = ['🦊', '🐨', '🐸', '🦄', '🐢', '🦋']
const ACCENTS = ['grape', 'grass', 'mango', 'sky', 'coral', 'brand']
const LANG_OPTS = ['English', 'Urdu', 'Roman Urdu', 'Punjabi']
const SCHOOLS: SchoolType[] = ['Private school', 'Public school', 'Montessori', 'International school', 'Home / other']
const INTERESTS = ['Animals', 'Drawing', 'Stories', 'Cricket', 'Football', 'Space', 'Music', 'Building']
const DOMAINS = Object.keys(DOMAIN_META) as DomainKey[]

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
}

function ChipRow<T extends string>({ options, selected, onToggle, accent = 'brand' }: { options: readonly T[]; selected: T[]; onToggle: (v: T) => void; accent?: string }) {
  const { color, soft } = accentVars(accent)
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = selected.includes(o)
        return (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className="rounded-full border-2 px-4 py-2 text-[13px] font-bold transition-all"
            style={{ borderColor: active ? color : 'var(--color-line)', background: active ? soft : 'var(--color-surface)', color: active ? color : 'var(--color-ink-soft)' }}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

export function Onboarding() {
  const navigate = useNavigate()
  const { addChild } = useDemo()
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState(EMOJIS[0])
  const [age, setAge] = useState(7)
  const [languages, setLanguages] = useState<string[]>(['English', 'Urdu'])
  const [school, setSchool] = useState<SchoolType>('Private school')
  const [interests, setInterests] = useState<string[]>([])
  const [concerns, setConcerns] = useState<DomainKey[]>([])
  const [consent, setConsent] = useState(false)

  const canSubmit = name.trim().length > 0 && consent

  const submit = () => {
    const id = `child-${Date.now()}`
    const child: Child = {
      id,
      name: name.trim(),
      emoji,
      accent: ACCENTS[EMOJIS.indexOf(emoji)] ?? 'brand',
      age,
      grade: `Grade ${Math.max(1, age - 5)}`,
      languages,
      schoolType: school,
      interests,
      concerns,
      createdAt: new Date().toISOString(),
    }
    addChild(child)
    navigate('/app/assessment')
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      <ScreenHeader title="Create child profile" subtitle="About 3 minutes" />

      <div className="mx-5 mb-2 flex items-center gap-3 rounded-2xl bg-[var(--color-brand-soft)] p-3">
        <motion.div animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
          <Mascot size={48} expr="wave" />
        </motion.div>
        <p className="text-[13px] font-semibold leading-snug text-[var(--color-brand-strong)]">
          Hi! I’m Sprout. Tell me a little about your child and I’ll build their learning journey.
        </p>
      </div>

      <div className="flex flex-col gap-4 px-5">
        <Card className="p-4">
          <label className="text-[13px] font-bold">Child’s name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sara"
            className="mt-2 w-full rounded-2xl bg-[var(--color-canvas)] px-4 py-3 text-[15px] font-bold outline-none placeholder:font-semibold placeholder:text-[var(--color-muted)]"
          />
          <p className="mb-2 mt-4 text-[13px] font-bold">Pick an avatar</p>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map((e, i) => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all"
                style={{ background: emoji === e ? accentVars(ACCENTS[i]).soft : 'var(--color-canvas)', outline: emoji === e ? `2px solid ${accentVars(ACCENTS[i]).color}` : 'none' }}
              >
                {e}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold">Age</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setAge(Math.max(4, age - 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-canvas)] text-lg font-bold">−</button>
              <span className="w-8 text-center font-display text-[18px] font-semibold">{age}</span>
              <button onClick={() => setAge(Math.min(12, age + 1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand)] text-lg font-bold text-white">+</button>
            </div>
          </div>
        </Card>

        <div>
          <p className="mb-2 text-[13px] font-bold">Languages at home</p>
          <ChipRow options={LANG_OPTS} selected={languages} onToggle={(v) => setLanguages(toggle(languages, v))} accent="sky" />
        </div>

        <div>
          <p className="mb-2 text-[13px] font-bold">School type</p>
          <ChipRow options={SCHOOLS} selected={[school]} onToggle={(v) => setSchool(v)} accent="grape" />
        </div>

        <div>
          <p className="mb-2 text-[13px] font-bold">Interests <span className="font-semibold text-[var(--color-muted)]">(powers personalization)</span></p>
          <ChipRow options={INTERESTS} selected={interests} onToggle={(v) => setInterests(toggle(interests, v))} accent="mango" />
        </div>

        <div>
          <p className="mb-2 text-[13px] font-bold">Any areas you’d like to focus on?</p>
          <div className="flex flex-wrap gap-2">
            {DOMAINS.map((d) => {
              const active = concerns.includes(d)
              const { color, soft } = accentVars(DOMAIN_META[d].accent)
              return (
                <button
                  key={d}
                  onClick={() => setConcerns(toggle(concerns, d))}
                  className="flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-[13px] font-bold transition-all"
                  style={{ borderColor: active ? color : 'var(--color-line)', background: active ? soft : 'var(--color-surface)', color: active ? color : 'var(--color-ink-soft)' }}
                >
                  <span>{DOMAIN_META[d].emoji}</span>
                  {DOMAIN_META[d].short}
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={() => setConsent(!consent)}
          className="flex items-start gap-3 rounded-2xl p-4 text-left"
          style={{ background: 'var(--color-brand-soft)' }}
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2" style={{ borderColor: 'var(--color-brand)', background: consent ? 'var(--color-brand)' : 'transparent' }}>
            {consent && <span className="text-xs text-white">✓</span>}
          </span>
          <span className="text-[12px] font-semibold leading-snug text-[var(--color-brand-strong)]">
            I’m this child’s parent/guardian and I consent to NurtureAI storing these details securely.
            NurtureAI does not diagnose and collects only what’s needed to help.
          </span>
        </button>

        <button
          onClick={submit}
          disabled={!canSubmit}
          className="w-full rounded-full bg-[var(--color-ink)] py-4 font-display text-[15px] font-medium text-white shadow-[var(--shadow-soft)] disabled:opacity-40"
        >
          Continue to quick assessment →
        </button>
      </div>
    </div>
  )
}
