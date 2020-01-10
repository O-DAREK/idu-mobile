import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { buildListen, EventNames } from 'components/BottomAppBar/events'
import React, { useEffect, useState } from 'react'

const Events: React.FC = () => {
	const [showPicker, setShowPicker] = useState(false)
	const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(new Date())

	useEffect(
		() =>
			buildListen(EventNames.EVENTS_CALENDAR, () => {
				setShowPicker(true)
			}),
		[]
	)

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DatePicker
				value={selectedDate}
				style={{ display: 'none' }}
				onOpen={() => setShowPicker(true)}
				onClose={() => setShowPicker(false)}
				onChange={date => setSelectedDate(date)}
				open={showPicker}
				disableToolbar
			/>
		</MuiPickersUtilsProvider>
	)
}

export default Events
