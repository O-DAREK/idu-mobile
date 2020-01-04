import { Login } from 'constants/responses'
import AuthStore from 'stores/AuthStore'

describe('config store', () => {
	let authStore: AuthStore
	beforeEach(() => {
		authStore = new AuthStore()
		fetchMock.resetMocks()
	})

	afterEach(() => window.localStorage.removeItem('token'))

	it('should have defaults', () => {
		expect(authStore.token).toBe(null)
	})

	it('should have defaults saved to localstorage', () => {
		expect(window.localStorage.getItem('token')).toEqual(null)
	})

	describe('login', () => {
		it('should correctly log in and store the token in localStorage', async () => {
			fetchMock.mockResponseOnce(JSON.stringify({ token: '12345', exp: 'asd' } as Login))

			await expect(authStore.login('123', '123')).resolves.toEqual(true)
			expect(authStore.token).toEqual('12345')
			expect(window.localStorage.getItem('token')).toEqual('12345')
		})
		it('should fail log in', async () => {
			const err = new Error('')
			fetchMock.mockReject(err)

			await expect(authStore.login('123', '123')).rejects.toBe(err)
			expect(authStore.token).toEqual(null)
			expect(window.localStorage.getItem('token')).toEqual(null)
		})
	})

	it('should load from localstorage', () => {
		window.localStorage.setItem('token', 'asd')

		const authStore = new AuthStore()

		expect(authStore.token).toBe('asd')
	})
})
