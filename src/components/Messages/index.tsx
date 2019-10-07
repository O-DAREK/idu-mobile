import { Grid, Typography } from '@material-ui/core'
import { Container, PaddedPaper } from 'components'
import { __mockMessages } from 'components/Root/MessageList'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { configStore } from 'stores'
import { unixToShortDate } from 'utils'

interface Params {
	id: string
}

const Messages = observer(() => {
	const { id } = useParams<Params>()
	const foundThread = __mockMessages.find(e => e.id === Number(id))
	const config = useContext(configStore)

	return (
		<Container>
			{!foundThread && <Typography>Sorry, couldnt find these messages</Typography>}
			{foundThread && (
				<Grid direction="column" spacing={3} container>
					{foundThread.texts.map(({ imSender, timestamp, value }) => {
						const date = (
							<Grid xs="auto" item>
								<Typography variant="overline">
									{unixToShortDate(timestamp, config.language)}
								</Typography>
							</Grid>
						)
						const message = (
							<Grid xs={8} item>
								<PaddedPaper>
									<Typography>{value}</Typography>
								</PaddedPaper>
							</Grid>
						)

						return (
							<Grid key={timestamp} alignItems="center" justify="space-between" item container>
								{imSender ? [date, message] : [message, date]}
							</Grid>
						)
					})}
				</Grid>
			)}
		</Container>
	)
})

export default Messages
