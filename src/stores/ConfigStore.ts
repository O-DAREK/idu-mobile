import { Theme } from 'constants/interfaces'
import { Language } from 'locales/strings'
import { action, autorun, observable } from 'mobx'

export default class {
	@observable language: Language = Language.en
	@observable theme: Theme = 'light'

	constructor() {
		autorun(() => this.save())
		this.load()
	}

	@action
	changeLanguage = (to: Language) => (this.language = to)

	@action
	changeTheme = (to: Theme) => (this.theme = to)

	save = () =>
		window.localStorage.setItem(
			'ConfigStore',
			JSON.stringify({ language: this.language, theme: this.theme })
		)

	@action
	load = () => Object.assign(this, JSON.parse(window.localStorage.getItem('ConfigStore') || '{}'))
}
