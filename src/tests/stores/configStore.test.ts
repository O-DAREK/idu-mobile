import { Language } from 'locales'
import ConfigStore from 'stores/ConfigStore'

describe('config store', () => {
	beforeAll(() => {
		window.matchMedia = jest.fn().mockImplementation(query => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn()
		}))
	})

	let configStore: ConfigStore
	beforeEach(() => (configStore = new ConfigStore()))
	afterEach(() => window.localStorage.removeItem('ConfigStore'))

	it('should have defaults', () => {
		expect(configStore.language).toBeTruthy()
		expect(configStore.theme).toBeTruthy()
	})

	it('should defaults saved to localstorage', () => {
		expect(JSON.parse(window.localStorage.getItem('ConfigStore') || '{}')).toEqual({
			language: configStore.language,
			theme: configStore.theme
		})
	})

	it('should save to localstorage', () => {
		configStore.changeLanguage(Language.polish)
		configStore.changeTheme('dark')

		expect(JSON.parse(window.localStorage.getItem('ConfigStore') || '{}')).toEqual({
			language: Language.polish,
			theme: 'dark'
		})
	})

	it('should load from localstorage', () => {
		const settings = {
			language: Language.polish,
			theme: 'dark'
		}

		window.localStorage.setItem('ConfigStore', JSON.stringify(settings))

		const configStore2 = new ConfigStore()

		expect(configStore2.language).toBe(settings.language)
		expect(configStore2.theme).toBe(settings.theme)
	})

	it('should change language', () => {
		configStore.changeLanguage(Language.polish)

		expect(configStore.language).toBe(Language.polish)
	})

	it('should change theme', () => {
		configStore.changeTheme('light')

		expect(configStore.theme).toBe('light')
	})
})
