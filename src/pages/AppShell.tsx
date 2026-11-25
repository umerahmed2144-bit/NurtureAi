import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { PhoneFrame, StatusBar } from '../components/PhoneFrame'
import { BottomNav } from '../components/BottomNav'
import { SaraStory } from '../demo/SaraStory'
import { Mascot } from '../components/characters'
import { useDemo } from '../store/useDemoStore'
import { useLang, useT } from '../components/lang'
import { LANGS } from '../data/strings'

export function AppShell() {
  const [story, setStory] = useState(false)
  const { resetDemo } = useDemo()
  const { lang, setLang } = useLang()
  const { t, rtl } = useT()
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
      <header className="flex h-[72px] items-center justify-between px-4 sm:h-auto sm:px-8 sm:py-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <Mascot size={34} expr="happy" />
            <span className={`hidden font-display text-lg font-semibold min-[400px]:inline ${story ? 'text-white' : 'text-[var(--color-ink)]'}`}>NurtureAI</span>
          </Link>
          {/* Back to the marketing landing (an in-app route). */}
          <Link
            to="/"
            className={`hidden rounded-full px-3 py-2 text-xs font-bold sm:inline-flex ${
              story ? 'bg-white/20 text-white' : 'bg-white text-[var(--color-ink-soft)] shadow-[var(--shadow-card)]'
            }`}
            title="Back to the NurtureAI site"
          >
            {t('← back to site')}
          </Link>
          <Link
            to="/feedback"
            className={`hidden rounded-full px-3 py-2 text-xs font-bold sm:inline-flex ${
              story ? 'bg-white/20 text-white' : 'bg-white text-[var(--color-ink-soft)] shadow-[var(--shadow-card)]'
            }`}
            title="Give feedback"
          >
            {t('📝 Feedback')}
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
                  // during the story the page is brand-blue, so the active pill turns white
                  background: lang === l.key ? (story ? '#fff' : 'var(--color-brand)') : 'transparent',
                  color: lang === l.key ? (story ? 'var(--color-brand-strong)' : '#fff') : story ? '#fff' : 'var(--color-ink-soft)',
                }}
              >
                {l.short}
              </button>
            ))}
          </div>

          {!story && (
            <button
              onClick={() => setStory(true)}
              className="inline-flex whitespace-nowrap rounded-full bg-[var(--color-ink)] px-3 py-2 text-xs font-bold text-white sm:px-4"
            >
              <span className="sm:hidden">{t('▶ Story')}</span>
              <span className="hidden sm:inline">{t('▶ Guided story')}</span>
            </button>
          )}
          <button
            onClick={() => { resetDemo(); navigate('/app') }}
            className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold ${story ? 'bg-white/20 text-white' : 'bg-white text-[var(--color-ink-soft)] shadow-[var(--shadow-card)]'}`}
            title="Reset demo data"
          >
            ↺<span className="hidden sm:inline"> {t('Reset')}</span>
          </button>
        </div>
      </header>

      {/* stage */}
      <div className="flex flex-col items-center gap-10 px-0 pb-0 sm:px-5 sm:pb-14 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
        <AnimatePresence>
          {story && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="order-2 max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-50 max-sm:rounded-t-[1.75rem] max-sm:bg-[var(--color-brand)] max-sm:px-3 max-sm:pb-3 max-sm:pt-2 max-sm:shadow-[0_-12px_40px_-12px_rgba(31,45,84,0.45)] lg:order-1"
            >
              <SaraStory onExit={() => setStory(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="order-1 w-full sm:w-auto lg:order-2">
          <PhoneFrame dir={rtl ? 'rtl' : 'ltr'}>
            <StatusBar />
            <div className="no-scrollbar flex-1 overflow-y-auto">
              <Outlet />
            </div>
            <BottomNav />
          </PhoneFrame>
        </div>

        {!story && (
          <div className="order-3 hidden max-w-xs flex-col gap-4 lg:flex">
            <TipCard emoji="👆" title={t('Explore freely')} body={t('Tap the tiles, log a check-in, open the weekly report, every screen is live and driven by the same data.')} />
            <TipCard emoji="▶" title={t('Or run the story')} body={t('Hit “Guided story” for a scripted 6-step walkthrough of Sara’s journey, perfect for presenting.')} />
            <TipCard emoji="🔒" title={t('Fully offline')} body={t('No internet, no login, no real child data. Everything runs on this laptop.')} />
          </div>
        )}
      </div>
    </div>
  )
}

function TipCard({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div dir="auto" className="rounded-[1.5rem] bg-white/70 p-4 shadow-[var(--shadow-card)] backdrop-blur">
      <p className="flex items-center gap-2 text-[15px] font-bold">
        <span className="text-xl">{emoji}</span>
        {title}
      </p>
      <p className="mt-1 text-[13px] font-semibold leading-snug text-[var(--color-ink-soft)]">{body}</p>
    </div>
  )
}
