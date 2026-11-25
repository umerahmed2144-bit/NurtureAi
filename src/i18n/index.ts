import type { Lang } from '../data/strings'
import { DICT } from './dict'

export type Vars = Record<string, string | number>

const missing = new Set<string>()

// Translate an English source string. Unknown strings fall back to English
// (and are reported once in dev so gaps are easy to spot).
export function tr(lang: Lang, en: string, vars?: Vars): string {
  let s = en
  if (lang !== 'en') {
    const hit = DICT[en]
    if (hit) s = lang === 'ur' ? hit[0] : hit[1]
    else if (import.meta.env.DEV && !missing.has(en)) {
      missing.add(en)
      console.warn('[i18n] missing translation:', en)
    }
  }
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v))
  return s
}

// "Grade 3" -> "جماعت 3" / "Class 3"
export function trGrade(lang: Lang, grade: string): string {
  const m = /^Grade (\d+)$/.exec(grade)
  return m ? tr(lang, 'Grade {n}', { n: m[1] }) : tr(lang, grade)
}
