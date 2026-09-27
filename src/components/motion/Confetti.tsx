import { motion } from 'framer-motion'

const COLORS = ['var(--color-brand)', 'var(--color-mango)', 'var(--color-grass)', 'var(--color-grape)', 'var(--color-coral)', 'var(--color-sky)']
const PIECES = Array.from({ length: 16 }, (_, i) => ({
  color: COLORS[i % COLORS.length],
  x: (Math.random() * 2 - 1) * 120,
  y: -(40 + Math.random() * 120),
  r: Math.random() * 360,
  s: 5 + Math.random() * 6,
  delay: Math.random() * 0.12,
}))

// One-shot celebratory burst — used on app success states and section seams.
export function Confetti({ run = true }: { run?: boolean }) {
  if (!run) return null
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible" aria-hidden>
      {PIECES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-[2px]"
          style={{ width: p.s, height: p.s * 1.6, background: p.color }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: p.x, y: p.y, rotate: p.r }}
          transition={{ duration: 1.1, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
