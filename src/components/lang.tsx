import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang } from '../data/strings'
import { tr, trGrade, type Vars } from '../i18n'

const KEY = 'nurtureai.lang'

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
})

function initialLang(): Lang {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'en' || v === 'ur' || v === 'roman') return v
  } catch {
    /* storage unavailable */
  }
  return 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      /* storage unavailable */
    }
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang === 'ur' ? 'ur' : 'en'
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LangContext)
}

// t('English text', { vars }) in the current language. Also exposes rtl and
// grade helpers so screens don't each re-derive them.
// eslint-disable-next-line react-refresh/only-export-components
export function useT() {
  const { lang } = useContext(LangContext)
  const t = useCallback((en: string, vars?: Vars) => tr(lang, en, vars), [lang])
  const grade = useCallback((g: string) => trGrade(lang, g), [lang])
  return { t, grade, lang, rtl: lang === 'ur' }
}
