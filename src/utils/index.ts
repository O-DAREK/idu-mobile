export const unixToShortDate = (unix: number, lang: string) =>
	new Date(unix).toLocaleDateString(lang, {
		year: 'numeric',
		month: 'short',
		day: '2-digit'
	})

export const constructFetchErr = async (res: Response) =>
	new Error(`${res.statusText} - ${(await res.json())?.errors}`)

export const createTime = (hours: number, minutes: number): string =>
	`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

	export const ignoreRejection = <T>(promise: Promise<T>) => promise.catch(() => {})