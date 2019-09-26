export enum Language {
	en = 'en',
	pl = 'pl'
}

const strings = {
	HELLO: {
		en: 'hello',
		pl: 'hej'
	}
}

export default strings as { [k in keyof typeof strings]: { [lang in Language]: string } }
