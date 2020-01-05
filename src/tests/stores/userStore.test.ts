import { Events, Login } from 'constants/responses'
import UserStore from 'stores/UserStore'

describe('user store', () => {
	let userStore: UserStore
	beforeEach(() => {
		userStore = new UserStore()
		fetchMock.resetMocks()
	})
	afterEach(() => window.localStorage.removeItem('UserStore'))

	const getLS = (dflt = '{}') => JSON.parse(window.localStorage.getItem('UserStore') || dflt)

	it('should have defaults', () => {
		expect(userStore.token).toBe(undefined)
		expect(userStore.events).toBe(undefined)
	})

	it('should have defaults saved to localstorage', () => {
		expect(getLS('{"not": "empty"}')).toEqual({})
	})

	describe('login', () => {
		it('should correctly log in and store the token in localStorage', async () => {
			fetchMock.mockResponseOnce(JSON.stringify({ token: '12345', exp: 'asd' } as Login))

			await expect(userStore.login('123', '123')).resolves.toEqual(true)
			expect(userStore.token).toEqual('12345')
			expect(getLS()).toEqual({ token: '12345' })
		})
		it('should fail log in', async () => {
			const err = new Error('')
			fetchMock.mockReject(err)

			await expect(userStore.login('123', '123')).rejects.toBe(err)
			expect(userStore.token).toEqual(undefined)
			expect(getLS().token).toEqual(undefined)
		})
	})

	describe('events', () => {
		it('should correctly fetch events', async () => {
			fetchMock.mockResponseOnce(
				JSON.stringify({
					events: [
						{
							id: 4138,
							name: 'Zebranie z rodzicami klas I, II, III',
							start_at: '2020-01-09T17:54:00+01:00',
							stop_at: '2020-01-09T08:54:00+01:00',
							all_day: true,
							all_klasses: true,
							background_color: '#004080',
							text_color: '#ffffff'
						}
					]
				} as Events)
			)
			userStore.token = '123'

			await expect(userStore.fetchEvents()).resolves.toEqual(true)
			expect(userStore.events).toEqual([
				{
					id: 4138,
					name: 'Zebranie z rodzicami klas I, II, III',
					startAt: '2020-01-09T17:54:00+01:00',
					stopAt: '2020-01-09T08:54:00+01:00',
					allDay: true,
					allClasses: true,
					backgroundColor: '#004080',
					textColor: '#ffffff'
				}
			])
			expect(getLS().events).toEqual([
				{
					id: 4138,
					name: 'Zebranie z rodzicami klas I, II, III',
					startAt: '2020-01-09T17:54:00+01:00',
					stopAt: '2020-01-09T08:54:00+01:00',
					allDay: true,
					allClasses: true,
					backgroundColor: '#004080',
					textColor: '#ffffff'
				}
			])
		})
		it('should fail for some reason', async () => {
			const err = new Error('')
			fetchMock.mockReject(err)
			userStore.token = '123'

			await expect(userStore.fetchEvents()).rejects.toBe(err)
			expect(userStore.events).toEqual(undefined)
			expect(getLS().events).toEqual(undefined)
		})
		it('should fail because of a lacking token', async () => {
			await expect(userStore.fetchEvents()).rejects.toThrowError('token')
			expect(userStore.events).toEqual(undefined)
			expect(getLS().events).toEqual(undefined)
		})
	})

	it('should load from localstorage', () => {
		const data = { token: '123', events: [{ id: 123 }] }
		window.localStorage.setItem('UserStore', JSON.stringify(data))

		const userStore = new UserStore()

		expect(userStore.token).toEqual(data.token)
		expect(userStore.events).toEqual(data.events)
	})
})
