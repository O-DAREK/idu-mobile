import MetaStore from 'stores/MetaStore'

describe('meta store', () => {
	let onlineGetter: jest.SpyInstance<boolean, []>
	let metaStore: MetaStore
	const eventMap = {} as { [key: string]: any }
	beforeEach(() => {
		onlineGetter = jest.spyOn(window.navigator, 'onLine', 'get')
		metaStore = new MetaStore()
		window.addEventListener = jest.fn((event, cb) => {
			eventMap[event] = cb
		})
	})

	it('should have defaults', () => {
		onlineGetter.mockReturnValue(false)
		expect(metaStore.isOnline).toBe(false)
		expect(metaStore.availableUpdate).toBe(false)
		expect(metaStore.pwaInstallEvent).toBe(undefined)
	})

	it('should react to onoffline', () => {
		onlineGetter.mockReturnValue(false)
		eventMap.offline()
		expect(metaStore.isOnline).toBe(false)
	})

	it('should react to ononline', () => {
		onlineGetter.mockReturnValue(true)
		eventMap.online()
		expect(metaStore.isOnline).toBe(true)
	})

	it('should change availableUpdate status', () => {
		metaStore.theresAnUpdate()
		expect(metaStore.availableUpdate).toBe(true)
	})

	it('should set pwa install event', () => {
		metaStore.setPwaInstallEvent('test' as any)
		expect(metaStore.pwaInstallEvent).toBe('test')
	})
})
