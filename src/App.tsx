import { Progress } from 'consts/interfaces'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { authStore } from 'stores'

const App = observer(() => {
	const store = useContext(authStore)

	return (
		<>
			<button onClick={store.c}>change</button>
			<div>status: {Progress[store.initialProgress]}</div>
		</>
	)
})

export default App
