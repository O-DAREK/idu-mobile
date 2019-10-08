import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles'
import Login from 'components/Login'
import Messages from 'components/Messages'
import News from 'components/News'
import Settings from 'components/Settings'
import { internal } from 'constants/urls'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { configStore } from 'stores'
import { muiTheme } from 'styles/theme'
import { setVisibleHeight } from 'visible-height-css'

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path={internal.login()} exact>
				<Login />
			</Route>
			<Route path={internal.settings()} exact>
				<Settings />
			</Route>
			<Route path={[internal.specificNews(), internal.news()]}>
				<News />
			</Route>
			<Route path={[internal.specificMessage(), internal.messages()]}>
				<Messages />
			</Route>
			<Redirect to={internal.login()} />
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
