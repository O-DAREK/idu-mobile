export const api = {
	base: () => 'http://idutest.dag.pl/api/v2',
	login: () => api.base() + '/auth/login'
}

export const internal = {
	root: () => '/',
	login: () => '/login',
	settings: () => '/settings',
	news: () => '/news',
	specificNews: (id?: string) => `/news/${id || ':id'}`,
	messages: () => '/messages',
	specificMessage: (id?: string) => `/messages/${id || ':id'}`
}
