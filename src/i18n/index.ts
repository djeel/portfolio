import en from './locales/en/common.json'
import fr from './locales/fr/common.json'

export const locales = ['en', 'fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, fr }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[defaultLocale]
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
