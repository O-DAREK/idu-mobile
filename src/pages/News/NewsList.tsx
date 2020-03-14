import { Divider, List } from '@material-ui/core'
import { Snackbar, TopLoading } from 'components'
import { UNAUTHORIZED } from 'http-status-codes'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { metaStore, newsStore, userStore } from 'stores'
import useAsync from 'use-async-react'
import NewsItem, { SkeletonNewsItem } from './NewsItem'
import PromptConfirmations from './PromptConfirmations'
import StickyNews from './StickyNews'

const NewsList: React.FC = observer(() => {
	const { ERROR_GENERIC } = useLocale()
	const user = useContext(userStore)
	const meta = useContext(metaStore)
	const news = useContext(newsStore)
	const { call: fetchNextNews, loading, error } = useAsync(news.fetchNextNews)

	useEffect(() => {
		if (user.token && meta.isOnline) fetchNextNews(user.token)
	}, [meta.isOnline, fetchNextNews, user])

	useEffect(() => {
		if (error?.status === UNAUTHORIZED) user.logout(true)
	}, [error, user])

	return (
		<>
			{error && <Snackbar variant="error">{ERROR_GENERIC}</Snackbar>}
			{loading && news.news && <TopLoading />}
			<StickyNews />
			<PromptConfirmations news={news.news || []} />
			<List>
				{loading && !news.news && (
					<>
						{[...new Array(5)].map((_, i) => (
							<React.Fragment key={i}>
								<SkeletonNewsItem />
								<Divider />
							</React.Fragment>
						))}
					</>
				)}
				<InfiniteScroll
					dataLength={news.news?.length || 0}
					hasMore={meta.isOnline && !news.noMoreNews}
					loader={<SkeletonNewsItem />}
					next={() => user.token && fetchNextNews(user.token)}
				>
					{news.news?.map((e, i) => (
						<React.Fragment key={i}>
							<NewsItem {...e} />
							<Divider />
						</React.Fragment>
					))}
				</InfiniteScroll>
			</List>
		</>
	)
})

export default NewsList
