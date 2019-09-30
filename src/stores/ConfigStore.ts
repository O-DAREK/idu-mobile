import { Theme } from 'constants/interfaces'
import { Language } from 'locales'
import { action, observable } from 'mobx'

export default class {
	@observable language: Language = Language.en
	@observable theme: Theme = 'light'

	@action changeLanguage = (to: Language) => (this.language = to)
	@action changeTheme = (to: Theme) => (this.theme = to)
}
