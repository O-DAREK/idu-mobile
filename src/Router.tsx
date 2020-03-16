import { BottomAppBar } from 'components'
import * as urls from 'constants/urls'
import Events from 'pages/Events'
import Login from 'pages/Login'
import Messages from 'pages/Messages'
import News from 'pages/News'
import Settings from 'pages/Settings'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'

const Router: React.FC<{ loggedIn: boolean }> = ({ loggedIn }) => (
	<BrowserRouter>
		<LastLocationProvider>
			{loggedIn ? (
				<BottomAppBar>
					<Switch>
						<Route path={urls.internal.settings()} exact>
							<Settings />
						</Route>
						<Route path={urls.internal.events()} exact>
							<Events />
						</Route>
						<Route path={[urls.internal.specificNews(), urls.internal.news()]}>
							<News />
						</Route>
						<Route path={[urls.internal.specificMessage(), urls.internal.messages()]}>
							<Messages />
						</Route>
						<Redirect to={urls.internal.news()} />
					</Switch>
				</BottomAppBar>
			) : (
				<Switch>
					<Route path={urls.internal.login()} exact>
						<Login />
					</Route>
					<Redirect to={urls.internal.login()} />
				</Switch>
			)}
		</LastLocationProvider>
	</BrowserRouter>
)

export default Router
