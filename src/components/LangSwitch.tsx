import { LANGS } from '../data/strings'
import { useLang } from './lang'

// Compact EN / UR / RU pill used on the landing page nav.
export function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div dir="ltr" className="flex shrink-0 overflow-hidden rounded-full bg-white shadow-[var(--shadow-card)]" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.key}
          onClick={() => setLang(l.key)}
          aria-pressed={lang === l.key}
          title={l.label}
          className="px-2.5 py-1.5 text-xs font-extrabold transition-colors sm:px-3"
          style={{
            background: lang === l.key ? 'var(--color-brand)' : 'transparent',
            color: lang === l.key ? '#fff' : 'var(--color-ink-soft)',
          }}
        >
          {l.short}
        </button>
      ))}
    </div>
  )
}
