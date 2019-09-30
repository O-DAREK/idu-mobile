import { Container as MuiContainer, Divider, Grid, Typography } from '@material-ui/core'
import { useLocale } from 'locales'
import React from 'react'
import styled from 'styled-components'
import ChangeLanguage from './ChangeLanguage'
import ChangeTheme from './ChangeTheme'

const Container = styled(MuiContainer)`
	padding-top: 20px;
	padding-bottom: 20px;
`

const Settings: React.FC = () => {
	const { SETTINGS } = useLocale()

	return (
		<Container>
			<Grid direction="column" spacing={3} container>
				<Grid item>
					<Typography variant="h4">{SETTINGS}</Typography>
				</Grid>
				<Grid item>
					<ChangeLanguage />
				</Grid>
				<Grid item>
					<Divider />
				</Grid>
				<Grid item>
					<ChangeTheme />
				</Grid>
			</Grid>
		</Container>
	)
}

export default Settings
