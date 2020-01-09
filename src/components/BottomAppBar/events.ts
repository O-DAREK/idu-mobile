import Eev from 'eev'

export enum EventNames {
	test = 'test'
}

export type EventTypes = {
	test: [number]
}

export const eev = new Eev()

export const buildListen = <T extends EventNames>(
	eventName: T,
	cb: (...args: EventTypes[T]) => void
) => {
	eev.on(eventName, cb)
	return () => eev.off(eventName, cb)
}
