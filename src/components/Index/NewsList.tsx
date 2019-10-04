import { Divider, Grid, List, ListItem, ListItemText } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { configStore } from 'stores'

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

const __mockNews = [
	{
		name: 'Zebranie rodzicow',
		timestamp: +new Date(),
		content:
			'w czwartek odbedzie sie spotkanie rodzicielskie, prosze byc bo to mega wazne i nie obecnosc skutkuje usunieciem ze szkoly'
	},
	{
		name: 'Piknik',
		timestamp: +new Date() - 100000000,
		content: 'bedzie piknik kiedys'
	},
	{
		name: 'Wolontariat',
		timestamp: +new Date() - 500000000,
		content: 'pieniadze prosze dawac do sekretariatu teraz szybko potrzeba jest dawac'
	}
]

const NewsList: React.FC = observer(() => {
	const [loading, setLoading] = useState(true)
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
				: __mockNews.map(({ name, timestamp, content }, i) => (
						<React.Fragment key={i}>
							<ListItem button>
								<ListItemText
									primary={`${name} • ${new Date(timestamp).toLocaleDateString(config.language, {
										year: 'numeric',
										month: 'short',
										day: '2-digit'
									})}`}
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
