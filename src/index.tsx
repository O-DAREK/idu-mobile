import { Provider as StoreProvider } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'
import * as stores from 'stores'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	<StoreProvider {...stores}>
		<App />
	</StoreProvider>,
	document.getElementById('root')
)

serviceWorker.unregister()
