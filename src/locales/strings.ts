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
	},
	CHANGE_LANGUAGE: {
		en: 'Change language',
		pl: 'Zmień język'
	}
}

export default strings as { [k in keyof typeof strings]: { [lang in Language]: string } }
