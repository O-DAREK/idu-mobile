import { Language } from 'locales'
import { runInAction } from 'mobx'
import { ConfigStore } from 'stores/ConfigStore'

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
	const getLS = (dflt = '{}') => JSON.parse(window.localStorage.getItem(ConfigStore.name) || dflt)

	let configStore: ConfigStore
	beforeEach(() => (configStore = new ConfigStore()))
	afterEach(() => window.localStorage.removeItem(ConfigStore.name))

	it('should have defaults', () => {
		expect(typeof configStore.language).toBe('string')
		expect(typeof configStore.theme).toBe('string')
		expect(configStore.accentColors).toHaveLength(2)
		expect(configStore.accentColors[0]).toMatch(/^#[0-9a-f]{6}$/i)
		expect(configStore.accentColors[1]).toMatch(/^#[0-9a-f]{6}$/i)
	})

	it('should reset back to defaults', () => {
		runInAction(() => {
			configStore.theme = 'asd' as any
			configStore.language = 'asd' as any
			configStore.accentColors = ['#132123', '#432109']
		})

		configStore.reset()
		expect(configStore.language).not.toBe('asd')
		expect(configStore.theme).not.toBe('asd')
		expect(configStore.accentColors).not.toEqual(['#132123', '#432109'])
	})

	it('should defaults saved to localstorage', () => {
		expect(getLS()).toEqual({
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

		expect(getLS()).toEqual({
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

		window.localStorage.setItem(ConfigStore.name, JSON.stringify(settings))

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
