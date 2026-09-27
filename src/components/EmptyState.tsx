import { motion } from 'framer-motion'
import { Mascot } from './characters'
import type { Expr } from './characters'

// Friendly mascot-led empty state — used wherever a screen has nothing to show
// yet (no child selected, no data).
export function EmptyState({
  title,
  body,
  expr = 'think',
  action,
}: {
  title: string
  body?: string
  expr?: Expr
  action?: React.ReactNode
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-8 py-16 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
        transition={{ scale: { type: 'spring', stiffness: 200, damping: 14 }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <Mascot expr={expr} size={96} />
      </motion.div>
      <h2 className="text-[20px]">{title}</h2>
      {body && <p className="max-w-[16rem] text-sm font-semibold text-[var(--color-muted)]">{body}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
