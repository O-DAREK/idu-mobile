import React from 'react'
import { useParams } from 'react-router'
import MessageThreads from './MessageThreads'
import SpecificMessage from './SpecificMessages'

interface Params {
	id?: string
}

const Messages = () => {
	const { id } = useParams<Params>()

	return id ? <SpecificMessage id={Number(id)} /> : <MessageThreads />
}

export default Messages
