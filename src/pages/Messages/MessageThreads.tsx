import { Divider, List } from '@material-ui/core'
import { TopLoading } from 'components'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { messagesStore, metaStore, userStore } from 'stores'
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

const MessageList = observer(() => {
	const messages = useContext(messagesStore)
	const user = useContext(userStore)
	const meta = useContext(metaStore)
	const { call: fetchNextPage, loading } = useAsync(messages.fetchNextThreads)
	useBottomScrollListener(() => {
		if (user.token && meta.isOnline) fetchNextPage(user.token)
	}, 100)

	useEffect(() => {
		if (user.token && meta.isOnline) fetchNextPage(user.token)
	}, [fetchNextPage, user.token, meta.isOnline])

	return (
		<>
			{loading && messages.threads && <TopLoading />}
			<List>
				{loading && !messages.threads && (
					<>
						{new Array(5).fill(null).map((_, i) => (
							<React.Fragment key={i}>
								<SkeletonThreadItem />
								<Divider />
							</React.Fragment>
						))}
					</>
				)}
				{messages.threads?.map((e, i) => (
					<React.Fragment key={i}>
						<ThreadItem {...e} />
						<Divider />
					</React.Fragment>
				))}
				{meta.isOnline && !messages.noMoreThreads && <SkeletonThreadItem />}
			</List>
		</>
	)
})

export default MessageList
