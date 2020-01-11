import { Roles } from 'constants/interfaces'
import * as Responses from 'constants/responses'
import { api } from 'constants/urls'
import { action, autorun, computed, observable, runInAction } from 'mobx'
import { constructFetchErr } from 'utils'

export type Event = {
	id: number
	name: string
	startAt: Date
	stopAt: Date
	allDay: boolean
	allClasses: boolean
	backgroundColor: string
	textColor: string
}

type Profile = {
	id: number
	firstName: string
	lastName: string
	mobilePhone: string
	role: Roles
}

export default class {
	@observable token?: string
	@observable events?: Event[]
	@observable profile?: Profile

	constructor() {
		this.load()
		autorun(this.save)
	}

	private save = (): void =>
		window.localStorage.setItem(
			'UserStore',
			JSON.stringify({
				token: this.token,
				events: this.events,
				profile: this.profile
			})
		)

	@action
	private load = (): void => {
		Object.assign(this, JSON.parse(window.localStorage.getItem('UserStore') || '{}'))

		this.events = this.events?.map(e => ({
			...e,
			startAt: new Date(e.startAt),
			stopAt: new Date(e.stopAt)
		}))
	}

	login = async (login: string, password: string): Promise<NonNullable<this['token']>> => {
		const res = await fetch(api.login(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				login,
				password
			})
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		const json = (await res.json()) as Responses.Login
		runInAction(() => (this.token = json.token))

		return (this.token as this['token'])!
	}

	@action
	logout = (): void => {
		this.token = undefined
		this.profile = undefined
		this.events = undefined
	}

	@computed
	get isLoggedIn(): boolean {
		return !!this.token
	}

	fetchEvents = async (): Promise<NonNullable<this['events']>> => {
		if (!this.token) {
			throw new Error("Can't fetch events without a token")
		}

		const res = await fetch(api.events(), {
			headers: {
				'X-API-TOKEN': this.token
			}
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		const json = (await res.json()) as Responses.Events
		runInAction(() => {
			this.events = json.events.map(e => ({
				id: e.id,
				name: e.name,
				startAt: new Date(e.start_at),
				stopAt: new Date(e.stop_at),
				allDay: e.all_day,
				allClasses: e.all_klasses,
				backgroundColor: e.background_color,
				textColor: e.text_color
			}))
		})

		return (this.events as this['events'])!
	}

	fetchProfile = async (): Promise<NonNullable<this['profile']>> => {
		if (!this.token) {
			throw new Error("Can't fetch events without a token")
		}

		const res = await fetch(api.profile(), {
			headers: {
				'X-API-TOKEN': this.token
			}
		})

		if (!res.ok) {
			throw await constructFetchErr(res)
		}

		const json = (await res.json()) as Responses.Profile
		runInAction(() => {
			this.profile = {
				id: json.profile.id,
				firstName: json.profile.first_name,
				lastName: json.profile.last_name,
				mobilePhone: json.profile.mobile_phone,
				role: Roles[json.profile.role]
			}
		})

		return (this.profile as this['profile'])!
	}
}
