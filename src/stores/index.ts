import { configure } from 'mobx'
import { inject, IStoresToProps } from 'mobx-react'
import { Component } from 'react'
import AuthStore from './AuthStore'

configure({ enforceActions: 'always' })

export const authStore = new AuthStore()

export interface IStores {
	authStore: AuthStore
}

export class ConnectedComponent<I, P = {}, S = {}> extends Component<P, S> {
	public get injects() {
		return (this.props as any) as I
	}
}

export function connect(...storeNames: Array<keyof IStores>): ReturnType<typeof inject>
export function connect<P, C, I>(
	mapStoresToInjected: IStoresToProps<IStores, P, C, I>
): ReturnType<typeof inject>

export function connect(): ReturnType<typeof inject> {
	return inject(...arguments)
}
