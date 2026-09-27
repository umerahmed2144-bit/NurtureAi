import type { ReactNode } from 'react'

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? 'text-white' : 'text-[var(--color-ink)]'
  return (
    <div className={`flex items-center justify-between px-6 pt-3 pb-1 text-[13px] font-bold ${c}`}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[11px]">●●●●</span>
        <span className="text-[11px]">📶</span>
        <span className="text-[11px]">🔋</span>
      </div>
    </div>
  )
}

// A laptop-friendly phone mockup. Content scrolls inside the device.
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 400 }}>
      <div
        className="relative overflow-hidden rounded-[3rem] border-[10px] border-[#101322] bg-[var(--color-canvas)] shadow-[var(--shadow-pop)]"
        style={{ height: 'min(820px, calc(100vh - 96px))' }}
      >
        {/* notch */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-30 h-7 w-36 -translate-x-1/2 rounded-b-3xl bg-[#101322]" />
        <div className="relative flex h-full flex-col">{children}</div>
      </div>
    </div>
  )
}
