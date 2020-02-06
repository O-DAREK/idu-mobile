import { Roles } from './interfaces'

export type Login = {
	token: string
	exp: string
}

export type Profile = {
	profile: {
		id: number
		first_name: string
		last_name: string
		mobile_phone: string
		role: keyof typeof Roles
		messages_count: number
		unread_messages_count: number
	}
}

export type Events = {
	events: {
		id: number
		name: string
		start_at: string
		stop_at: string
		all_day: boolean
		all_klasses: boolean
		background_color: string
		text_color: string
	}[]
}

export type MessageThreads = {
	messages: {
		id: number
		from: {
			id: number
			name: string
		}
		title: string
		body: string
		status: 1 | 2 | 3
		created_at: string
		last_message_at?: string
		updated_at: string
	}[]
}
