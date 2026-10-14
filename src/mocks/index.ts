import * as responses from 'constants/responses'
import { sleep } from 'utils'

// Fake API for developing the UI without a backend. Enabled with VITE_MOCK_API=true (see .env.example).
// Replaces window.fetch, so the stores and components run unchanged. State lives in memory only.

const PAGE_SIZE = 10
const LATENCY = 300
const USER_ID = 1
const API_PATH = /\/(auth|user|users|internal_messages)\b/

const base64Url = (obj: object) =>
	btoa(JSON.stringify(obj)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')

const fakeToken = () =>
	[
		base64Url({ alg: 'none', typ: 'JWT' }),
		base64Url({ user_id: USER_ID, exp: Math.floor(Date.now() / 1000) + 86400 }),
		'mock'
	].join('.')

const daysAgo = (days: number, hour = 12) => {
	const d = new Date()
	d.setDate(d.getDate() - days)
	d.setHours(hour, 0, 0, 0)
	return d.toISOString()
}

const me = { id: USER_ID, name: 'Jan Kowalski', avatar: '' }
const teachers = [
	{ id: 2, name: 'Anna Nowak', avatar: '' },
	{ id: 3, name: 'Piotr Wiśniewski', avatar: '' },
	{ id: 4, name: 'Maria Zielińska', avatar: '' }
]

const users: responses.UsersSearch['data'] = [
	{ id: 2, first_name: 'Anna', last_name: 'Nowak', type: 2 },
	{ id: 3, first_name: 'Piotr', last_name: 'Wiśniewski', type: 2 },
	{ id: 4, first_name: 'Maria', last_name: 'Zielińska', type: 2 },
	{ id: 5, first_name: 'Katarzyna', last_name: 'Kowalska', type: 1 },
	{ id: 6, first_name: 'Tomasz', last_name: 'Lewandowski', type: 0 }
]

type Thread = responses.MessageThreads['data'][number]
type Message = responses.SpecificMessages['data'][number]
type News = responses.News['data'][number]

let nextId = 1000

const threads: Thread[] = Array.from({ length: 25 }, (_, i) => ({
	id: i + 1,
	from: i % 4 === 0 ? me : teachers[i % teachers.length],
	title: `Wiadomość ${i + 1}`,
	body: `Treść wiadomości numer ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
	status: (i % 4 === 0 ? 1 : 2) as Thread['status'],
	created_at: daysAgo(i + 1),
	last_message_at: daysAgo(i),
	updated_at: daysAgo(i)
}))

const messages: { [threadId: number]: Message[] } = {}
const messagesOf = (thread: Thread): Message[] =>
	(messages[thread.id] ??= [
		{
			id: thread.id * 10,
			from: thread.from,
			title: thread.title,
			body: thread.body,
			created_at: thread.created_at
		},
		{
			id: thread.id * 10 + 1,
			from: thread.from.id === USER_ID ? teachers[0] : me,
			title: thread.title,
			body: 'Dziękuję za wiadomość, odpowiem wkrótce.',
			created_at: thread.updated_at
		}
	])

const news: News[] = Array.from({ length: 25 }, (_, i) => ({
	id: i + 1,
	title: `Ogłoszenie ${i + 1}`,
	body: `<p>Treść ogłoszenia <b>numer ${i + 1}</b>.</p><p>Lorem ipsum dolor sit amet.</p>`,
	priority: 1,
	edited_at: daysAgo(i),
	start_at: daysAgo(i),
	is_confirmation_required: i % 5 === 0,
	read_at: i > 3 ? daysAgo(i) : null,
	confirmed_at: null
}))

const stickyNews: News[] = [
	{
		id: 500,
		title: 'Ważne: zebranie rodziców',
		body: '<p>Zebranie odbędzie się w przyszły czwartek o 17:00.</p>',
		priority: 2,
		edited_at: daysAgo(1),
		start_at: daysAgo(1),
		is_confirmation_required: true,
		read_at: null,
		confirmed_at: null
	}
]

const events = (): responses.Events['data'] => {
	const at = (dayOffset: number, hour: number, minutes = 0) => {
		const d = new Date()
		d.setDate(d.getDate() + dayOffset)
		d.setHours(hour, minutes, 0, 0)
		return d.toISOString()
	}
	const subjects = ['Matematyka', 'Język polski', 'Fizyka', 'Historia', 'Angielski', 'Biologia']
	const colors = ['#1976d2', '#388e3c', '#f57c00', '#7b1fa2', '#d32f2f', '#0097a7']
	return Array.from({ length: 14 }, (_, i) => {
		const day = Math.floor(i / 2) - 2
		const hour = 8 + (i % 2) * 2
		return {
			id: i + 1,
			name: subjects[i % subjects.length],
			start_at: at(day, hour),
			stop_at: at(day, hour + 1, 30),
			all_day: false,
			all_klasses: false,
			background_color: colors[i % colors.length],
			text_color: '#ffffff'
		}
	})
}

const page = <T>(items: T[], url: URL) => {
	const p = Number(url.searchParams.get('page') || 1)
	return items.slice((p - 1) * PAGE_SIZE, p * PAGE_SIZE)
}

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const field = (body: BodyInit | null | undefined, name: string) =>
	body instanceof FormData ? String(body.get(name) ?? '') : ''

const handle = async (url: URL, init: RequestInit = {}): Promise<Response> => {
	const method = (init.method || 'GET').toUpperCase()
	const path = url.pathname.slice(url.pathname.search(API_PATH))

	if (path === '/auth/login' && method === 'POST') {
		const { password } = JSON.parse(String(init.body))
		if (password === 'wrong') return json({ error: 'Invalid login or password' }, 401)
		return json({ token: fakeToken(), exp: daysAgo(-1) } as responses.Login)
	}

	if (!new Headers(init.headers).get('X-API-TOKEN')) return json({ error: 'Unauthorized' }, 401)

	if (path === '/user/profile') {
		return json({
			data: {
				id: USER_ID,
				first_name: 'Jan',
				last_name: 'Kowalski',
				mobile_phone: '+48 600 000 000',
				role: 'student',
				messages_count: threads.length,
				unread_messages_count: 2,
				unread_informations_count: news.filter(n => !n.read_at).length
			}
		} as responses.Profile)
	}
	if (path === '/user/events') return json({ data: events() } as responses.Events)
	if (path === '/users/search') {
		const q = (url.searchParams.get('q') || '').toLowerCase()
		const data = users.filter(u => `${u.first_name} ${u.last_name}`.toLowerCase().includes(q))
		return json({ data } as responses.UsersSearch)
	}

	if (path === '/user/messages' && method === 'GET') return json({ data: page(threads, url) })
	if (path === '/user/messages' && method === 'POST') {
		const thread = threads.find(t => t.id === Number(field(init.body, 'message[thread_id]')))
		if (!thread) return json({ error: 'Not found' }, 404)
		messagesOf(thread).push({
			id: nextId++,
			from: me,
			title: thread.title,
			body: field(init.body, 'message[body]'),
			created_at: new Date().toISOString()
		})
		thread.updated_at = new Date().toISOString()
		return json({})
	}
	if (path === '/internal_messages' && method === 'POST') {
		const receiver = Number(field(init.body, 'message[receiver_ids]').split(',')[0])
		threads.unshift({
			id: nextId++,
			from: teachers.find(t => t.id === receiver) || me,
			title: field(init.body, 'message[title]'),
			body: field(init.body, 'message[body]'),
			status: 1,
			created_at: new Date().toISOString(),
			last_message_at: null,
			updated_at: new Date().toISOString()
		})
		return json({})
	}
	const specific = path.match(/^\/user\/messages\/(\d+)$/)
	if (specific) {
		const thread = threads.find(t => t.id === Number(specific[1]))
		return thread ? json({ data: messagesOf(thread) }) : json({ error: 'Not found' }, 404)
	}

	if (path === '/user/informations/not_sticky') return json({ data: page(news, url) })
	if (path === '/user/informations/sticky') return json({ data: stickyNews })
	const mark = path.match(/^\/user\/informations\/(\d+)\/(read|confirm)$/)
	if (mark && method === 'POST') {
		const item = [...news, ...stickyNews].find(n => n.id === Number(mark[1]))
		if (!item) return json({ error: 'Not found' }, 404)
		if (mark[2] === 'read') item.read_at = new Date().toISOString()
		else item.confirmed_at = new Date().toISOString()
		return json({})
	}

	return json({ error: `No mock for ${method} ${path}` }, 404)
}

export const installMockApi = () => {
	const realFetch = window.fetch.bind(window)
	window.fetch = async (input, init) => {
		const raw = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
		// the API root is not configured in mock mode, so urls look like "undefined/auth/login"
		if (!API_PATH.test(raw)) return realFetch(input, init)
		await sleep(LATENCY)
		return handle(new URL(raw, window.location.origin), init)
	}
	console.info('[mock api] enabled, any login works (password "wrong" fails)')
}
