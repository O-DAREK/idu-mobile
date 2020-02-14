import { Typography } from '@material-ui/core'
import { BackBar, Container, PaddedPaper } from 'components'
import * as urls from 'constants/urls'
import { formatLong, useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { configStore, newsStore } from 'stores'
import styled from 'styled-components'
import { stripHtml } from 'utils'

const WordBreakingPaper = styled(PaddedPaper)`
	overflow-wrap: break-word;
`

interface Props {
	id: number
}

const SpecificNews: React.FC<Props> = observer(({ id }) => {
	const { NO_SUCH_NEWS } = useLocale()
	const news = useContext(newsStore)
	const config = useContext(configStore)

	const foundNews = news.news?.find(e => e.id === id) || news.stickyNews?.find(e => e.id === id)

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
							<Typography component="p" paragraph>
								{stripHtml(foundNews.body)}
							</Typography>
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
