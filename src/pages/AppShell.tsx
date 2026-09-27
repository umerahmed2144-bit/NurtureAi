import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PhoneFrame, StatusBar } from '../components/PhoneFrame'
import { BottomNav } from '../components/BottomNav'
import { SaraStory } from '../demo/SaraStory'
import { Mascot } from '../components/characters'
import { useDemo } from '../store/useDemoStore'
import { useLang } from '../components/lang'
import { LANGS } from '../data/strings'

export function AppShell() {
  const [story, setStory] = useState(false)
  const { resetDemo } = useDemo()
  const { lang, setLang } = useLang()
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen w-full transition-colors duration-500"
      style={{
        background: story
          ? 'radial-gradient(120% 120% at 20% 0%, var(--color-periwinkle) 0%, var(--color-brand) 45%, var(--color-brand-strong) 100%)'
          : 'linear-gradient(180deg, var(--color-brand-soft) 0%, var(--color-canvas) 42%)',
      }}
    >
      {/* toolbar */}
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <Mascot size={34} expr="happy" />
            <span className={`font-display text-lg font-semibold ${story ? 'text-white' : 'text-[var(--color-ink)]'}`}>NurtureAI</span>
          </Link>
          {/* Back to the marketing landing (an in-app route). */}
          <Link
            to="/"
            className={`hidden rounded-full px-3 py-2 text-xs font-bold sm:inline-flex ${
              story ? 'bg-white/20 text-white' : 'bg-white text-[var(--color-ink-soft)] shadow-[var(--shadow-card)]'
            }`}
            title="Back to the NurtureAI site"
          >
            ← back to site
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* language switch */}
          <div className={`flex overflow-hidden rounded-full ${story ? 'bg-white/20' : 'bg-white shadow-[var(--shadow-card)]'}`}>
            {LANGS.map((l) => (
              <button
                key={l.key}
                onClick={() => setLang(l.key)}
                className="px-3 py-1.5 text-xs font-extrabold transition-colors"
                style={{
                  background: lang === l.key ? 'var(--color-brand)' : 'transparent',
                  color: lang === l.key ? '#fff' : story ? '#fff' : 'var(--color-ink-soft)',
                }}
              >
                {l.short}
              </button>
            ))}
          </div>

          {!story && (
            <button
              onClick={() => setStory(true)}
              className="hidden rounded-full bg-[var(--color-ink)] px-4 py-2 text-xs font-bold text-white sm:inline-flex"
            >
              ▶ Guided story
            </button>
          )}
          <button
            onClick={() => { resetDemo(); navigate('/app') }}
            className={`rounded-full px-3 py-2 text-xs font-bold ${story ? 'bg-white/20 text-white' : 'bg-white text-[var(--color-ink-soft)] shadow-[var(--shadow-card)]'}`}
            title="Reset demo data"
          >
            ↺ Reset
          </button>
        </div>
      </header>

      {/* stage */}
      <div className="flex flex-col items-center gap-10 px-5 pb-14 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
        <AnimatePresence>
          {story && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="order-2 lg:order-1"
            >
              <SaraStory onExit={() => setStory(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="order-1 lg:order-2">
          <PhoneFrame>
            <StatusBar />
            <div className="no-scrollbar flex-1 overflow-y-auto">
              <Outlet />
            </div>
            <BottomNav />
          </PhoneFrame>
        </div>

        {!story && (
          <div className="order-3 hidden max-w-xs flex-col gap-4 lg:flex">
            <TipCard emoji="👆" title="Explore freely" body="Tap the tiles, log a check-in, open the weekly report, every screen is live and driven by the same data." />
            <TipCard emoji="▶" title="Or run the story" body="Hit “Guided story” for a scripted 6-step walkthrough of Sara’s journey, perfect for presenting." />
            <TipCard emoji="🔒" title="Fully offline" body="No internet, no login, no real child data. Everything runs on this laptop." />
          </div>
        )}
      </div>
    </div>
  )
}

function TipCard({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div className="rounded-[1.5rem] bg-white/70 p-4 shadow-[var(--shadow-card)] backdrop-blur">
      <p className="flex items-center gap-2 text-[15px] font-bold">
        <span className="text-xl">{emoji}</span>
        {title}
      </p>
      <p className="mt-1 text-[13px] font-semibold leading-snug text-[var(--color-ink-soft)]">{body}</p>
    </div>
  )
}
