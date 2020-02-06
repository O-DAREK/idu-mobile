import { Divider, List, ListItem } from '@material-ui/core'
import { TopLoading } from 'components'
import React, { useContext, useEffect } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { messagesStore, userStore } from 'stores'
import useAsync from 'use-async-react'
import ThreadItem, { SkeletonThreadItem } from './ThreadItem'

export const __mockMessages = [
	{
		id: 0,
		avatar: 'https://i.pravatar.cc/150?img=66',
		name: 'Jan Hard',
		title: 'Przelozenie sprawdzianu',
		texts: [
			{
				imSender: true,
				value: 'Czy mozna prosze przelozyc sprawdzian?',
				timestamp: +new Date() - 100000000,
				read: true
			},
			{ imSender: false, value: 'Nie', timestamp: +new Date(), read: true }
		]
	},
	{
		id: 1,
		avatar: 'https://i.pravatar.cc/150?img=4',
		name: 'Piotroniusz Mick',
		title: 'Oddawaj zeszyt',
		texts: [
			{
				imSender: false,
				value: 'To co tytul',
				timestamp: +new Date() - 100000000,
				read: true
			},
			{ imSender: true, value: 'Nie', timestamp: +new Date(), read: true }
		]
	},
	{
		id: 2,
		avatar: 'https://i.pravatar.cc/150?img=6',
		name: 'Ania Kotra',
		title: 'Rozprawka',
		texts: [
			{
				imSender: false,
				value: 'Czemu twoja rozprawka jest czcionka 13 a nie 12?',
				timestamp: +new Date() - 100000000,
				read: false
			}
		]
	}
]

const MessageList = () => {
	const messages = useContext(messagesStore)
	const user = useContext(userStore)
	const { call: fetchNextPage, loading } = useAsync(messages.fetchNextThreads)
	useBottomScrollListener(() => {
		if (user.token) fetchNextPage(user.token)
	})

	useEffect(() => {
		if (user.token) fetchNextPage(user.token)
	}, [fetchNextPage, user.token])

	return (
		<>
			{loading && messages.threads && <TopLoading />}
			<List>
				{loading && !messages.threads && (
					<>
						{new Array(5).fill(null).map((_, i) => (
							<ListItem key={i}>
								<SkeletonThreadItem />
							</ListItem>
						))}
					</>
				)}
				{messages.threads?.map((e, i) => (
					<React.Fragment key={i}>
						<ThreadItem {...e} />
						<Divider />
					</React.Fragment>
				))}
				{!messages.noMoreThreads && (
					<ListItem>
						<SkeletonThreadItem />
					</ListItem>
				)}
			</List>
		</>
	)
}

export default MessageList
