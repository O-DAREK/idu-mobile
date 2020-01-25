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
		expect(configStore.accentColors).toHaveLength(2)
		expect(configStore.accentColors[0]).toMatch(/^#[0-9a-f]{6}$/i)
		expect(configStore.accentColors[1]).toMatch(/^#[0-9a-f]{6}$/i)
	})

	it('should defaults saved to localstorage', () => {
		expect(JSON.parse(window.localStorage.getItem('ConfigStore') || '{}')).toEqual({
			language: configStore.language,
			theme: configStore.theme,
			accentColors: ['#2196f3', '#ff80ab']
		})
	})

	it('should save to localstorage', () => {
		configStore.changeLanguage(Language.polish)
		configStore.changeTheme('dark')
		configStore.changePrimaryColor('#111111')
		configStore.changeSecondaryColor('#555555')

		expect(JSON.parse(window.localStorage.getItem('ConfigStore') || '{}')).toEqual({
			language: Language.polish,
			theme: 'dark',
			accentColors: ['#111111', '#555555']
		})
	})

	it('should load from localstorage', () => {
		const settings = {
			language: Language.polish,
			theme: 'dark',
			accentColors: ['#111111', '#555555']
		}

		window.localStorage.setItem('ConfigStore', JSON.stringify(settings))

		const configStore = new ConfigStore()

		expect(configStore.language).toBe(settings.language)
		expect(configStore.theme).toBe(settings.theme)
		expect(configStore.accentColors).toEqual(settings.accentColors)
	})

	it('should change language', () => {
		configStore.changeLanguage(Language.polish)

		expect(configStore.language).toBe(Language.polish)
	})

	it('should change theme', () => {
		configStore.changeTheme('light')

		expect(configStore.theme).toBe('light')
	})

	it('should change accent colors', () => {
		configStore.changePrimaryColor('#123123')
		configStore.changeSecondaryColor('#321321')

		expect(configStore.accentColors).toEqual(['#123123', '#321321'])
	})
})
