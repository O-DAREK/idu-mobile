import { Divider, List } from '@material-ui/core'
import { TopLoading } from 'components'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { metaStore, newsStore, userStore } from 'stores'
import useAsync from 'use-async-react'
import NewsItem, { SkeletonNewsItem } from './NewsItem'

const NewsList: React.FC = observer(() => {
	const user = useContext(userStore)
	const meta = useContext(metaStore)
	const news = useContext(newsStore)
	const { call: fetchNextNews, loading, error } = useAsync(news.fetchNextNews)

	useBottomScrollListener(() => {
		if (user.token && meta.isOnline) fetchNextNews(user.token)
	}, 100)

	useEffect(() => {
		if (user.token && meta.isOnline) fetchNextNews(user.token)
	}, [meta.isOnline, fetchNextNews, user])

	useEffect(() => {
		if (error) user.logout(true)
	}, [error, user])

	return (
		<>
			{loading && news.news && <TopLoading />}
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
				{news.news?.map((e, i) => (
					<React.Fragment key={i}>
						<NewsItem {...e} />
						<Divider />
					</React.Fragment>
				))}
				{meta.isOnline && !news.noMoreNews && <SkeletonNewsItem />}
			</List>
		</>
	)
})

export default NewsList
