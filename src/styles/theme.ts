import { createMuiTheme } from '@material-ui/core'
import { Theme } from 'constants/interfaces'

export const muiTheme = (themeType: Theme, primary: string, secondary: string) =>
	createMuiTheme({
		palette: {
			type: themeType,
			primary: {
				main: primary
			},
			secondary: {
				main: secondary
			}
		}
	})
