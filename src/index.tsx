import App from 'App'
import React from 'react'
import ReactDOM from 'react-dom'
import { metaStore } from 'stores'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register({
	onUpdate(registration) {
		// hacky way to access the context
		// Nothing will be actually rendered
		ReactDOM.render(
			<metaStore.Consumer>{s => <>{s.theresAnUpdate()}</>}</metaStore.Consumer>,
			document.createElement('noop')
		)
		// inform workbox to skip waiting, update will be applied after a refresh
		registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
	}
})
