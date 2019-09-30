import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import Login from 'components/Login'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { muiTheme } from 'styles/theme'

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/login" exact>
				<Login />
			</Route>
			<Redirect to="/login" />
		</Switch>
	</BrowserRouter>
)

const App = () => (
	<MuiThemeProvider theme={muiTheme}>
		<>
			<CssBaseline />
			<Router />
		</>
	</MuiThemeProvider>
)

export default App
