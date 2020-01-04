export enum Language {
	en = 'en',
	pl = 'pl'
}

const strings = {
	LOGIN: {
		en: 'Login',
		pl: 'Login'
	},
	SUCCESSFUL_LOGIN: {
		en: 'Logged in successfully',
		pl: 'Zalogowano się poprawnie'
	},
	FAILED_LOGIN: {
		en: 'Failed to log in',
		pl: 'Nie udało sie zalogować'
	},
	PASSWORD: {
		en: 'Password',
		pl: 'Hasło'
	},
	LOG_IN: {
		en: 'Login',
		pl: 'Zaloguj'
	},
	SETTINGS: {
		en: 'Settings',
		pl: 'Ustawienia'
	},
	CHANGE_LANGUAGE: {
		en: 'Change language',
		pl: 'Zmień język'
	},
	CHANGE_THEME: {
		en: 'Change theme',
		pl: 'Zmień motyw'
	},
	THEME_LIGHT: {
		en: 'Light',
		pl: 'Jasny'
	},
	THEME_DARK: {
		en: 'Dark',
		pl: 'Ciemny'
	},
	LOG_OUT: {
		en: 'Logout',
		pl: 'Wyloguj'
	},
	NEWS: {
		en: 'News',
		pl: 'Aktualności'
	},
	MESSAGES: {
		en: 'Messages',
		pl: 'Wiadomości'
	},
	CALENDAR: {
		en: 'Calendar',
		pl: 'Kalendarz'
	}
}

export default strings as { [k in keyof typeof strings]: { [lang in Language]: string } }
