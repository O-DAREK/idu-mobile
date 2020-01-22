import { Container, Grid, Typography } from '@material-ui/core'
import { formatLong, useLocale } from 'locales'
import React, { useContext } from 'react'
import { configStore } from 'stores'
import { Event as EventType } from 'stores/UserStore'
import styled from 'styled-components'
import SingleEvent from './SingleEvent'
import AllDayEvent from './AllDayEvent'

interface Props {
	events: EventType[]
	day: Date
}

const FaintText = styled(Typography)`
	opacity: 0.7;
`

const StickyDate = styled(Typography)`
	position: sticky;
	text-align: center;
	background-color: ${p => p.theme.palette.background.default};
	top: 0;
`

const HorizontalView = styled.div`
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	margin: 20px 0;
`

const DayList: React.FC<Props> = ({ events, day }) => {
	const config = useContext(configStore)
	const { NO_EVENTS } = useLocale()

	const allDay = events.filter(e => e.allDay)
	const normal = events.filter(e => !e.allDay)

	return (
		<>
			<StickyDate variant="h6">{formatLong(config.language, day)}</StickyDate>
			<Container>
				{events.length === 0 && <FaintText>{NO_EVENTS}</FaintText>}
				<HorizontalView>
					{allDay.map(e => (
						<AllDayEvent
							bgColor={e.backgroundColor}
							textColor={e.textColor}
							key={e.id}
							variant="outlined"
						>
							{e.name}
						</AllDayEvent>
					))}
				</HorizontalView>
				<Grid spacing={2} direction="column" container>
					{normal.map(e => (
						<Grid key={e.id} item>
							<SingleEvent
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
