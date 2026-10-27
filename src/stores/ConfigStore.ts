import { Theme } from 'constants/interfaces'
import { Language } from 'locales/strings'
import { action, autorun, makeObservable, observable } from 'mobx'

export class ConfigStore {
	static localStorageKey = 'ConfigStore'

	language!: Language
	theme!: Theme
	accentColors!: [string, string]

	constructor() {
		makeObservable<ConfigStore, 'load'>(this, {
			language: observable,
			theme: observable,
			accentColors: observable,
			load: action,
			reset: action,
			changeLanguage: action,
			changeTheme: action,
			changePrimaryColor: action,
			changeSecondaryColor: action
		})
		this.reset()
		this.load()
		autorun(this.save)
	}

	private save = (): void =>
		window.localStorage.setItem(
			ConfigStore.localStorageKey,
			JSON.stringify({
				language: this.language,
				theme: this.theme,
				accentColors: this.accentColors
			})
		)

	private load = (): void =>
		Object.assign(
			this,
			JSON.parse(window.localStorage.getItem(ConfigStore.localStorageKey) || '{}')
		)

	reset = () => {
		this.language = /en/i.test(window.navigator.language) ? Language.english : Language.polish
		this.theme =
			window.matchMedia && window.matchMedia(`(prefers-color-scheme: dark)`).matches
				? 'dark'
				: 'light'
		this.accentColors = ['#2196f3', '#ff80ab']
	}

	changeLanguage = (to: Language): void => {
		this.language = to
	}

	changeTheme = (to: Theme): void => {
		this.theme = to
	}

	changePrimaryColor = (to: string): void => {
		this.accentColors[0] = to
	}

	changeSecondaryColor = (to: string): void => {
		this.accentColors[1] = to
	}
}
