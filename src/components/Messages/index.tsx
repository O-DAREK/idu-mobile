import React from 'react'
import { useParams } from 'react-router'
import MessageList from './MessageList'
import SpecificMessage from './SpecificMessage'

interface Params {
	id?: string
}

const Messages = () => {
	const { id } = useParams<Params>()

	return id ? <SpecificMessage id={id} /> : <MessageList />
}

export default Messages
