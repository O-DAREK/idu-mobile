import { BottomAppBar } from 'components'
import { internal } from 'constants/urls'
import Events from 'pages/Events'
import Login from 'pages/Login'
import Messages from 'pages/Messages'
import News from 'pages/News'
import Settings from 'pages/Settings'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

const Router: React.FC<{ loggedIn: boolean }> = ({ loggedIn }) => (
	<BrowserRouter>
		{loggedIn ? (
			<BottomAppBar>
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
			</BottomAppBar>
		) : (
			<Switch>
				<Route path={internal.login()} exact>
					<Login />
				</Route>
				<Redirect to={internal.login()} />
			</Switch>
		)}
	</BrowserRouter>
)

export default Router
