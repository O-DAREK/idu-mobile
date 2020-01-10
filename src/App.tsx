import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles'
import { BottomAppBar } from 'components'
import { internal } from 'constants/urls'
import { observer } from 'mobx-react-lite'
import Events from 'pages/Events'
import Login from 'pages/Login'
import Messages from 'pages/Messages'
import News from 'pages/News'
import Settings from 'pages/Settings'
import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { configStore, userStore } from 'stores'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { muiTheme } from 'styles/theme'
import { ToastContainer } from 'utils/toast'
import { setVisibleHeight } from 'visible-height-css'

const GlobalStyles = createGlobalStyle`
	body, #root {
		height: calc(100 * var(--visible-height, 1vh));
	}
`

const Router: React.FC<{ loggedIn: boolean }> = ({ loggedIn }) => (
	<BrowserRouter>
		<BottomAppBar>
			{loggedIn ? (
				<Switch>
					<Route path={internal.settings()} exact>
						<Settings />
					</Route>
					<Route path={internal.events()} exact>
						<Events />
					</Route>
					<Route path={[internal.specificNews(), internal.news()]}>
						<News />
					</Route>
					<Route path={[internal.specificMessage(), internal.messages()]}>
						<Messages />
					</Route>
					<Redirect to={internal.news()} />
				</Switch>
			) : (
				<Switch>
					<Route path={internal.login()} exact>
						<Login />
					</Route>
					<Redirect to={internal.login()} />
				</Switch>
			)}
		</BottomAppBar>
	</BrowserRouter>
)

const App = observer(() => {
	const user = useContext(userStore)
	const config = useContext(configStore)
	const theme = muiTheme(config.theme)
	useEffect(() => {
		setVisibleHeight()
	}, [])

	return (
		<StylesProvider injectFirst>
			<ThemeProvider theme={theme}>
				<MuiThemeProvider theme={theme}>
					<>
						<ToastContainer />
						<CssBaseline />
						<GlobalStyles />
						<Router loggedIn={user.isLoggedIn} />
					</>
				</MuiThemeProvider>
			</ThemeProvider>
		</StylesProvider>
	)
})

export default App
