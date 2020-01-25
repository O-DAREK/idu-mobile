import Eev from 'eev'

const eev = new Eev()

export enum EventNames {
	EVENTS_CALENDAR = 'EVENTS_CALENDAR',
	SETTINGS_RESTORE = 'SETTINGS_RESTORE'
}

export type EventTypes = {
	EVENTS_CALENDAR: never
	SETTINGS_RESTORE: never
}

type WithNever = {
	[K in keyof EventTypes]: EventTypes[K] extends never ? K : never
}[keyof EventTypes]
type WithoutNever = {
	[K in keyof EventTypes]: EventTypes[K] extends never ? never : K
}[keyof EventTypes]
export function emit<T extends WithoutNever>(eventName: T, data: EventTypes[T]): void
export function emit<T extends WithNever>(eventName: T): void
export function emit<T extends EventNames>(eventName: T, data?: EventTypes[T]) {
	eev.emit(eventName, data)
}

export const buildListen = <T extends EventNames>(
	eventName: T,
	cb: (data: EventTypes[T]) => void
) => {
	eev.on(eventName, cb)
	return () => eev.off(eventName, cb)
}
