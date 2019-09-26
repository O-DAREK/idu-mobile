import { useLocale } from 'locales'
import React from 'react'

const App = () => {
	const { HELLO } = useLocale()

	return (
		<>
			<div>{HELLO}</div>
		</>
	)
}

export default App
