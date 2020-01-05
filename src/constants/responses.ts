export type Login = {
	token: string
	exp: string
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
