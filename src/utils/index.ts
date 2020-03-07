export const constructFetchErr = async (res: Response) => ({
	status: res.status,
	body: await res.json()
})

export const createTime = (hours: number, minutes: number): string =>
	`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

export const ignoreRejection = <T>(promise: Promise<T>) => promise.catch(() => {})

export const stripHtml = (html: string) =>
	new DOMParser().parseFromString(html, 'text/html').body.textContent || ''

export const sleep = (time: number) => new Promise(res => setTimeout(res, time))

export * from './types'
