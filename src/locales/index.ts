import { Language } from './strings'

export const formatLong = (lang: Language, date: Date) =>
	date.toLocaleDateString(lang, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})

export const formatShort = (lang: Language, date: Date) =>
	date.toLocaleDateString(lang, {
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	})

export { useLocale } from './hooks'
export { default as strings, Language } from './strings'
