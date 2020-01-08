export const unixToShortDate = (unix: number, lang: string) =>
	new Date(unix).toLocaleDateString(lang, {
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	})

export const constructFetchErr = async (res: Response) =>
	new Error(`${res.statusText} - ${(await res.json())?.errors}`)
