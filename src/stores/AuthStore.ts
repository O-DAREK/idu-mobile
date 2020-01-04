import * as Responses from 'constants/responses'
import { api } from 'constants/urls'
import { autorun, observable, runInAction } from 'mobx'

export default class {
	@observable token: string | null = localStorage.getItem('token')

	constructor() {
		autorun(this.save)
	}

	private save = () => this.token && localStorage.setItem('token', this.token)

	login = async (login: string, password: string) => {
		const res = await fetch(api.login(), {
			method: 'POST',
			body: JSON.stringify({ login, password })
		})

		if (res.ok) {
			const json = (await res.json()) as Responses.Login
			runInAction(() => (this.token = json.token))
		}

		return res.ok || Promise.reject()
	}
}
