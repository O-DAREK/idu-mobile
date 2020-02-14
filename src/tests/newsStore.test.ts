import * as responses from 'constants/responses'
import { NewsStore } from 'stores/NewsStore'

describe('messages store', () => {
	let newsStore: NewsStore
	beforeEach(() => {
		newsStore = new NewsStore()
		fetchMock.resetMocks()
	})
	afterEach(() => window.localStorage.removeItem(NewsStore.name))

	const getLS = (dflt = '{}') => JSON.parse(window.localStorage.getItem(NewsStore.name) || dflt)

	it('should have defaults', () => {
		expect(newsStore.news).toBe(undefined)
		expect(newsStore.stickyNews).toEqual(undefined)
		expect(newsStore.page).toBe(1)
		expect(newsStore.noMoreNews).toBe(false)
	})

	it('should have defaults saved to localstorage', () => {
		expect(getLS('{"not": "empty"}')).toEqual({})
	})

	describe('fetch news', () => {
		it('should correctly fetch', async () => {
			const data = [
				{
					id: 123,
					title: 'yes',
					body: 'hello',
					date: new Date(new Date().toString()),
					confirmationRequired: false
				}
			]

			fetchMock.mockResponseOnce(
				JSON.stringify({
					informations: [
						{
							id: 123,
							title: 'yes',
							body: 'hello',
							start_at: data[0].date.toString(),
							is_confirmation_required: false
						}
					]
				} as responses.News)
			)

			await expect(newsStore.fetchNextNews('123')).resolves.toEqual(data)
			expect(newsStore.news).toEqual(data)
			expect(getLS().news).toEqual(undefined)
		})
		it('should correctly append newly fetched data', async () => {
			const data = new Array(11)
				.fill({
					id: 123,
					title: 'yes',
					body: 'hello',
					date: new Date(new Date().toString()),
					confirmationRequired: false
				})
				.map((e, i) => ({ ...e, id: e.id + i }))

			fetchMock.mockResponseOnce(
				JSON.stringify({
					informations: new Array(10)
						.fill({
							id: 123,
							title: 'yes',
							body: 'hello',
							start_at: data[0].date.toString(),
							is_confirmation_required: false
						})
						.map((e, i) => ({ ...e, id: e.id + i }))
				} as responses.News)
			)

			await expect(newsStore.fetchNextNews('123')).resolves.toEqual(data.slice(0, data.length - 1))
			expect(newsStore.noMoreNews).toBe(false)
			expect(newsStore.page).toEqual(2)

			fetchMock.mockResponseOnce(
				JSON.stringify({
					informations: [
						{
							id: 133,
							title: 'yes',
							body: 'hello',
							start_at: data[0].date.toString(),
							is_confirmation_required: false
						}
					]
				} as responses.News)
			)
			await expect(newsStore.fetchNextNews('123')).resolves.toEqual(data)
			expect(newsStore.news).toEqual(data)
			expect(newsStore.noMoreNews).toBe(true)
			expect(getLS().news).toEqual(undefined)
		})
		it('should fail for some reason', async () => {
			const err = new Error('')
			fetchMock.mockReject(err)

			await expect(newsStore.fetchNextNews('123')).rejects.toBe(err)
			expect(newsStore.news).toEqual(undefined)
			expect(getLS().news).toEqual(undefined)
		})
	})

	describe('fetch sticky news', () => {
		it('should correctly fetch', async () => {
			const data = [
				{
					id: 123,
					title: 'yes',
					body: 'hello',
					date: new Date(new Date().toString()),
					confirmationRequired: false
				}
			]

			fetchMock.mockResponseOnce(
				JSON.stringify({
					informations: [
						{
							id: 123,
							title: 'yes',
							body: 'hello',
							start_at: data[0].date.toString(),
							is_confirmation_required: false
						}
					]
				} as responses.News)
			)

			await expect(newsStore.fetchStickyNews('123')).resolves.toEqual(data)
			expect(newsStore.stickyNews).toEqual(data)
			expect(getLS().stickyNews).toEqual(
				data.map(e => ({ ...e, date: JSON.parse(JSON.stringify(e.date)) }))
			)
		})
		it('should fail for some reason', async () => {
			const err = new Error('')
			fetchMock.mockReject(err)

			await expect(newsStore.fetchStickyNews('123')).rejects.toBe(err)
			expect(newsStore.stickyNews).toEqual(undefined)
			expect(getLS().stickyNews).toEqual(undefined)
		})
	})

	it('should load from localstorage', () => {
		const data = {
			news: [{ date: new Date() }],
			stickyNews: [{ date: new Date() }]
		}
		window.localStorage.setItem(NewsStore.name, JSON.stringify(data))

		const newsStore = new NewsStore()

		expect(newsStore.news).toEqual(data.news)
		expect(newsStore.stickyNews).toEqual(data.stickyNews)
		expect(newsStore.page).toEqual(1)
		expect(newsStore.noMoreNews).toEqual(true)
	})
})
