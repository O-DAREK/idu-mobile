import { Grid, Typography } from '@material-ui/core'
import { BackBar, Container, PaddedPaper, StrippedHtml, TopLoading } from 'components'
import * as urls from 'constants/urls'
import { timeAgo, useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { configStore, messagesStore, metaStore, userStore } from 'stores'
import useAsync from 'use-async-react'
import MessageBox from './MessageBox'

interface Props {
	id: number
}

const SpecificMessages: React.FC<Props> = observer(({ id }) => {
	const { NO_SUCH_THREAD } = useLocale()
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
		if (error) user.logout(true)
	}, [error, user])

	return (
		<>
			{loading && <TopLoading />}
			<BackBar to={urls.internal.messages()} />
			<Container>
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
				<MessageBox threadId={id} />
			</Container>
		</>
	)
})

export default SpecificMessages
