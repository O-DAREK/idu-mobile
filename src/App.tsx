import { CssBaseline, StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { configStore, metaStore, userStore } from 'stores'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { muiTheme } from 'styles/theme'
import Router from './Router'

const GlobalStyles = createGlobalStyle`
	body, #root {
		height: 100vh;
		height: 100dvh;
	}
`

const App = observer(() => {
	const user = useContext(userStore)
	const config = useContext(configStore)
	const meta = useContext(metaStore)
	const theme = muiTheme(config.theme, ...config.accentColors)

	document
		.querySelector('head > meta[name=theme-color]')
		?.setAttribute('content', theme.palette.background.default)

	useEffect(() => {
		window.addEventListener('beforeinstallprompt', e => {
			e.preventDefault()
			meta.setPwaInstallEvent(e as any)
		})
	}, [meta])

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<MuiThemeProvider theme={theme}>
					<>
						<CssBaseline />
						<GlobalStyles />
						<Router loggedIn={user.isLoggedIn} />
					</>
				</MuiThemeProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	)
})

export default App
