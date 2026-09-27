import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mascot } from '../characters'

// Playful loader veil — the mascot bobs while a bar fills, then the veil lifts
// and hands off (onFinish) to the hero entrance. From the editorial veil idea.
export function Loader({ onFinish }: { onFinish?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [lifting, setLifting] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const start = performance.now()
    const dur = reduce ? 150 : 1000
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setProgress(p)
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setLifting(true)
        window.setTimeout(() => {
          setGone(true)
          onFinish?.()
        }, 520)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onFinish])

  if (gone) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: 'var(--color-canvas)',
        opacity: lifting ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: lifting ? 'none' : 'auto',
      }}
      role="status"
      aria-label={lifting ? 'Loaded' : 'Loading NurtureAI'}
    >
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
        <Mascot expr="cheer" size={112} />
      </motion.div>
      <div className="mt-5 font-display text-[1.4rem] font-semibold tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
        NurtureAI
      </div>
      <div className="mt-4 h-2 w-44 overflow-hidden rounded-full" style={{ background: 'var(--color-line)' }}>
        <div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: 'var(--color-brand)' }} />
      </div>
    </div>
  )
}
