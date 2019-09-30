export enum Language {
	en = 'en',
	pl = 'pl'
}

const strings = {
	LOGIN: {
		en: 'Login',
		pl: 'Login'
	},
	PASSWORD: {
		en: 'Password',
		pl: 'Hasło'
	},
	LOG_IN: {
		en: 'Login',
		pl: 'Zaloguj'
	}
}

export default strings as { [k in keyof typeof strings]: { [lang in Language]: string } }
