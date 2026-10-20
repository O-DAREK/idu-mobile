import { Container, Stack, Typography } from '@mui/material'
import { formatLong, useLocale } from 'locales'
import React, { useContext } from 'react'
import { configStore } from 'stores'
import { Event as EventType } from 'stores/UserStore'
import styled from 'styled-components'
import AllDayEvent from './AllDayEvent'
import SingleEvent from './SingleEvent'

interface Props {
	events: EventType[]
	day: Date
}

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
				{events.length === 0 && <Typography color="textSecondary">{NO_EVENTS}</Typography>}
				<HorizontalView>
					{allDay.map(e => (
						<AllDayEvent
							$bgColor={e.backgroundColor}
							$textColor={e.textColor}
							key={e.id}
							variant="outlined"
						>
							{e.name}
						</AllDayEvent>
					))}
				</HorizontalView>
				<Stack spacing={2}>
					{normal.map(e => (
						<SingleEvent
							key={e.id}
							name={e.name}
							from={[e.startAt.getHours(), e.startAt.getMinutes()]}
							to={[e.stopAt.getHours(), e.stopAt.getMinutes()]}
							color={e.backgroundColor}
						/>
					))}
				</Stack>
			</Container>
		</>
	)
}

export default DayList
