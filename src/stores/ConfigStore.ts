import { Theme } from 'constants/interfaces'
import { Language } from 'locales/strings'
import { action, autorun, observable } from 'mobx'

export default class {
	@observable language: Language = /en/i.test(window.navigator.language)
		? Language.english
		: Language.polish
	@observable theme: Theme =
		window.matchMedia && window.matchMedia(`(prefers-color-scheme: dark)`).matches
			? 'dark'
			: 'light'

	constructor() {
		this.load()
		autorun(this.save)
	}

	private save = (): void =>
		window.localStorage.setItem(
			'ConfigStore',
			JSON.stringify({ language: this.language, theme: this.theme })
		)

	@action
	private load = (): void =>
		Object.assign(this, JSON.parse(window.localStorage.getItem('ConfigStore') || '{}'))

	@action
	changeLanguage = (to: Language): void => {
		this.language = to
	}

	@action
	changeTheme = (to: Theme): void => {
		this.theme = to
	}
}
