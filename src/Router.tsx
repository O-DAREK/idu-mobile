import { BottomAppBar } from 'components'
import * as urls from 'constants/urls'
import Events from 'pages/Events'
import Login from 'pages/Login'
import Messages from 'pages/Messages'
import News from 'pages/News'
import Settings from 'pages/Settings'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LastLocationProvider } from 'utils/LastLocation'

const Router: React.FC<{ loggedIn: boolean }> = ({ loggedIn }) => (
	<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
		<LastLocationProvider>
			{loggedIn ? (
				<BottomAppBar>
					<Routes>
						<Route path={urls.internal.settings()} element={<Settings />} />
						<Route path={urls.internal.events()} element={<Events />} />
						<Route path={`${urls.internal.news()}/*`} element={<News />} />
						<Route path={`${urls.internal.messages()}/*`} element={<Messages />} />
						<Route path="*" element={<Navigate to={urls.internal.news()} replace />} />
					</Routes>
				</BottomAppBar>
			) : (
				<Routes>
					<Route path={urls.internal.login()} element={<Login />} />
					<Route path="*" element={<Navigate to={urls.internal.login()} replace />} />
				</Routes>
			)}
		</LastLocationProvider>
	</BrowserRouter>
)

export default Router
