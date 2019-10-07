import { Container as MuiContainer, Paper, Typography } from '@material-ui/core'
import { __mockNews } from 'components/Index/NewsList'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { configStore } from 'stores'
import styled from 'styled-components'
import { unixToShortDate } from 'utils'

const Container = styled(MuiContainer)`
	margin-top: 20px;
	margin-bottom: 20px;
`

const PaddedPaper = styled(Paper)`
	padding: 20px;
`

interface Params {
	id: string
}

const News = observer(() => {
	const { id } = useParams<Params>()
	const foundNews = __mockNews.find(e => e.id === Number(id))
	const config = useContext(configStore)

	return (
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
	)
})

export default News
