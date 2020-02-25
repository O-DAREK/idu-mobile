import { Badge, Grid, ListItem, ListItemText } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import * as urls from 'constants/urls'
import { formatShort } from 'locales'
import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router'
import { configStore } from 'stores'
import { PieceOfNews } from 'stores/NewsStore'
import styled from 'styled-components'
import { stripHtml } from 'utils'

const MarginedGrid = styled(Grid)`
	margin-top: 1px;
	margin-bottom: 1px;
`

export const SkeletonNewsItem = () => (
	<ListItem>
		<MarginedGrid spacing={3} container>
			<Grid xs={4} item>
				<Skeleton height={12} />
			</Grid>
			<Grid xs={3} item>
				<Skeleton height={12} />
			</Grid>
			<Grid xs={12} item>
				<Skeleton height={12} />
			</Grid>
		</MarginedGrid>
	</ListItem>
)

type Props = PieceOfNews

const NewsItem: React.FC<Props> = memo(({ body, date, title, requiresConfirmation, read, id }) => {
	const history = useHistory()
	const config = useContext(configStore)

	return (
		<ListItem onClick={() => history.push(urls.internal.specificNews(String(id)))} button>
			<Badge
				style={{ maxWidth: '100%' }}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				variant="dot"
				color="secondary"
				invisible={read}
			>
				<ListItemText
					primary={`${title} • ${formatShort(config.language, date)}`}
					secondary={stripHtml(body)}
					secondaryTypographyProps={{ noWrap: true }}
				/>
			</Badge>
		</ListItem>
	)
})

export default NewsItem
