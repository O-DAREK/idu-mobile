import * as urls from 'constants/urls'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MessageThreads from './MessageThreads'
import SpecificMessage from './SpecificMessages'

const Messages = () => (
	<Switch>
		<Route path={urls.internal.specificMessage()}>
			<SpecificMessage />
		</Route>
		<Route path={urls.internal.messages()}>
			<MessageThreads />
		</Route>
	</Switch>
)

export default Messages
