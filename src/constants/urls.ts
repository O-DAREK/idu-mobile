export const api = {
	base: () => 'https://idutest.dag.pl/api/v2',
	login: () => api.base() + '/auth/login',
	profile: () => api.base() + '/user/profile',
	events: () => api.base() + '/user/events',
	messages: (page = 1) => api.base() + `/user/messages?page=${page}`,
	specificMessages: (id: number) => api.base() + `/user/messages/${id}`,
	news: (page = 1) => api.base() + `/user/informations/not_sticky?page=${page}`,
	stickyNews: () => api.base() + '/user/informations/sticky',
	markNewsRead: (id: number) => api.base() + `/user/informations/${id}/read`,
	markNewsConfirmed: (id: number) => api.base() + `/user/informations/${id}/confirm`
}

export const internal = {
	root: () => '/',
	login: () => '/login',
	settings: () => '/settings',
	news: () => '/news',
	specificNews: (id = ':id') => `${internal.news()}/${id}`,
	events: () => '/events',
	messages: () => '/messages',
	specificMessage: (id = ':id') => `${internal.messages()}/${id}`
}
