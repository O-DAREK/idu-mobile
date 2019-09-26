import { configure } from 'mobx'
import { createContext } from 'react'
import AuthStore from './AuthStore'
import ConfigStore from './ConfigStore'

configure({ enforceActions: 'always' })

export const authStore = createContext(new AuthStore())
export const configStore = createContext(new ConfigStore())

export interface IStores {
	authStore: AuthStore
	configStore: ConfigStore
}
