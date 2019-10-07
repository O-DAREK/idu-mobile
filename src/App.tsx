import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles'
import Index from 'components/Index'
import Login from 'components/Login'
import News from 'components/News'
import Root from 'components/Root'
import Settings from 'components/Settings'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { configStore } from 'stores'
import { muiTheme } from 'styles/theme'
import { setVisibleHeight } from 'visible-height-css'

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact>
				<Root />
			</Route>
			<Route path="/login" exact>
				<Login />
			</Route>
			<Route path="/settings" exact>
				<Settings />
			</Route>
			<Route path="/news/:id">
				<News />
			</Route>
			<Redirect to="/" />
		</Switch>
	</BrowserRouter>
)

const App = observer(() => {
	const config = useContext(configStore)

	useEffect(() => {
		setVisibleHeight()
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
