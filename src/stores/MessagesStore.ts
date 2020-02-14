import * as responses from 'constants/responses'
import * as urls from 'constants/urls'
import jwtDecode from 'jwt-decode'
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
				avatar: string
			}
	  }
	| {
			to: {
				id: number
				name: string
				avatar: string
			}
	  }
)

export type SpecificMessages = {
	id: number
	title: string
	messages: Omit<MessageThread, 'title'>[]
}

export class MessagesStore {
	@observable messages: { [k: number]: SpecificMessages } = {}
	@observable threads?: MessageThread[]

	@computed
	get page() {
		return Math.floor((this.threads?.length || 0) / 10) + 1
	}

	@computed
	get noMoreThreads() {
		return (this.threads?.length || 0) % 10 !== 0
	}

	constructor() {
		this.load()
		autorun(this.save)
	}

	private save = (): void =>
		window.localStorage.setItem(
			MessagesStore.name,
			JSON.stringify({
				// threads: this.threads
				messages: this.messages
			})
		)

	@action
	private load = (): void => {
		Object.assign(this, JSON.parse(window.localStorage.getItem(MessagesStore.name) || '{}'))

		this.threads = this.threads?.map(e => ({
			...e,
			sentAt: new Date(e.sentAt)
		}))

		for (const key in this.messages) {
			if (this.messages.hasOwnProperty(key)) {
				this.messages[key].messages = this.messages[key].messages.map(e => ({
					...e,
					sentAt: new Date(e.sentAt)
				}))
			}
		}
	}

	fetchSpecificMessages = async (token: string, id: number): Promise<SpecificMessages> => {
		const res = await fetch(urls.api.specificMessages(id), {
			headers: {
				'X-API-TOKEN': token
			}
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		const json = (await res.json()) as responses.SpecificMessages
		runInAction(() => {
			this.messages[id] = {
				id,
				title: json.messages[0].title,
				messages: []
			}

			const { user_id: userId } = jwtDecode(token)

			for (const message of json.messages) {
				this.messages[id].messages.push({
					id: message.id,
					body: message.body,
					sentAt: new Date(message.created_at),
					...(message.from.id === userId ? { to: message.from } : { from: message.from })
				})
			}
		})

		return this.messages[id]
	}

	fetchNextThreads = async (token: string): Promise<NonNullable<this['threads']>> => {
		if (this.noMoreThreads) return ([] as this['threads'])!

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

			for (const thread of json.messages) {
				this.threads.push({
					id: thread.id,
					title: thread.title,
					body: thread.body,
					sentAt: new Date(thread.last_message_at),
					...(thread.status === 1 ? { to: thread.from } : { from: thread.from })
				})
			}
		})

		return (this.threads as this['threads'])!
	}
}
