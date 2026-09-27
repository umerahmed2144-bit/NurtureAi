import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDemo } from '../../store/useDemoStore'
import { ScreenHeader } from '../../components/ScreenHeader'
import { EmptyState } from '../../components/EmptyState'
import { Card } from '../../components/ui'
import { Mascot } from '../../components/characters'
import { Confetti } from '../../components/motion'
import { OBSERVATION_FIELDS } from '../../data/domains'
import type { FocusLevel, Homework, Mood, Observation, SleepLevel } from '../../data/types'

function Chips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string; emoji: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className="flex flex-col items-center gap-1 rounded-2xl border-2 py-2.5 transition-all"
            style={{
              borderColor: active ? 'var(--color-brand)' : 'transparent',
              background: active ? 'var(--color-brand-soft)' : 'var(--color-canvas)',
            }}
          >
            <span className="text-2xl">{o.emoji}</span>
            <span className="text-[11px] font-bold" style={{ color: active ? 'var(--color-brand-strong)' : 'var(--color-muted)' }}>
              {o.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function Stepper({ label, unit, value, step, onChange }: { label: string; unit: string; value: number; step: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-[var(--color-canvas)] px-4 py-3">
      <span className="text-[14px] font-bold">{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={() => onChange(Math.max(0, +(value - step).toFixed(1)))} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold shadow-[var(--shadow-card)]">−</button>
        <span className="w-16 text-center font-display text-[16px] font-semibold">{value}{unit}</span>
        <button onClick={() => onChange(+(value + step).toFixed(1))} className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand)] text-lg font-bold text-white">+</button>
      </div>
    </div>
  )
}

export function LogObservation() {
  const navigate = useNavigate()
  const { activeChild, addObservation } = useDemo()
  const [reading, setReading] = useState(15)
  const [screen, setScreen] = useState(2)
  const [focus, setFocus] = useState<FocusLevel>('ok')
  const [sleep, setSleep] = useState<SleepLevel>('good')
  const [mood, setMood] = useState<Mood>('positive')
  const [homework, setHomework] = useState<Homework>('needed_help')
  const [saved, setSaved] = useState(false)

  if (!activeChild) return <EmptyState title="No child selected" body="Choose or create a child profile to see this." />

  const save = () => {
    const obs: Observation = {
      id: `obs-${Date.now()}`,
      childId: activeChild.id,
      date: new Date().toISOString(),
      readingMinutes: reading,
      focus,
      sleep,
      screenHours: screen,
      mood,
      homework,
    }
    addObservation(obs)
    setSaved(true)
    setTimeout(() => navigate('/app/dashboard'), 2600)
  }

  if (saved) {
    return (
      <div className="relative flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <Confetti />
        <motion.div initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 12 }}>
          <Mascot expr="cheer" size={104} />
        </motion.div>
        <h2 className="text-[22px]">Logged!</h2>
        <p className="text-sm font-semibold text-[var(--color-muted)]">
          Added to {activeChild.name}’s profile. NurtureAI is updating the pattern…
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-6">
      <ScreenHeader title="Quick check-in" subtitle="Takes under a minute" />

      <div className="flex flex-col gap-3 px-5">
        <Card className="flex flex-col gap-3 p-4">
          <Stepper label="📖 Reading today" unit=" min" value={reading} step={5} onChange={setReading} />
          <Stepper label="📱 Screen time" unit=" h" value={screen} step={0.5} onChange={setScreen} />
        </Card>

        <Card className="p-4">
          <p className="mb-2 text-[13px] font-bold">🎯 Focus</p>
          <Chips options={OBSERVATION_FIELDS.focus} value={focus} onChange={setFocus} />
        </Card>
        <Card className="p-4">
          <p className="mb-2 text-[13px] font-bold">💤 Sleep</p>
          <Chips options={OBSERVATION_FIELDS.sleep} value={sleep} onChange={setSleep} />
        </Card>
        <Card className="p-4">
          <p className="mb-2 text-[13px] font-bold">😊 Mood</p>
          <Chips options={OBSERVATION_FIELDS.mood} value={mood} onChange={setMood} />
        </Card>
        <Card className="p-4">
          <p className="mb-2 text-[13px] font-bold">✏️ Homework</p>
          <Chips options={OBSERVATION_FIELDS.homework} value={homework} onChange={setHomework} />
        </Card>

        <button onClick={save} className="mt-1 w-full rounded-full bg-[var(--color-ink)] py-4 font-display text-[15px] font-medium text-white shadow-[var(--shadow-soft)]">
          Save check-in
        </button>
      </div>
    </div>
  )
}
