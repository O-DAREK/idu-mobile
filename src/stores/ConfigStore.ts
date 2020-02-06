import { Theme } from 'constants/interfaces'
import { Language } from 'locales/strings'
import { action, autorun, observable } from 'mobx'

export class ConfigStore {
	@observable language!: Language
	@observable theme!: Theme
	@observable accentColors!: [string, string]

	constructor() {
		this.reset()
		this.load()
		autorun(this.save)
	}

	private save = (): void =>
		window.localStorage.setItem(
			ConfigStore.name,
			JSON.stringify({
				language: this.language,
				theme: this.theme,
				accentColors: this.accentColors
			})
		)

	@action
	private load = (): void =>
		Object.assign(this, JSON.parse(window.localStorage.getItem(ConfigStore.name) || '{}'))

	@action
	reset = () => {
		this.language = /en/i.test(window.navigator.language) ? Language.english : Language.polish
		this.theme =
			window.matchMedia && window.matchMedia(`(prefers-color-scheme: dark)`).matches
				? 'dark'
				: 'light'
		this.accentColors = ['#2196f3', '#ff80ab']
	}

	@action
	changeLanguage = (to: Language): void => {
		this.language = to
	}

	@action
	changeTheme = (to: Theme): void => {
		this.theme = to
	}

	@action
	changePrimaryColor = (to: string): void => {
		this.accentColors[0] = to
	}

	@action
	changeSecondaryColor = (to: string): void => {
		this.accentColors[1] = to
	}
}
