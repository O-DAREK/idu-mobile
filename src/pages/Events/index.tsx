import { Badge } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { TopLoading } from 'components'
import { buildListen, EventNames } from 'components/BottomAppBar/events'
import { endOfDay, startOfDay } from 'date-fns'
import { enUS, Locale, pl } from 'date-fns/locale'
import { StatusCodes } from 'http-status-codes'
import { Language } from 'locales'
import { observer } from 'mobx-react-lite'
import IntervalTree from 'node-interval-tree'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { configStore, metaStore, userStore } from 'stores'
import { Event } from 'stores/UserStore'
import useAsync from 'utils/useAsync'
import DayList from './DayList'

// interval search is inclusive at both ends, so events that end exactly at midnight are dropped
const eventsOn = (tree: IntervalTree<Event>, day: Date) => {
	const start = startOfDay(day)
	return tree.search(+start, +endOfDay(day)).filter(e => +e.stopAt > +start)
}

const locales: { [key in Language]: Locale } = {
	pl,
	en: enUS
}

type EventDayProps = PickersDayProps & { hasAllDayEvent?: (day: Date) => boolean }

// marks days with all-day events in the calendar
const EventDay: React.FC<EventDayProps> = ({ hasAllDayEvent, ...props }) => {
	const day = <PickersDay {...props} />

	return hasAllDayEvent?.(props.day) ? (
		<Badge color="secondary" variant="dot" overlap="circular">
			{day}
		</Badge>
	) : (
		day
	)
}

const Events: React.FC = observer(() => {
	const [showPicker, setShowPicker] = useState(false)
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		(() => {
			const d = new Date()
			d.setHours(0, 0, 0, 0)
			return d
		})()
	)
	const user = useContext(userStore)
	const config = useContext(configStore)
	const meta = useContext(metaStore)
	const { call: fetchEvents, loading, error } = useAsync(user.fetchEvents)

	useEffect(() => {
		if (meta.isOnline) fetchEvents()
	}, [meta.isOnline, fetchEvents])

	useEffect(() => {
		if (error?.status === StatusCodes.UNAUTHORIZED) user.logout(true)
	}, [error, user])

	useEffect(
		() =>
			buildListen(EventNames.EVENTS_CALENDAR, () => {
				setShowPicker(true)
			}),
		[]
	)

	const intervalTree = useMemo(() => {
		const it = new IntervalTree<Event>()
		for (const e of user.events || []) {
			it.insert(+e.startAt, +e.stopAt, e)
		}
		return it
	}, [user.events])

	return (
		<>
			{loading && <TopLoading />}
			{selectedDate && <DayList events={eventsOn(intervalTree, selectedDate)} day={selectedDate} />}
			<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locales[config.language]}>
				<MobileDatePicker
					value={selectedDate}
					open={showPicker}
					onOpen={() => setShowPicker(true)}
					onClose={() => setShowPicker(false)}
					onAccept={date => setSelectedDate(date)}
					closeOnSelect
					slots={{ day: EventDay }}
					slotProps={{
						// the picker is opened from the bottom app bar, its own field stays hidden
						textField: { sx: { display: 'none' } },
						toolbar: { hidden: true },
						day: {
							hasAllDayEvent: (day: Date) => eventsOn(intervalTree, day).some(e => e.allDay)
						} as Partial<EventDayProps>
					}}
				/>
			</LocalizationProvider>
		</>
	)
})

export default Events
