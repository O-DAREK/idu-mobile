export enum Language {
	english = 'en',
	polish = 'pl'
}

const strings = {
	LOGIN: {
		en: 'Login',
		pl: 'Login'
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
	},
	EVENTS: {
		en: 'Events',
		pl: 'Wydarzenia'
	},
	NO_EVENTS: {
		en: 'You have no events',
		pl: 'Nie masz żadnych wydarzeń'
	},
	SESSION_EXPIRED: {
		en: 'Your session has expired',
		pl: 'Twoja sesja wygasła'
	},
	ACCENT_COLORS: {
		en: 'Accent colors',
		pl: 'Kolory akcentowe'
	},
	PRIMARY: {
		en: 'Primary',
		pl: 'Podstawowy'
	},
	SECONDARY: {
		en: 'Secondary',
		pl: 'Poboczny'
	},
	NO_SUCH_THREAD: {
		en: 'Sorry, these messages dont exist',
		pl: 'Przepraszamy, te wiadomości nie istnieją'
	},
	NO_SUCH_NEWS: {
		en: 'Sorry, this news piece does not exist',
		pl: 'Przepraszamy, ta aktualność nie istnieje'
	},
	MESSAGE_PLACEHOLDER: {
		en: 'Message...',
		pl: 'Wiadomość...'
	},
	ERROR_GENERIC: {
		en: 'Something went wrong, try to refresh',
		pl: 'Coś poszło nie tak, spróbuj odświeżyć'
	},
	INSTALL_BUTTON: {
		en: 'Install me as an app',
		pl: 'Zainstaluj mnie jako aplikację'
	},
	STICKY_NEWS: {
		en: 'Sticky news',
		pl: 'Przypięte aktualności'
	},
	CONFIRM_TO_CONTINUE: {
		en: 'Confirm to continue',
		pl: 'Potwierdź by kontynuować'
	},
	CONFIRM: {
		en: 'Confirm',
		pl: 'Potwierdź'
	},
	FAILED_TO_CONFIRM: {
		en: 'Something went wrong, failed to confirm',
		pl: 'Coś poszło nie tak, nie udało sie potwierdzić'
	},
	RECIPIENT: {
		en: 'Recipient',
		pl: 'Odbiorca'
	},
	TITLE: {
		en: 'Title',
		pl: 'Tytuł'
	},
	COPY_ON_MAIL: {
		en: 'Send copy to mail',
		pl: 'Wyślij kopię na maila'
	}
}

export default strings as { [k in keyof typeof strings]: { [lang in Language]: string } }
