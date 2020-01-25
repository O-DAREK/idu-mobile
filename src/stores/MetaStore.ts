import { action, observable } from 'mobx'

export default class {
	@observable isOnline: boolean = navigator.onLine
	@observable availableUpdate: boolean = false

	constructor() {
		window.addEventListener('online', this.updateIsOnline)
		window.addEventListener('offline', this.updateIsOnline)
	}

	@action
	private updateIsOnline = () => (this.isOnline = navigator.onLine)

	@action
	theresAnUpdate = () => (this.availableUpdate = true)
}
