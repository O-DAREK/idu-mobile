import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { StylesProvider } from '@material-ui/styles'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { configStore, metaStore, userStore } from 'stores'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { muiTheme } from 'styles/theme'
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
	const meta = useContext(metaStore)
	const theme = muiTheme(config.theme, ...config.accentColors)

	document
		.querySelector('head > meta[name=theme-color]')
		?.setAttribute('content', theme.palette.background.default)

	useEffect(() => {
		setVisibleHeight()
		window.addEventListener('beforeinstallprompt', e => {
			e.preventDefault()
			meta.setPwaInstallEvent(e as any)
		})
	}, [meta])

	return (
		<StylesProvider injectFirst>
			<ThemeProvider theme={theme}>
				<MuiThemeProvider theme={theme}>
					<>
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
