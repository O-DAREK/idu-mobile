import { Divider, List } from '@material-ui/core'
import { Snackbar, TopLoading } from 'components'
import { UNAUTHORIZED } from 'http-status-codes'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { messagesStore, metaStore, userStore } from 'stores'
import useAsync from 'use-async-react'
import ThreadItem, { SkeletonThreadItem } from './ThreadItem'

const MessageList = observer(() => {
	const { ERROR_GENERIC } = useLocale()
	const messages = useContext(messagesStore)
	const user = useContext(userStore)
	const meta = useContext(metaStore)
	const { call: fetchNextThreads, loading, error } = useAsync(messages.fetchNextThreads)

	useEffect(() => {
		if (
			user.token &&
			meta.isOnline &&
			(messages.threads === undefined || messages.threads.length === 0)
		)
			fetchNextThreads(user.token)
	}, [fetchNextThreads, user.token, meta.isOnline, messages])

	useEffect(() => {
		if (error?.status === UNAUTHORIZED) user.logout(true)
	}, [error, user])

	return (
		<>
			{error && <Snackbar variant="error">{ERROR_GENERIC}</Snackbar>}
			{loading && messages.threads && <TopLoading />}
			<List>
				{loading && !messages.threads && (
					<>
						{[...new Array(5)].map((_, i) => (
							<React.Fragment key={i}>
								<SkeletonThreadItem />
								<Divider />
							</React.Fragment>
						))}
					</>
				)}
				<InfiniteScroll
					dataLength={messages.threads?.length || 0}
					hasMore={meta.isOnline && !messages.noMoreThreads}
					loader={<SkeletonThreadItem />}
					next={() => user.token && fetchNextThreads(user.token)}
				>
					{messages.threads?.map((e, i) => (
						<React.Fragment key={i}>
							<ThreadItem {...e} />
							<Divider />
						</React.Fragment>
					))}
				</InfiniteScroll>
			</List>
		</>
	)
})

export default MessageList
