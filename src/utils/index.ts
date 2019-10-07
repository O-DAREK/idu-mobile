export const unixToShortDate = (unix: number, lang: string) =>
	new Date(unix).toLocaleDateString(lang, {
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	})
