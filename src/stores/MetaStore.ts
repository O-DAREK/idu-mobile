import { action, makeObservable, observable } from 'mobx'

export class MetaStore {
	static localStorageKey = 'MetaStore'

	isOnline: boolean = navigator.onLine
	availableUpdate: boolean = false
	pwaInstallEvent?: BeforeInstallPromptEvent

	constructor() {
		makeObservable<MetaStore, 'updateIsOnline'>(this, {
			isOnline: observable,
			availableUpdate: observable,
			pwaInstallEvent: observable,
			updateIsOnline: action,
			theresAnUpdate: action,
			setPwaInstallEvent: action
		})
		window.addEventListener('online', this.updateIsOnline)
		window.addEventListener('offline', this.updateIsOnline)
	}

	private updateIsOnline = () => (this.isOnline = navigator.onLine)

	theresAnUpdate = () => (this.availableUpdate = true)

	setPwaInstallEvent = (e: BeforeInstallPromptEvent) => (this.pwaInstallEvent = e)
}
