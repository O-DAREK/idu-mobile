import { Container, Grid, Typography } from '@material-ui/core'
import { formatLong, useLocale } from 'locales'
import React, { useContext } from 'react'
import { configStore } from 'stores'
import { Event as EventType } from 'stores/UserStore'
import styled from 'styled-components'
import Event from './Event'

interface Props {
	events: EventType[]
	day: Date
}

const Title = styled(Typography)`
	margin-left: 20px;
`

const DayList: React.FC<Props> = ({ events, day }) => {
	const config = useContext(configStore)
	const { NO_EVENTS } = useLocale()

	const allDay = events.filter(e => e.allDay)
	const normal = events.filter(e => !e.allDay)

	return (
		<>
			<Title variant="h6">{formatLong(config.language, day)}</Title>
			{events.length === 0 && <Typography>{NO_EVENTS}</Typography>}
			<Container>
				<Grid spacing={2} direction="column" container>
					{normal.map(e => (
						<Grid key={e.id} item>
							<Event
								name={e.name}
								from={[e.startAt.getHours(), e.startAt.getMinutes()]}
								to={[e.stopAt.getHours(), e.stopAt.getMinutes()]}
								color={e.backgroundColor}
							/>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	)
}

export default DayList
