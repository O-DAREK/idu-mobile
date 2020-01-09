import { createMuiTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { Theme } from 'constants/interfaces'

export const muiTheme = (themeType: Theme) =>
	createMuiTheme({
		palette: {
			type: themeType,
			primary: blue,
			secondary: {
				main: '#ff80ab'
			}
		}
	})
