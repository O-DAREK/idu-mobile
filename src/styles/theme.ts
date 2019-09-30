import { createMuiTheme } from '@material-ui/core'
import { Theme } from 'constants/interfaces'

export const muiTheme = (themeType: Theme) =>
	createMuiTheme({
		palette: {
			type: themeType
		}
	})
