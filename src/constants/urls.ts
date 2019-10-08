export const api = {
	base: 'https://idu.edu.pl'
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
