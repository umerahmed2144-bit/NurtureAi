// A few multilingual snippets to demonstrate the EN / Urdu / Roman-Urdu
// localization angle from the proposal (Pakistani market differentiation).

export type Lang = 'en' | 'ur' | 'roman'

export const LANGS: { key: Lang; label: string; short: string }[] = [
  { key: 'en', label: 'English', short: 'EN' },
  { key: 'ur', label: 'اردو', short: 'UR' },
  { key: 'roman', label: 'Roman Urdu', short: 'RU' },
]

export const GREETING: Record<Lang, (name: string) => string> = {
  en: (n) => `Hi ${n}'s parent,`,
  ur: (n) => `${n} کے والدین، خوش آمدید`,
  roman: (n) => `${n} ke walidain, khush aamdeed`,
}

export const TAGLINE: Record<Lang, string> = {
  en: 'Understand how your child learns. Help them grow better.',
  ur: 'جانیں آپ کا بچہ کیسے سیکھتا ہے۔ اسے بہتر بڑھنے میں مدد دیں۔',
  roman: 'Janiye aap ka bacha kaise seekhta hai. Use behtar barhne mein madad dein.',
}

export const ADVENTURE_LINE: Record<Lang, string> = {
  en: 'Your child’s learning journey',
  ur: 'آپ کے بچے کا سیکھنے کا سفر',
  roman: 'Aap ke bache ka seekhne ka safar',
}
