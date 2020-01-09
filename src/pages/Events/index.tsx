import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'

const Events = () => {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DatePicker
				label="Basic example"
				value={new Date()}
				disableToolbar
				// style={{ display: 'none' }}
				onChange={(...a) => console.log(a)}
				animateYearScrolling
			/>
		</MuiPickersUtilsProvider>
	)
}

export default Events
