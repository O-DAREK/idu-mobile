import { Grid, Typography } from '@material-ui/core'
import { BackBar, Container, PaddedPaper, TopLoading } from 'components'
import * as urls from 'constants/urls'
import { timeAgo, useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { configStore, messagesStore, metaStore, userStore } from 'stores'
import styled from 'styled-components'
import useAsync from 'use-async-react'
import { stripHtml } from 'utils'

interface Props {
	id: string
}

const MessageTypography = styled(Typography)`
	overflow-wrap: break-word;
`

const SpecificMessage: React.FC<Props> = observer(({ id }) => {
	const { NO_SUCH_THREAD } = useLocale()
	const config = useContext(configStore)
	const user = useContext(userStore)
	const messages = useContext(messagesStore)
	const meta = useContext(metaStore)
	const { call: fetchSpecificMessages, loading } = useAsync(messages.fetchSpecificMessages)

	const thread = Number(id) in messages.messages ? messages.messages[Number(id)] : undefined

	useEffect(() => {
		if (user.token && meta.isOnline) fetchSpecificMessages(user.token, Number(id))
	}, [meta.isOnline, user, id, fetchSpecificMessages])

	return (
		<>
			<BackBar to={urls.internal.messages()} />
			{loading && <TopLoading />}
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
										<MessageTypography>{stripHtml(body)}</MessageTypography>
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
		</>
	)
})

export default SpecificMessage
