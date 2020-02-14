import * as responses from 'constants/responses'
import * as urls from 'constants/urls'
import { action, autorun, computed, observable, runInAction } from 'mobx'
import { constructFetchErr } from 'utils'

export type PieceOfNews = {
	id: number
	title: string
	body: string
	date: Date
	confirmationRequired: boolean
}

export class NewsStore {
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
		window.localStorage.setItem(NewsStore.name, JSON.stringify({ stickyNews: this.stickyNews }))

	@action
	private load = (): void => {
		Object.assign(this, JSON.parse(window.localStorage.getItem(NewsStore.name) || '{}'))

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
			this.stickyNews = json.informations.map(news => ({
				id: news.id,
				title: news.title,
				body: news.body,
				date: new Date(news.start_at),
				confirmationRequired: news.is_confirmation_required
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

			for (const news of json.informations) {
				this.news.push({
					id: news.id,
					title: news.title,
					body: news.body,
					date: new Date(news.start_at),
					confirmationRequired: news.is_confirmation_required
				})
			}
		})

		return (this.news as this['news'])!
	}
}
