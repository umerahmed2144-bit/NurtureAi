import { NavLink, useNavigate } from 'react-router-dom'

const items = [
  { to: '/app', end: true, icon: '🏠', label: 'Home' },
  { to: '/app/dashboard', icon: '📊', label: 'Progress' },
  { to: '/app/report', icon: '📄', label: 'Report' },
  { to: '/app/directory', icon: '🩺', label: 'Support' },
]

export function BottomNav() {
  const navigate = useNavigate()
  return (
    <div className="relative border-t border-[var(--color-line)] bg-[var(--color-surface)]/95 px-3 pb-5 pt-2 backdrop-blur">
      <div className="flex items-end justify-between">
        {items.slice(0, 2).map((it) => (
          <Tab key={it.to} {...it} />
        ))}
        <div className="flex-1" />
        {items.slice(2).map((it) => (
          <Tab key={it.to} {...it} />
        ))}
      </div>
      {/* center log button */}
      <button
        onClick={() => navigate('/app/log')}
        aria-label="Log a quick check-in"
        className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-brand)] text-2xl text-white shadow-[0_12px_28px_-8px_rgba(91,141,239,0.9)] transition-transform active:scale-95"
      >
        ＋
      </button>
    </div>
  )
}

function Tab({ to, end, icon, label }: { to: string; end?: boolean; icon: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={end}
      className="flex w-16 flex-col items-center gap-1 py-1 text-[11px] font-bold"
    >
      {({ isActive }) => (
        <>
          <span className={`text-xl transition-transform ${isActive ? 'scale-110' : 'opacity-50 grayscale'}`}>
            {icon}
          </span>
          <span style={{ color: isActive ? 'var(--color-brand)' : 'var(--color-muted)' }}>{label}</span>
        </>
      )}
    </NavLink>
  )
}
