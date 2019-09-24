import { Progress } from 'consts/interfaces'
import { action, observable } from 'mobx'

export default class {
	@observable initialProgress: Progress = Progress.pending

	@action c = () =>
		(this.initialProgress =
			this.initialProgress === Progress.pending ? Progress.fulfilled : Progress.pending)
}
