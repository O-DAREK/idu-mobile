import { Divider, Grid, List, ListItem, ListItemText } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import * as urls from 'constants/urls'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { configStore } from 'stores'
import { unixToShortDate } from 'utils'

const SkeletonNewsPreview = () => (
	<Grid direction="column" container>
		<Grid spacing={2} container>
			<Grid xs={4} item>
				<Skeleton height={6} />
			</Grid>
			<Grid xs={3} item>
				<Skeleton height={6} />
			</Grid>
		</Grid>
		<Grid container>
			<Grid xs={12} item>
				<Skeleton height={6} />
			</Grid>
		</Grid>
	</Grid>
)

export const __mockNews = [
	{
		id: 1,
		name: 'Zebranie rodzicow',
		timestamp: +new Date(),
		content:
			'w czwartek odbedzie sie spotkanie rodzicielskie, prosze byc bo to mega wazne i nie obecnosc skutkuje usunieciem ze szkoly'
	},
	{
		id: 2,
		name: 'Piknik',
		timestamp: +new Date() - 100000000,
		content: 'bedzie piknik kiedys'
	},
	{
		id: 3,
		name: 'Wolontariat',
		timestamp: +new Date() - 500000000,
		content: 'pieniadze prosze dawac do sekretariatu teraz szybko potrzeba jest dawac'
	}
]

const NewsList: React.FC = observer(() => {
	const [loading, setLoading] = useState(true)
	const history = useHistory()
	const config = useContext(configStore)

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000)
	}, [])

	return (
		<List>
			{loading
				? [...new Array(6)].map((_, i) => (
						<ListItem key={i}>
							<SkeletonNewsPreview />
						</ListItem>
				  ))
				: __mockNews.map(({ name, timestamp, content, id }) => (
						<React.Fragment key={id}>
							<ListItem onClick={() => history.push(urls.internal.specificNews(String(id)))} button>
								<ListItemText
									primary={`${name} • ${unixToShortDate(timestamp, config.language)}`}
									secondary={content}
									secondaryTypographyProps={{ noWrap: true }}
								/>
							</ListItem>
							<Divider />
						</React.Fragment>
				  ))}
		</List>
	)
})

export default NewsList
