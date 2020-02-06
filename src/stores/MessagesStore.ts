import * as responses from 'constants/responses'
import * as urls from 'constants/urls'
import { action, autorun, computed, observable, runInAction } from 'mobx'
import { constructFetchErr } from 'utils'

export type MessageThread = {
	id: number
	title: string
	body: string
	sentAt: Date
} & (
	| {
			from: {
				id: number
				name: string
			}
	  }
	| {
			to: {
				id: number
				name: string
			}
	  }
)

export class MessagesStore {
	@observable threads?: MessageThread[]
	@observable noMoreThreads = false

	@computed
	get page() {
		return Math.floor((this.threads?.length || 0) / 10) + 1
	}

	constructor() {
		this.load()
		autorun(this.save)
	}

	private save = (): void =>
		window.localStorage.setItem(
			MessagesStore.name,
			JSON.stringify({
				threads: this.threads
			})
		)

	@action
	private load = (): void => {
		Object.assign(this, JSON.parse(window.localStorage.getItem(MessagesStore.name) || '{}'))

		this.threads = this.threads?.map(e => ({
			...e,
			sentAt: new Date(e.sentAt)
		}))
	}

	fetchNextThreads = async (token: string): Promise<NonNullable<this['threads']>> => {
		const res = await fetch(urls.api.messages(this.page), {
			headers: {
				'X-API-TOKEN': token
			}
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		const json = (await res.json()) as responses.MessageThreads
		runInAction(() => {
			if (!this.threads) this.threads = []

			if (json.messages.length < 10) this.noMoreThreads = true

			for (const thread of json.messages) {
				this.threads.push({
					id: thread.id,
					title: thread.title,
					body: thread.body,
					sentAt: new Date(thread.created_at),
					...(thread.status === 1 ? { to: thread.from } : { from: thread.from })
				})
			}
		})

		return (this.threads as this['threads'])!
	}
}
