import { Language } from 'locales'
import { action, observable } from 'mobx'

export default class {
	@observable language: Language = Language.en

	@action changeLanguage = (to: Language) => (this.language = to)
}
