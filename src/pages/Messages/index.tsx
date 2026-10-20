import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MessageThreads from './MessageThreads'
import NewMessage from './NewMessage'
import SpecificMessage from './SpecificMessages'

// paths are relative to the `/messages/*` route in Router.tsx (see urls.internal.newMessage)
const Messages = () => (
	<Routes>
		<Route path="new" element={<NewMessage />} />
		<Route path=":id" element={<SpecificMessage />} />
		<Route path="*" element={<MessageThreads />} />
	</Routes>
)

export default Messages
