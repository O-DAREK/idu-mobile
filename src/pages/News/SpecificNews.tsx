import { Typography } from '@material-ui/core'
import { BackBar, Container, PaddedPaper, StrippedHtml } from 'components'
import * as urls from 'constants/urls'
import { formatLong, useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { configStore, metaStore, newsStore, userStore } from 'stores'
import styled from 'styled-components'
import { ignoreRejection } from 'utils'

const WordBreakingPaper = styled(PaddedPaper)`
	overflow-wrap: break-word;
`

interface Props {
	id: number
}

const SpecificNews: React.FC<Props> = observer(({ id }) => {
	const { NO_SUCH_NEWS } = useLocale()
	const news = useContext(newsStore)
	const user = useContext(userStore)
	const meta = useContext(metaStore)
	const config = useContext(configStore)

	const foundNews = news.news?.find(e => e.id === id) || news.stickyNews?.find(e => e.id === id)

	useEffect(() => {
		if (foundNews && !foundNews.read && user.token && meta.isOnline)
			ignoreRejection(news.markAsRead(user.token, foundNews.id).then(user.decreaseUnreadNews))
	}, [user, meta.isOnline, foundNews, news])

	return (
		<>
			<BackBar to={urls.internal.news()} />
			<Container>
				<WordBreakingPaper>
					{!foundNews && <Typography>{NO_SUCH_NEWS}</Typography>}
					{foundNews && (
						<>
							<Typography variant="h4" gutterBottom>
								{foundNews.title}
							</Typography>
							<StrippedHtml component="p" paragraph>
								{foundNews.body}
							</StrippedHtml>
							<Typography variant="overline">
								{formatLong(config.language, foundNews.date)}
							</Typography>
						</>
					)}
				</WordBreakingPaper>
			</Container>
		</>
	)
})

export default SpecificNews
