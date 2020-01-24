import { Typography } from '@material-ui/core'
import { BackBar, Container, PaddedPaper } from 'components'
import { internal } from 'constants/urls'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { configStore } from 'stores'
import { unixToShortDate } from 'utils'
import { __mockNews } from './NewsList'

interface Props {
	id: string
}

const SpecificNews: React.FC<Props> = observer(({ id }) => {
	const foundNews = __mockNews.find(e => e.id === Number(id))

	const config = useContext(configStore)

	return (
		<>
			<BackBar to={internal.news()} />
			<Container>
				<PaddedPaper>
					{!foundNews && <Typography>Sorry, couldnt find this news article</Typography>}
					{foundNews && (
						<>
							<Typography variant="h4" gutterBottom>
								{foundNews.name}
							</Typography>
							<Typography component="p" paragraph>
								{foundNews.content}
							</Typography>
							<Typography variant="overline">
								{unixToShortDate(foundNews.timestamp, config.language)}
							</Typography>
						</>
					)}
				</PaddedPaper>
			</Container>
		</>
	)
})

export default SpecificNews
