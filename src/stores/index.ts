import { configure } from 'mobx'
import { createContext } from 'react'
import ConfigStore from './ConfigStore'
import UserStore from './UserStore'

configure({ enforceActions: 'always' })

export const userStore = createContext(new UserStore())
export const configStore = createContext(new ConfigStore())

export interface IStores {
	userStore: UserStore
	configStore: ConfigStore
}
