import type { ReactNode } from 'react'

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? 'text-white' : 'text-[var(--color-ink)]'
  return (
    <div dir="ltr" className={`hidden items-center justify-between px-6 pt-3 pb-1 text-[13px] font-bold sm:flex ${c}`}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[11px]">●●●●</span>
        <span className="text-[11px]">📶</span>
        <span className="text-[11px]">🔋</span>
      </div>
    </div>
  )
}

// A laptop-friendly phone mockup. Content scrolls inside the device. On a real
// phone (e.g. someone who scanned the QR code) the frame drops away and the app
// fills the screen, since the visitor is already holding a phone.
export function PhoneFrame({ children, dir = 'ltr' }: { children: ReactNode; dir?: 'ltr' | 'rtl' }) {
  return (
    <div className="relative mx-auto w-full sm:w-[400px]">
      <div
        className="relative h-[calc(100dvh-72px)] overflow-hidden rounded-t-[1.75rem] bg-[var(--color-canvas)] sm:h-[min(820px,calc(100vh-96px))] sm:rounded-[3rem] sm:border-[10px] sm:border-[#101322] sm:shadow-[var(--shadow-pop)]"
      >
        {/* notch */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-30 hidden h-7 w-36 -translate-x-1/2 rounded-b-3xl bg-[#101322] sm:block" />
        <div dir={dir} className="relative flex h-full flex-col pt-3 sm:pt-0">{children}</div>
      </div>
    </div>
  )
}
