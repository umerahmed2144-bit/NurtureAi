import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

export function ScreenHeader({
  title,
  subtitle,
  right,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
}) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-3 px-5 pb-2 pt-2">
      <button
        onClick={() => navigate('/app')}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface)] text-lg shadow-[var(--shadow-card)]"
        aria-label="Back"
      >
        ‹
      </button>
      <div className="flex-1">
        <h2 className="text-[20px] leading-tight">{title}</h2>
        {subtitle && <p className="text-xs font-semibold text-[var(--color-muted)]">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}
