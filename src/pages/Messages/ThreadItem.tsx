import { Grid, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { Skeleton } from '@mui/material'
import { AvatarWithPlaceholder } from 'components'
import * as urls from 'constants/urls'
import { timeAgo } from 'locales'
import React, { memo, useContext } from 'react'
import { useNavigate } from 'react-router'
import { configStore } from 'stores'
import { MessageThread } from 'stores/MessagesStore'
import styled from 'styled-components'
import { stripHtml } from 'utils'

const MarginedGrid = styled(Grid)`
	margin-top: 1.5px;
	margin-bottom: 1.5px;
`

const CircleSkeleton = () => <Skeleton variant="circular" height={40} width={40} />

export const SkeletonThreadItem = () => (
	<ListItem>
		<MarginedGrid spacing={3} alignItems="center" container>
			<Grid xs="auto" item>
				<CircleSkeleton />
			</Grid>
			<Grid xs item>
				<Grid spacing={3} container>
					<Grid xs={2} item>
						<Skeleton height={12} />
					</Grid>
					<Grid xs={7} item>
						<Skeleton height={12} />
					</Grid>
					<Grid xs={8} item>
						<Skeleton height={12} />
					</Grid>
					<Grid xs={2} item>
						<Skeleton height={12} />
					</Grid>
				</Grid>
			</Grid>
		</MarginedGrid>
	</ListItem>
)

const EllipsisText = styled(Typography).attrs<{ component?: React.ElementType }>({
	component: 'span'
})`
	text-overflow: ellipsis;
	max-width: 65%;
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
`

const DateSpan = styled(EllipsisText)`
	white-space: pre;
	width: unset;
`

type Props = MessageThread

const ThreadItem: React.FC<Props> = memo(({ id, body, title, sentAt, ...rest }) => {
	const config = useContext(configStore)
	const navigate = useNavigate()
	// const imSender = 'to' in rest
	const other = 'to' in rest ? rest.to : rest.from

	return (
		<ListItem onClick={() => navigate(urls.internal.specificMessage(String(id)))} button>
			<ListItemAvatar>
				<AvatarWithPlaceholder
					alt="avatar"
					src={`https://s35.idu.edu.pl${other.avatar}`}
					placeholder={<CircleSkeleton />}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={`${other.name} • ${title}`}
				secondary={
					<>
						<EllipsisText>{stripHtml(body)}</EllipsisText>
						<DateSpan> • {timeAgo(config.language, sentAt)}</DateSpan>
					</>
				}
			/>
		</ListItem>
	)
})

export default ThreadItem
