import { Language } from './strings'

export const formatLong = (lang: Language, date: Date) =>
	date.toLocaleDateString(lang, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})

export { useLocale } from './hooks'
export { default as strings, Language } from './strings'
