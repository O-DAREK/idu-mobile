import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import * as urls from 'constants/urls'
import { formatShort } from 'locales'
import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router'
import { configStore } from 'stores'
import { MessageThread } from 'stores/MessagesStore'

export const SkeletonThreadItem = () => (
	<Grid spacing={2} alignItems="center" container>
		<Grid xs="auto" item>
			<Skeleton variant="circle" height={40} width={40} />
		</Grid>
		<Grid xs={true} item>
			<Grid direction="column" container>
				<Grid spacing={2} container>
					<Grid xs={2} item>
						<Skeleton height={6} />
					</Grid>
					<Grid xs={6} item>
						<Skeleton height={6} />
					</Grid>
				</Grid>
				<Grid spacing={2} alignItems="center" container>
					<Grid xs={1} item>
						<Skeleton height={10} />
					</Grid>
					<Grid xs={8} item>
						<Skeleton height={6} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</Grid>
)

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
				secondary={`${imSender ? 'Ty' : other.name} • ${formatShort(config.language, sentAt)}`}
				// secondaryTypographyProps={texts[texts.length - 1].read ? {} : { color: 'textPrimary' }}
			/>
		</ListItem>
	)
})

export default ThreadItem
