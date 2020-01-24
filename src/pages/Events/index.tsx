import DateFnsUtils from '@date-io/date-fns'
import { Badge } from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { TopLoading } from 'components'
import { buildListen, EventNames } from 'components/BottomAppBar/events'
import enLocale from 'date-fns/locale/en-US'
import plLocale from 'date-fns/locale/pl'
import { Language } from 'locales'
import { observer } from 'mobx-react-lite'
import IntervalTree from 'node-interval-tree'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { configStore, metaStore, userStore } from 'stores'
import { Event } from 'stores/UserStore'
import useAsync from 'use-async-react'
import DayList from './DayList'

const dayInMillis = 1000 * 60 * 60 * 24

const locales: { [key in Language]: any } = {
	pl: plLocale,
	en: enLocale
}

const Events: React.FC = observer(() => {
	const [showPicker, setShowPicker] = useState(false)
	const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(
		(() => {
			const d = new Date()
			d.setHours(0, 0, 0, 0)
			return d
		})()
	)
	const user = useContext(userStore)
	const config = useContext(configStore)
	const meta = useContext(metaStore)
	const { call: fetchEvents, loading } = useAsync(user.fetchEvents)

	useEffect(() => {
		if (meta.isOnline) fetchEvents()

		return buildListen(EventNames.EVENTS_CALENDAR, () => {
			setShowPicker(true)
		})
	}, [user, meta.isOnline, fetchEvents])

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
			{selectedDate && (
				<DayList
					events={intervalTree.search(+selectedDate, +selectedDate + dayInMillis)}
					day={selectedDate}
				/>
			)}
			<MuiPickersUtilsProvider utils={DateFnsUtils} locale={locales[config.language]}>
				<DatePicker
					value={selectedDate}
					style={{ display: 'none' }}
					onOpen={() => setShowPicker(true)}
					onClose={() => setShowPicker(false)}
					onChange={date => setSelectedDate(date)}
					renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
						if (day && intervalTree.search(+day, +day + dayInMillis).some(e => e.allDay)) {
							return (
								<Badge color="secondary" variant="dot" overlap="circle">
									{dayComponent}
								</Badge>
							)
						}
						return dayComponent
					}}
					open={showPicker}
					disableToolbar
				/>
			</MuiPickersUtilsProvider>
		</>
	)
})

export default Events
