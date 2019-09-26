import { configure } from 'mobx'
import { createContext } from 'react'
import AuthStore from './AuthStore'

configure({ enforceActions: 'always' })

export const authStore = createContext(new AuthStore())

export interface IStores {
	authStore: AuthStore
}
