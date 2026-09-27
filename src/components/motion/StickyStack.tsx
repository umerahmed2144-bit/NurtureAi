import { Children, useEffect, useRef, type ReactNode } from 'react'

const RECEDE_SCALE = 0.92
const RECEDE_SHADE = 0.5

// Each section pins at the top while the next slides over it; the covered one
// recedes (scale) and softens under a light brand veil. Ported from the
// editorial sticky-stack, re-skinned playful (soft tint, not black).
export function StickyStack({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const items = Children.toArray(children)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const phone = window.matchMedia('(max-width: 639px)')
    const pins = [...container.querySelectorAll<HTMLElement>('[data-pin]')].map((p) => ({
      inner: p.querySelector<HTMLElement>('[data-pin-inner]')!,
      shade: p.querySelector<HTMLElement>('[data-shade]')!,
      next: p.nextElementSibling as HTMLElement | null,
    })).filter((p) => p.inner && p.shade && p.next)

    let queued = false
    const apply = () => {
      queued = false
      const view = window.innerHeight || 1
      const shrink = phone.matches || reduce ? 0 : 1 - RECEDE_SCALE
      for (const { inner, shade, next } of pins) {
        const p = Math.min(1, Math.max(0, 1 - next!.getBoundingClientRect().top / view))
        inner.style.transform = p > 0 && shrink > 0 ? `scale(${1 - shrink * p})` : ''
        inner.style.willChange = p > 0 && shrink > 0 ? 'transform' : ''
        shade.style.opacity = `${RECEDE_SHADE * p}`
        inner.style.visibility = p >= 1 ? 'hidden' : 'visible'
      }
    }
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(apply) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    apply()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      {items.map((child, i) => {
        const isLast = i === items.length - 1
        if (isLast) {
          return (
            <div key={i} className="relative" style={{ zIndex: 20 }}>
              {child}
            </div>
          )
        }
        return (
          <div key={i} data-pin className="sticky top-0" style={{ zIndex: i * 10 }}>
            <div data-pin-inner style={{ transformOrigin: 'center' }}>
              {child}
            </div>
            <div
              data-shade
              className="pointer-events-none absolute inset-0"
              style={{ opacity: 0, background: 'var(--color-canvas)', zIndex: 5 }}
            />
          </div>
        )
      })}
    </div>
  )
}
