import { Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import {
	BackBar,
	Container,
	FlexGrow,
	PaddedPaper,
	Snackbar,
	StrippedHtml,
	TopLoading
} from 'components'
import * as urls from 'constants/urls'
import { UNAUTHORIZED } from 'http-status-codes'
import { timeAgo, useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { configStore, messagesStore, metaStore, userStore } from 'stores'
import styled from 'styled-components'
import useAsync from 'use-async-react'
import MessageBox from './MessageBox'

interface Props {
	id: number
}

const FlexBox = styled.div`
	min-height: calc(var(--visible-height, 1vh) * 100 - ${p => p.theme.spacing()}px);
	display: flex;
	flex-direction: column;
`

const MessagesSkeleton = () => (
	<Grid spacing={2} alignItems="center" container>
		<Grid xs={9} item>
			<Skeleton height={150} />
		</Grid>
		<Grid xs={3} item>
			<Skeleton height={12} />
		</Grid>
		<Grid xs={3} item>
			<Skeleton height={12} />
		</Grid>
		<Grid xs={9} item>
			<Skeleton height={100} />
		</Grid>
		<Grid xs={3} item>
			<Skeleton height={12} />
		</Grid>
		<Grid xs={9} item>
			<Skeleton height={100} />
		</Grid>
	</Grid>
)

const SpecificMessages: React.FC<Props> = observer(({ id }) => {
	const { NO_SUCH_THREAD, ERROR_GENERIC } = useLocale()
	const config = useContext(configStore)
	const user = useContext(userStore)
	const messages = useContext(messagesStore)
	const meta = useContext(metaStore)
	const { call: fetchSpecificMessages, loading, error } = useAsync(messages.fetchSpecificMessages)

	const thread = id in messages.messages ? messages.messages[id] : undefined

	useEffect(() => {
		if (user.token && meta.isOnline) fetchSpecificMessages(user.token, id)
	}, [meta.isOnline, user, id, fetchSpecificMessages])

	useEffect(() => {
		if (error?.status === UNAUTHORIZED) user.logout(true)
	}, [error, user])

	return (
		<FlexBox>
			{error && <Snackbar variant="error">{ERROR_GENERIC}</Snackbar>}
			{loading && thread && <TopLoading />}
			<BackBar to={urls.internal.messages()} />
			<Container>
				{loading && !thread && <MessagesSkeleton />}
				{!thread && !loading && <Typography>{NO_SUCH_THREAD}</Typography>}
				{thread && (
					<Grid direction="column" spacing={3} container>
						{thread.messages.map(({ body, sentAt, ...rest }, i) => {
							const date = (
								<Grid xs="auto" item key={1}>
									<Typography variant="overline">{timeAgo(config.language, sentAt)}</Typography>
								</Grid>
							)
							const message = (
								<Grid xs={9} item key={2}>
									<PaddedPaper>
										<StrippedHtml>{body}</StrippedHtml>
									</PaddedPaper>
								</Grid>
							)

							const imSender = 'to' in rest

							return (
								<Grid key={i} alignItems="center" justify="space-between" item container>
									{imSender ? [date, message] : [message, date]}
								</Grid>
							)
						})}
					</Grid>
				)}
			</Container>
			<FlexGrow />
			<MessageBox threadId={id} />
		</FlexBox>
	)
})

export default SpecificMessages
