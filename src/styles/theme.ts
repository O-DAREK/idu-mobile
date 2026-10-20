import { createTheme } from '@mui/material'
import { Theme } from 'constants/interfaces'

// v5 changed several defaults; these keep the v4 look of the app
const standardVariant = { defaultProps: { variant: 'standard' as const } }
const secondaryColor = { defaultProps: { color: 'secondary' as const } }
const v4Background = {
	light: { default: '#fafafa', paper: '#fff' },
	dark: { default: '#303030', paper: '#424242' }
}

export const muiTheme = (themeType: Theme, primary: string, secondary: string) =>
	createTheme({
		palette: {
			mode: themeType,
			primary: {
				main: primary
			},
			secondary: {
				main: secondary
			},
			background: v4Background[themeType]
		},
		components: {
			MuiTextField: standardVariant,
			MuiFormControl: standardVariant,
			MuiRadio: secondaryColor,
			MuiCheckbox: secondaryColor,
			// v4 buttons defaulted to the neutral "default" color, which v5 dropped
			MuiButton: {
				defaultProps: { color: 'inherit' },
				variants: [
					{
						props: { variant: 'outlined', color: 'inherit' },
						style: {
							borderColor:
								themeType === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
						}
					}
				]
			},
			// v4 kept the AppBar color in dark mode
			MuiAppBar: { defaultProps: { enableColorOnDark: true } },
			// v5 paints dark mode papers with an elevation overlay; v4 used a flat color
			MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } }
		}
	})
