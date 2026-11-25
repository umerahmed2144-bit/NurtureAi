import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { StatusKey, TrendKey } from '../data/types'
import { STATUS_META } from '../data/domains'
import { useT } from './lang'

export function accentVars(accent: string): { color: string; soft: string } {
  return { color: `var(--color-${accent})`, soft: `var(--color-${accent}-soft)` }
}

export function Card({
  children,
  className = '',
  onClick,
  style,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={
        'rounded-[1.75rem] bg-[var(--color-surface)] shadow-[var(--shadow-card)] ' +
        (onClick ? 'cursor-pointer transition-transform active:scale-[0.98] ' : '') +
        className
      }
    >
      {children}
    </div>
  )
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'dark' | 'brand' | 'soft' | 'ghost'
  full?: boolean
}

export function Button({ variant = 'dark', full, className = '', ...rest }: BtnProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-[15px] font-medium transition-all active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none'
  const variants: Record<string, string> = {
    dark: 'bg-[var(--color-ink)] text-white shadow-[var(--shadow-soft)] hover:brightness-110',
    brand: 'bg-[var(--color-brand)] text-white shadow-[0_10px_24px_-10px_rgba(91,141,239,0.8)] hover:brightness-105',
    soft: 'bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)] hover:brightness-95',
    ghost: 'bg-transparent text-[var(--color-ink-soft)] hover:bg-black/5',
  }
  return (
    <button className={`${base} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`} {...rest} />
  )
}

export function Tag({ children, accent = 'brand' }: { children: ReactNode; accent?: string }) {
  const { color, soft } = accentVars(accent)
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
      style={{ background: soft, color }}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: StatusKey }) {
  const m = STATUS_META[status]
  const { t } = useT()
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold"
      style={{ background: m.soft, color: m.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
      {t(m.label)}
    </span>
  )
}

export function TrendArrow({ trend }: { trend: TrendKey }) {
  const map = {
    up: { icon: '↑', color: 'var(--color-status-strong)' },
    flat: { icon: '→', color: 'var(--color-muted)' },
    down: { icon: '↓', color: 'var(--color-status-attention)' },
  } as const
  const m = map[trend]
  return (
    <span className="font-display text-lg font-bold" style={{ color: m.color }}>
      {m.icon}
    </span>
  )
}

export function IconTile({ emoji, accent }: { emoji: string; accent: string }) {
  const { soft } = accentVars(accent)
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
      style={{ background: soft }}
    >
      {emoji}
    </div>
  )
}

export function ProgressRing({
  value,
  size = 56,
  stroke = 6,
  color = 'var(--color-brand)',
}: {
  value: number
  size?: number
  stroke?: number
  color?: string
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (Math.min(100, Math.max(0, value)) / 100) * c
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={off}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  )
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-[17px] font-semibold">{children}</h3>
      {action}
    </div>
  )
}
