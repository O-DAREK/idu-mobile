export const api = {
	base: () => 'http://idutest.dag.pl/api/v2',
	login: () => api.base() + '/auth/login',
	profile: () => api.base() + '/user/profile',
	events: () => api.base() + '/user/events'
}

export const internal = {
	root: () => '/',
	login: () => '/login',
	settings: () => '/settings',
	news: () => '/news',
	specificNews: (id?: string) => `${internal.news()}/${id || ':id'}`,
	events: () => '/events',
	messages: () => '/messages',
	specificMessage: (id?: string) => `${internal.messages()}/${id || ':id'}`
}
