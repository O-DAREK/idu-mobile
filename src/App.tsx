import { Progress } from 'consts/interfaces'
import { observer } from 'mobx-react'
import React from 'react'
import { connect, ConnectedComponent, IStores } from 'stores'

interface Injects {
	authStore: IStores['authStore']
}

@connect('authStore')
@observer
class App extends ConnectedComponent<Injects> {
	render() {
		console.log('render app')
		return (
			<>
				<button onClick={this.injects.authStore.c}>change</button>
				<div>status: {Progress[this.injects.authStore.initialProgress]}</div>
			</>
		)
	}
}

export default App
