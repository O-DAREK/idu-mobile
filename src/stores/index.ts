import { configure } from 'mobx'
import { createContext } from 'react'
import { ConfigStore } from './ConfigStore'
import { MessagesStore } from './MessagesStore'
import { MetaStore } from './MetaStore'
import { NewsStore } from './NewsStore'
import { UserStore } from './UserStore'

configure({ enforceActions: 'always' })

export const userStore = createContext(new UserStore())
export const configStore = createContext(new ConfigStore())
// exposed separately so non-React code (e.g. the service worker callback) can reach the store
export const metaStoreInstance = new MetaStore()
export const metaStore = createContext(metaStoreInstance)
export const messagesStore = createContext(new MessagesStore())
export const newsStore = createContext(new NewsStore())
