import { Divider, List, Typography } from '@material-ui/core'
import { PaddedPaper, Snackbar, TopLoading } from 'components'
import { UNAUTHORIZED } from 'http-status-codes'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { metaStore, newsStore, userStore } from 'stores'
import useAsync from 'use-async-react'
import NewsItem, { SkeletonNewsItem } from './NewsItem'

const StickyNews: React.FC = observer(() => {
	const { ERROR_GENERIC, STICKY_NEWS } = useLocale()
	const user = useContext(userStore)
	const meta = useContext(metaStore)
	const news = useContext(newsStore)
	const { call: fetchStickyNews, loading, error } = useAsync(news.fetchStickyNews)

	useEffect(() => {
		if (user.token && meta.isOnline) fetchStickyNews(user.token)
	}, [meta.isOnline, fetchStickyNews, user])

	useEffect(() => {
		if (error?.status === UNAUTHORIZED) user.logout(true)
	}, [error, user])

	return (
		<>
			{error && <Snackbar variant="error">{ERROR_GENERIC}</Snackbar>}
			{loading && news.news && <TopLoading />}
			<PaddedPaper>
				<Typography variant="h6">{STICKY_NEWS}</Typography>
				<List>
					{loading && !news.stickyNews && <SkeletonNewsItem />}
					{news.stickyNews?.map((e, i) => (
						<React.Fragment key={i}>
							<NewsItem {...e} />
							{i + 1 !== news.stickyNews?.length && <Divider />}
						</React.Fragment>
					))}
				</List>
			</PaddedPaper>
		</>
	)
})

export default StickyNews
