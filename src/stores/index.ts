import { configure } from 'mobx'
import { createContext } from 'react'
import ConfigStore from './ConfigStore'
import MessagesStore from './MessagesStore'
import MetaStore from './MetaStore'
import UserStore from './UserStore'

configure({ enforceActions: 'always' })

export const userStore = createContext(new UserStore())
export const configStore = createContext(new ConfigStore())
export const metaStore = createContext(new MetaStore())
export const messagesStore = createContext(new MessagesStore())
