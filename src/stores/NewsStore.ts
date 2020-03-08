import * as responses from 'constants/responses'
import * as urls from 'constants/urls'
import { action, autorun, computed, observable, runInAction } from 'mobx'
import { constructFetchErr } from 'utils'

export type PieceOfNews = {
	id: number
	title: string
	body: string
	date: Date
	read: boolean
	requiresConfirmation: boolean
}

export class NewsStore {
	static localStorageKey = 'NewsStore'

	@observable news?: PieceOfNews[]
	@observable stickyNews?: PieceOfNews[]

	@computed
	get page() {
		return Math.floor((this.news?.length || 0) / 10) + 1
	}

	@computed
	get noMoreNews() {
		return (this.news?.length || 0) % 10 !== 0
	}

	constructor() {
		this.load()
		autorun(this.save)
	}

	private save = (): void =>
		window.localStorage.setItem(
			NewsStore.localStorageKey,
			JSON.stringify({ stickyNews: this.stickyNews })
		)

	@action
	private load = (): void => {
		Object.assign(this, JSON.parse(window.localStorage.getItem(NewsStore.localStorageKey) || '{}'))

		this.news = this.news?.map(e => ({
			...e,
			date: new Date(e.date)
		}))

		this.stickyNews = this.stickyNews?.map(e => ({
			...e,
			date: new Date(e.date)
		}))
	}

	fetchStickyNews = async (token: string): Promise<NonNullable<this['stickyNews']>> => {
		const res = await fetch(urls.api.stickyNews(), {
			headers: {
				'X-API-TOKEN': token
			}
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		const json = (await res.json()) as responses.News
		runInAction(() => {
			this.stickyNews = json.data.map(news => ({
				id: news.id,
				title: news.title,
				body: news.body,
				date: new Date(news.start_at),
				read: !!news.read_at,
				requiresConfirmation: !news.confirmed_at && news.is_confirmation_required
			}))
		})

		return (this.stickyNews as this['stickyNews'])!
	}

	fetchNextNews = async (token: string): Promise<NonNullable<this['news']>> => {
		if (this.noMoreNews) return ([] as this['news'])!

		const res = await fetch(urls.api.news(this.page), {
			headers: {
				'X-API-TOKEN': token
			}
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		const json = (await res.json()) as responses.News
		runInAction(() => {
			if (!this.news) this.news = []

			for (const news of json.data) {
				this.news.push({
					id: news.id,
					title: news.title,
					body: news.body,
					read: !!news.read_at,
					date: new Date(news.start_at),
					requiresConfirmation: !news.confirmed_at && news.is_confirmation_required
				})
			}
		})

		return (this.news as this['news'])!
	}

	markAsRead = async (token: string, id: number): Promise<PieceOfNews> => {
		const found = this.news?.find(e => e.id === id) || this.stickyNews?.find(e => e.id === id)

		if (!found) {
			throw new Error('No such news found')
		}

		const res = await fetch(urls.api.markNewsRead(id), {
			method: 'post',
			headers: {
				'X-API-TOKEN': token
			}
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		runInAction(() => {
			found.read = true
		})

		return found
	}

	markAsConfirmed = async (token: string, id: number): Promise<PieceOfNews> => {
		const found = this.news?.find(e => e.id === id) || this.stickyNews?.find(e => e.id === id)

		if (!found) {
			throw new Error('No such news found')
		}

		const res = await fetch(urls.api.markNewsConfirmed(id), {
			method: 'post',
			headers: {
				'X-API-TOKEN': token
			}
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		runInAction(() => {
			found.requiresConfirmation = false
		})

		return found
	}
}
