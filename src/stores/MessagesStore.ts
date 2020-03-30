import * as responses from 'constants/responses'
import * as urls from 'constants/urls'
import jwtDecode from 'jwt-decode'
import { action, autorun, computed, observable, runInAction } from 'mobx'
import { constructFetchErr, sleep } from 'utils'

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
	threadId: number
	title: string
	messages: Omit<MessageThread, 'title'>[]
}

export class MessagesStore {
	static localStorageKey = 'MessagesStore'

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
			MessagesStore.localStorageKey,
			JSON.stringify({
				messages: this.messages
			})
		)

	@action
	private load = (): void => {
		Object.assign(
			this,
			JSON.parse(window.localStorage.getItem(MessagesStore.localStorageKey) || '{}')
		)

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

	fetchSpecificMessages = async (token: string, threadId: number): Promise<SpecificMessages> => {
		const res = await fetch(urls.api.specificMessages(threadId), {
			headers: {
				'X-API-TOKEN': token
			}
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		const json = (await res.json()) as responses.SpecificMessages
		runInAction(() => {
			this.messages[threadId] = {
				threadId,
				title: json.data[0].title,
				messages: []
			}

			const { user_id: userId } = jwtDecode(token)

			for (const message of json.data) {
				this.messages[threadId].messages.push({
					id: message.id,
					body: message.body,
					sentAt: new Date(message.created_at),
					...(message.from.id === userId ? { to: message.from } : { from: message.from })
				})
			}
		})

		return this.messages[threadId]
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

			for (const thread of json.data) {
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

	sendMessage = async (
		token: string,
		threadId: number,
		body: string
	): Promise<Omit<MessageThread, 'title'>> => {
		const formData = new FormData()
		formData.append('message[thread_id]', String(threadId))
		formData.append('message[body]', body)

		const res = await fetch(urls.api.postMessage(), {
			method: 'POST',
			headers: {
				'X-API-TOKEN': token
			},
			body: formData
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		await this.fetchSpecificMessages(token, threadId)

		return this.messages[threadId].messages[this.messages[threadId].messages.length - 1]
	}

	createThread = async (
		token: string,
		recipients: number[],
		title: string,
		body: string,
		sendCopyToMail: boolean
	): Promise<Omit<MessageThread, 'title'>> => {
		await sleep(5000)

		throw 'not empty'
		// const formData = new FormData()
		// formData.append('message[thread_id]', String(threadId))
		// formData.append('message[body]', body)

		// const res = await fetch(urls.api.postMessage(), {
		// 	method: 'POST',
		// 	headers: {
		// 		'X-API-TOKEN': token
		// 	},
		// 	body: formData
		// })

		// if (!res.ok) {
		// 	throw await constructFetchErr(res)
		// }

		// await this.fetchSpecificMessages(token, threadId)

		// return this.messages[threadId].messages[this.messages[threadId].messages.length - 1]
		return 0 as any
	}
}
