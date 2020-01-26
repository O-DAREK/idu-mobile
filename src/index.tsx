import App from 'App'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register({
	onUpdate(registration) {
		registration.update()
		// // hacky way to access the context
		// // Nothing will be actually rendered
		// ReactDOM.render(
		// 	<metaStore.Consumer>{s => <>{s.theresAnUpdate()}</>}</metaStore.Consumer>,
		// 	document.createElement('noop')
		// )
	}
})
