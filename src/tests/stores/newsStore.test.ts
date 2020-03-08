import * as responses from 'constants/responses'
import { runInAction } from 'mobx'
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
					read: false,
					requiresConfirmation: false
				}
			]

			fetchMock.mockResponseOnce(
				JSON.stringify({
					data: [
						{
							id: 123,
							title: 'yes',
							body: 'hello',
							start_at: data[0].date.toString(),
							read_at: null,
							is_confirmation_required: true,
							confirmed_at: 'somedate'
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
					read: true,
					date: new Date(new Date().toString()),
					requiresConfirmation: true
				})
				.map((e, i) => ({ ...e, id: e.id + i }))

			fetchMock.mockResponseOnce(
				JSON.stringify({
					data: new Array(10)
						.fill({
							id: 123,
							title: 'yes',
							body: 'hello',
							start_at: data[0].date.toString(),
							read_at: new Date().toString(),
							is_confirmation_required: true
						})
						.map((e, i) => ({ ...e, id: e.id + i }))
				} as responses.News)
			)

			await expect(newsStore.fetchNextNews('123')).resolves.toEqual(data.slice(0, data.length - 1))
			expect(newsStore.noMoreNews).toBe(false)
			expect(newsStore.page).toEqual(2)

			fetchMock.mockResponseOnce(
				JSON.stringify({
					data: [
						{
							id: 133,
							title: 'yes',
							body: 'hello',
							start_at: data[0].date.toString(),
							read_at: new Date().toString(),
							is_confirmation_required: true
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
					read: false,
					requiresConfirmation: false
				}
			]

			fetchMock.mockResponseOnce(
				JSON.stringify({
					data: [
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

	describe('mark as read', () => {
		const genData = () => [
			{
				body: '123',
				requiresConfirmation: false,
				date: new Date(1e12),
				id: 123,
				read: false,
				title: 'something'
			}
		]

		it('mark news', async () => {
			runInAction(() => {
				newsStore.news = genData()
			})

			fetchMock.mockResponseOnce('')

			await expect(newsStore.markAsRead('123', 123)).resolves.toEqual({
				...genData()[0],
				read: true
			})
			expect(newsStore.news).toEqual([
				{
					...genData()[0],
					read: true
				}
			])
		})
		it('mark stickyNews', async () => {
			runInAction(() => {
				newsStore.stickyNews = genData()
			})

			fetchMock.mockResponseOnce('')

			await expect(newsStore.markAsRead('123', 123)).resolves.toEqual({
				...genData()[0],
				read: true
			})
			expect(newsStore.stickyNews).toEqual([
				{
					...genData()[0],
					read: true
				}
			])
		})
		it('not existing news', async () => {
			runInAction(() => {
				newsStore.news = genData()
			})

			fetchMock.mockResponseOnce('')

			await expect(newsStore.markAsRead('123', 999)).rejects.toThrowError('No such news')
			expect(newsStore.news).toEqual(genData())
		})
		it('fail to mark', async () => {
			runInAction(() => {
				newsStore.news = genData()
			})
			const err = new Error('')
			fetchMock.mockReject(err)

			await expect(newsStore.markAsRead('123', 123)).rejects.toBe(err)
			expect(newsStore.news).toEqual(genData())
		})
	})

	describe('mark as confirmed', () => {
		const genData = () => [
			{
				body: '123',
				requiresConfirmation: true,
				date: new Date(1e12),
				id: 123,
				read: false,
				title: 'something'
			}
		]

		it('mark news', async () => {
			runInAction(() => {
				newsStore.news = genData()
			})

			fetchMock.mockResponseOnce('')

			await expect(newsStore.markAsConfirmed('123', 123)).resolves.toEqual({
				...genData()[0],
				requiresConfirmation: false
			})
			expect(newsStore.news).toEqual([
				{
					...genData()[0],
					requiresConfirmation: false
				}
			])
		})
		it('mark stickyNews', async () => {
			runInAction(() => {
				newsStore.stickyNews = genData()
			})

			fetchMock.mockResponseOnce('')

			await expect(newsStore.markAsConfirmed('123', 123)).resolves.toEqual({
				...genData()[0],
				requiresConfirmation: false
			})
			expect(newsStore.stickyNews).toEqual([
				{
					...genData()[0],
					requiresConfirmation: false
				}
			])
		})
		it('not existing news', async () => {
			runInAction(() => {
				newsStore.news = genData()
			})

			fetchMock.mockResponseOnce('')

			await expect(newsStore.markAsConfirmed('123', 999)).rejects.toThrowError('No such news')
			expect(newsStore.news).toEqual(genData())
		})
		it('fail to mark', async () => {
			runInAction(() => {
				newsStore.news = genData()
			})
			const err = new Error('')
			fetchMock.mockReject(err)

			await expect(newsStore.markAsConfirmed('123', 123)).rejects.toBe(err)
			expect(newsStore.news).toEqual(genData())
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
