import { action, makeObservable, observable } from 'mobx'

export class MetaStore {
	static localStorageKey = 'MetaStore'

	@observable isOnline: boolean = navigator.onLine
	@observable availableUpdate: boolean = false
	@observable pwaInstallEvent?: BeforeInstallPromptEvent

	constructor() {
		makeObservable(this)
		window.addEventListener('online', this.updateIsOnline)
		window.addEventListener('offline', this.updateIsOnline)
	}

	@action
	private updateIsOnline = () => (this.isOnline = navigator.onLine)

	@action
	theresAnUpdate = () => (this.availableUpdate = true)

	@action
	setPwaInstallEvent = (e: BeforeInstallPromptEvent) => (this.pwaInstallEvent = e)
}
