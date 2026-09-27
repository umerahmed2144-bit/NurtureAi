import { motion, useScroll, useSpring } from 'framer-motion'

// Thin brand progress bar across the top of the page.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[70] h-1 w-full origin-left"
    >
      <div className="h-full w-full" style={{ background: 'var(--color-brand)' }} />
    </motion.div>
  )
}
