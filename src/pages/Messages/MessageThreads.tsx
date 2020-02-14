import { Divider, List } from '@material-ui/core'
import { TopLoading } from 'components'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { messagesStore, metaStore, userStore } from 'stores'
import useAsync from 'use-async-react'
import ThreadItem, { SkeletonThreadItem } from './ThreadItem'

const MessageList = observer(() => {
	const messages = useContext(messagesStore)
	const user = useContext(userStore)
	const meta = useContext(metaStore)
	const { call: fetchNextPage, loading, error } = useAsync(messages.fetchNextThreads)
	useBottomScrollListener(() => {
		if (user.token && meta.isOnline) fetchNextPage(user.token)
	}, 100)

	useEffect(() => {
		if (user.token && meta.isOnline) fetchNextPage(user.token)
	}, [fetchNextPage, user.token, meta.isOnline])

	useEffect(() => {
		if (error) user.logout(true)
	}, [error])

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
