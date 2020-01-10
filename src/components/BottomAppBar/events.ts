import Eev from 'eev'

export enum EventNames {
	EVENTS_CALENDAR = 'EVENTS_CALENDAR'
}

export type EventTypes = {
	EVENTS_CALENDAR: never
}

export const eev = new Eev()

export const buildListen = <T extends EventNames>(
	eventName: T,
	cb: (arg: EventTypes[T]) => void
) => {
	eev.on(eventName, cb)
	return () => eev.off(eventName, cb)
}
