import * as Responses from 'constants/responses'
import { api } from 'constants/urls'
import { action, autorun, observable, runInAction } from 'mobx'

type Event = {
	id: number
	name: string
	startAt: string
	stopAt: string
	allDay: boolean
	allClasses: boolean
	backgroundColor: string
	textColor: string
}

export default class {
	@observable token?: string
	@observable events?: Event[]

	constructor() {
		this.load()
		autorun(this.save)
	}

	private save = () =>
		window.localStorage.setItem(
			'UserStore',
			JSON.stringify({ token: this.token, events: this.events })
		)

	@action
	private load = () =>
		Object.assign(this, JSON.parse(window.localStorage.getItem('UserStore') || '{}'))

	login = async (login: string, password: string) => {
		const res = await fetch(api.login(), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, password })
		})

		if (res.ok) {
			const json = (await res.json()) as Responses.Login
			runInAction(() => (this.token = json.token))
		}

		return res.ok || Promise.reject()
	}

	fetchEvents = async () => {
		if (!this.token) {
			throw new Error("Can't fetch events without a token")
		}

		const res = await fetch(api.events(), {
			headers: {
				'X-API-TOKEN': this.token,
				'Content-Type': 'application/json'
			}
		})

		if (res.ok) {
			const json = (await res.json()) as Responses.Events
			runInAction(
				() =>
					(this.events = json.events.map(e => ({
						id: e.id,
						name: e.name,
						startAt: e.start_at,
						stopAt: e.stop_at,
						allDay: e.all_day,
						allClasses: e.all_klasses,
						backgroundColor: e.background_color,
						textColor: e.text_color
					})))
			)
		}

		return res.ok || Promise.reject()
	}
}
