import { Badge, Grid, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Skeleton } from '@mui/material'
import * as urls from 'constants/urls'
import { formatShort } from 'locales'
import React, { memo, useContext } from 'react'
import { useNavigate } from 'react-router'
import { configStore } from 'stores'
import { PieceOfNews } from 'stores/NewsStore'
import styled from 'styled-components'
import { stripHtml } from 'utils'

// the legacy grid added the 24px item padding on top of this margin; keep the same skeleton height
const MarginedGrid = styled(Grid)`
	width: 100%;
	margin-top: 25px;
	margin-bottom: 1px;
`

export const SkeletonNewsItem = () => (
	<ListItem>
		<MarginedGrid spacing={3} container>
			<Grid size={4}>
				<Skeleton height={12} />
			</Grid>
			<Grid size={3}>
				<Skeleton height={12} />
			</Grid>
			<Grid size={12}>
				<Skeleton height={12} />
			</Grid>
		</MarginedGrid>
	</ListItem>
)

type Props = PieceOfNews

const NewsItem: React.FC<Props> = memo(({ body, date, title, requiresConfirmation, read, id }) => {
	const navigate = useNavigate()
	const config = useContext(configStore)

	return (
		<ListItemButton onClick={() => navigate(urls.internal.specificNews(String(id)))}>
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
					slotProps={{ secondary: { noWrap: true } }}
				/>
			</Badge>
		</ListItemButton>
	)
})

export default NewsItem
