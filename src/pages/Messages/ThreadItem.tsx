import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import * as urls from 'constants/urls'
import { timeAgo } from 'locales'
import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router'
import { configStore } from 'stores'
import { MessageThread } from 'stores/MessagesStore'
import styled from 'styled-components'
import { stripHtml } from 'utils'

const MarginedGrid = styled(Grid)`
	margin-top: 1.5px;
	margin-bottom: 1.5px;
`

export const SkeletonThreadItem = () => (
	<ListItem>
		<MarginedGrid spacing={3} alignItems="center" container>
			<Grid xs="auto" item>
				<Skeleton variant="circle" height={40} width={40} />
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

const EllipsisText = styled(Typography).attrs(() => ({ component: 'span' }))`
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
	const history = useHistory()
	const imSender = 'to' in rest
	const other = 'to' in rest ? rest.to : rest.from

	return (
		<ListItem onClick={() => history.push(urls.internal.specificMessage(String(id)))} button>
			<ListItemAvatar>
				<Avatar
					alt="avatar"
					src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`}
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
				// secondaryTypographyProps={texts[texts.length - 1].read ? {} : { color: 'textPrimary' }}
			/>
		</ListItem>
	)
})

export default ThreadItem
