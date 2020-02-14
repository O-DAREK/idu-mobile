import * as responses from 'constants/responses'
import { MessagesStore } from 'stores/MessagesStore'

describe('messages store', () => {
	let messagesStore: MessagesStore
	beforeEach(() => {
		messagesStore = new MessagesStore()
		fetchMock.resetMocks()
	})
	afterEach(() => window.localStorage.removeItem(MessagesStore.name))

	const getLS = (dflt = '{}') => JSON.parse(window.localStorage.getItem(MessagesStore.name) || dflt)

	it('should have defaults', () => {
		expect(messagesStore.threads).toBe(undefined)
		expect(messagesStore.messages).toEqual({})
		expect(messagesStore.page).toBe(1)
		expect(messagesStore.noMoreThreads).toBe(false)
	})

	it('should have defaults saved to localstorage', () => {
		expect(getLS('{"not": "empty"}')).toEqual({ messages: {} })
	})

	describe('fetch threads', () => {
		it('should correctly fetch', async () => {
			const data = [
				{
					id: 123,
					to: {
						id: 321,
						name: 'aaa'
					},
					title: 'yes',
					body: 'hello',
					sentAt: new Date(new Date().toString())
				}
			]

			fetchMock.mockResponseOnce(
				JSON.stringify({
					messages: [
						{
							id: 123,
							from: {
								id: 321,
								name: 'aaa'
							},
							title: 'yes',
							body: 'hello',
							status: 1,
							created_at: data[0].sentAt.toString(),
							last_message_at: new Date().toString(),
							updated_at: new Date().toString()
						}
					]
				} as responses.MessageThreads)
			)

			await expect(messagesStore.fetchNextThreads('123')).resolves.toEqual(data)
			expect(messagesStore.threads).toEqual(data)
			expect(getLS().threads).toEqual(undefined)
		})
		it('should correctly append newly fetched data', async () => {
			const data = new Array(11)
				.fill({
					id: 123,
					to: {
						id: 321,
						name: 'aaa'
					},
					title: 'yes',
					body: 'hello',
					sentAt: new Date(new Date().toString())
				})
				.map((e, i) => ({ ...e, id: e.id + i }))

			fetchMock.mockResponseOnce(
				JSON.stringify({
					messages: new Array(10)
						.fill({
							id: 123,
							from: {
								id: 321,
								name: 'aaa'
							},
							title: 'yes',
							body: 'hello',
							status: 1,
							created_at: data[0].sentAt.toString(),
							last_message_at: new Date().toString(),
							updated_at: new Date().toString()
						})
						.map((e, i) => ({ ...e, id: e.id + i }))
				} as responses.MessageThreads)
			)

			await expect(messagesStore.fetchNextThreads('123')).resolves.toEqual(
				data.slice(0, data.length - 1)
			)
			expect(messagesStore.noMoreThreads).toBe(false)
			expect(messagesStore.page).toEqual(2)

			fetchMock.mockResponseOnce(
				JSON.stringify({
					messages: [
						{
							id: 133,
							from: {
								id: 321,
								name: 'aaa'
							},
							title: 'yes',
							body: 'hello',
							status: 1,
							created_at: data[0].sentAt.toString(),
							last_message_at: new Date().toString(),
							updated_at: new Date().toString()
						}
					]
				} as responses.MessageThreads)
			)
			await expect(messagesStore.fetchNextThreads('123')).resolves.toEqual(data)
			expect(messagesStore.threads).toEqual(data)
			expect(messagesStore.noMoreThreads).toBe(true)
			expect(getLS().threads).toEqual(undefined)
		})
		it('should fail for some reason', async () => {
			const err = new Error('')
			fetchMock.mockReject(err)

			await expect(messagesStore.fetchNextThreads('123')).rejects.toBe(err)
			expect(messagesStore.threads).toEqual(undefined)
			expect(getLS().threads).toEqual(undefined)
		})
	})

	describe('fetch specific messages', () => {
		const tokenWithUserId123 =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsImlhdCI6MTUxNjIzOTAyMn0.UD1nLDYSdO3TD6XwtsQ0UWi9cmuwJT-IBgC0d3_lGio'

		it('should correctly fetch', async () => {
			const data = {
				123: {
					id: 123,
					title: 'hello',
					messages: [
						{
							id: 999,
							to: {
								id: 123,
								name: 'aaa'
							},
							body: 'hello',
							sentAt: new Date(new Date().toString())
						}
					]
				}
			}

			fetchMock.mockResponseOnce(
				JSON.stringify({
					messages: [
						{
							title: 'hello',
							id: 999,
							from: {
								id: 123,
								name: 'aaa'
							},
							body: 'hello',
							created_at: data[123].messages[0].sentAt.toString()
						}
					]
				} as responses.SpecificMessages)
			)

			await expect(messagesStore.fetchSpecificMessages(tokenWithUserId123, 123)).resolves.toEqual(
				data[123]
			)
			expect(messagesStore.messages).toEqual(data)
			expect(getLS().messages).toEqual({
				123: {
					...data[123],
					messages: data[123].messages.map(e => ({
						...e,
						sentAt: JSON.parse(JSON.stringify(e.sentAt))
					}))
				}
			})
		})
		it('should fail for some reason', async () => {
			const err = new Error('')
			fetchMock.mockReject(err)

			await expect(messagesStore.fetchSpecificMessages(tokenWithUserId123, 123)).rejects.toBe(err)
			expect(messagesStore.messages).toEqual({})
			expect(getLS().messages).toEqual({})
		})
	})

	it('should load from localstorage', () => {
		const data = {
			messages: { 123: { messages: [{ sentAt: new Date() }] } },
			threads: [{ sentAt: new Date() }]
		}
		window.localStorage.setItem(MessagesStore.name, JSON.stringify(data))

		const messagesStore = new MessagesStore()

		expect(messagesStore.messages).toEqual(data.messages)
		expect(messagesStore.threads).toEqual(data.threads)
		expect(messagesStore.page).toEqual(1)
		expect(messagesStore.noMoreThreads).toEqual(true)
	})
})
