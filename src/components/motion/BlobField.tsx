import { motion } from 'framer-motion'

// Soft drifting gradient blobs — the playful re-skin of the editorial contour
// backdrop. Pure CSS/transform, cheap, decorative.
const BLOBS = [
  { c: 'var(--color-brand)', x: '8%', y: '12%', s: 320, dx: 30, dy: 24, d: 13 },
  { c: 'var(--color-grape)', x: '72%', y: '8%', s: 280, dx: -26, dy: 30, d: 16 },
  { c: 'var(--color-mango)', x: '80%', y: '64%', s: 300, dx: -20, dy: -28, d: 15 },
  { c: 'var(--color-grass)', x: '14%', y: '70%', s: 260, dx: 24, dy: -20, d: 18 },
]

export function BlobField({ opacity = 0.16 }: { opacity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            background: b.c,
            opacity,
            filter: 'blur(60px)',
          }}
          animate={{ x: [0, b.dx, 0], y: [0, b.dy, 0] }}
          transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
