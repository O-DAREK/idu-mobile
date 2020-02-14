import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import pl from 'javascript-time-ago/locale/pl'
import { Language } from './strings'

TimeAgo.addLocale(en)
TimeAgo.addLocale(pl)

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

export const timeAgo = (lang: Language, date: Date) => new TimeAgo(lang).format(date, 'twitter')

export { useLocale } from './hooks'
export { default as strings, Language } from './strings'
