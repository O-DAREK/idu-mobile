import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles'
import Login from 'components/Login'
import Settings from 'components/Settings'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { configStore } from 'stores'
import { muiTheme } from 'styles/theme'

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/login" exact>
				<Login />
			</Route>
			<Route path="/settings" exact>
				<Settings />
			</Route>
		</Switch>
	</BrowserRouter>
)

const App = observer(() => {
	const config = useContext(configStore)

	useEffect(() => {
		const setVisibleHeight = () =>
			document.documentElement.style.setProperty(
				'--visible-height',
				`${window.innerHeight / 100}px`
			)
		setVisibleHeight()
		window.addEventListener('resize', setVisibleHeight)
	}, [])

	return (
		<StylesProvider injectFirst>
			<MuiThemeProvider theme={muiTheme(config.theme)}>
				<>
					<CssBaseline />
					<Router />
				</>
			</MuiThemeProvider>
		</StylesProvider>
	)
})

export default App
