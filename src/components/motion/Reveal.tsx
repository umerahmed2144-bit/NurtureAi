import { motion, type Variants } from 'framer-motion'
import { createElement, type ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

// Word/letter reveal with spring stagger — the editorial text-reveal idea, in
// framer-motion. `bounce` gives a playful overshoot; keeps an sr-only label.
export function Reveal({
  text,
  as = 'span',
  type = 'word',
  stagger = 0.055,
  delay = 0,
  trigger = 'inView',
  bounce = false,
  className = '',
  style,
}: {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  type?: 'word' | 'letter'
  stagger?: number
  delay?: number
  trigger?: 'inView' | 'mount'
  bounce?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  // Urdu/Arabic letters join to their neighbours, so never split them apart.
  const joined = /[\u0600-\u06FF]/.test(text)
  if (joined) type = 'word'
  const units = type === 'letter' ? [...text] : text.split(' ')
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: '0.5em' },
    show: {
      opacity: 1,
      y: '0em',
      transition: bounce
        ? { type: 'spring', stiffness: 480, damping: 15, mass: 0.7 }
        : { duration: 0.5, ease: EASE },
    },
  }
  const motionProps = {
    variants: container,
    initial: 'hidden' as const,
    ...(trigger === 'inView'
      ? { whileInView: 'show' as const, viewport: { once: true, margin: '-70px' } }
      : { animate: 'show' as const }),
    key: text,
    'aria-label': text,
    className,
    style: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      columnGap: type === 'word' ? '0.28em' : '0',
      rowGap: '0.1em',
      ...style,
    },
  }
  const children: ReactNode = units.map((u, i) => (
    <motion.span key={i} variants={item} aria-hidden className="inline-block" style={{ willChange: 'transform, opacity' }}>
      {u === ' ' ? ' ' : u}
    </motion.span>
  ))
  const MotionTag = (motion as unknown as Record<string, typeof motion.span>)[as]
  return createElement(MotionTag, motionProps, children)
}
