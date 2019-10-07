import {
	Avatar,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { configStore } from 'stores'
import { unixToShortDate } from 'utils'

const SkeletonMessagePreview = () => (
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

export const __mockMessages = [
	{
		id: 0,
		avatar: 'https://i.pravatar.cc/150?img=66',
		name: 'Jan Hard',
		title: 'Przelozenie sprawdzianu',
		texts: [
			{
				imSender: true,
				value: 'Czy mozna prosze przelozyc sprawdzian?',
				timestamp: +new Date() - 100000000,
				read: true
			},
			{ imSender: false, value: 'Nie', timestamp: +new Date(), read: true }
		]
	},
	{
		id: 1,
		avatar: 'https://i.pravatar.cc/150?img=4',
		name: 'Piotroniusz Mick',
		title: 'Oddawaj zeszyt',
		texts: [
			{
				imSender: false,
				value: 'To co tytul',
				timestamp: +new Date() - 100000000,
				read: true
			},
			{ imSender: true, value: 'Nie', timestamp: +new Date(), read: true }
		]
	},
	{
		id: 2,
		avatar: 'https://i.pravatar.cc/150?img=6',
		name: 'Ania Kotra',
		title: 'Rozprawka',
		texts: [
			{
				imSender: false,
				value: 'Czemu twoja rozprawka jest czcionka 13 a nie 12?',
				timestamp: +new Date() - 100000000,
				read: false
			}
		]
	}
]

const MessageList = observer(() => {
	const [loading, setLoading] = useState(true)
	const config = useContext(configStore)
	const history = useHistory()

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000)
	}, [])

	return (
		<List>
			{loading ? (
				<>
					{new Array(5).fill(null).map((_, i) => (
						<ListItem key={i}>
							<SkeletonMessagePreview />
						</ListItem>
					))}
				</>
			) : (
				__mockMessages.map(({ id, avatar, name, title, texts }, i) => (
					<React.Fragment key={i}>
						<ListItem onClick={() => history.push(`/messages/${id}`)} button>
							<ListItemAvatar>
								<Avatar alt="avatar" src={avatar} />
							</ListItemAvatar>
							<ListItemText
								primary={`${name} • ${title}`}
								secondary={`${texts[texts.length - 1].imSender ? 'Ty' : name}: ${
									texts[texts.length - 1].value
								} • ${unixToShortDate(texts[texts.length - 1].timestamp, config.language)}`}
								secondaryTypographyProps={
									texts[texts.length - 1].read ? {} : { color: 'textPrimary' }
								}
							/>
						</ListItem>
						<Divider />
					</React.Fragment>
				))
			)}
		</List>
	)
})

export default MessageList
