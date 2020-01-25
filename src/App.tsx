import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { configStore, userStore } from 'stores'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { muiTheme } from 'styles/theme'
import { ToastContainer } from 'utils/toast'
import { setVisibleHeight } from 'visible-height-css'
import Router from './Router'

const GlobalStyles = createGlobalStyle`
	body, #root {
		height: calc(100 * var(--visible-height, 1vh));
	}
`

const App = observer(() => {
	const user = useContext(userStore)
	const config = useContext(configStore)
	const theme = muiTheme(config.theme, ...config.accentColors)

	useEffect(() => {
		setVisibleHeight()
	}, [])

	return (
		<StylesProvider injectFirst>
			<ThemeProvider theme={theme}>
				<MuiThemeProvider theme={theme}>
					<>
						<ToastContainer />
						<CssBaseline />
						<GlobalStyles />
						<Router loggedIn={user.isLoggedIn} />
					</>
				</MuiThemeProvider>
			</ThemeProvider>
		</StylesProvider>
	)
})

export default App
