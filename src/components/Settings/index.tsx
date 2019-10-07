import { Divider, Grid, Typography } from '@material-ui/core'
import { Container } from 'components'
import { useLocale } from 'locales'
import React from 'react'
import ChangeLanguage from './ChangeLanguage'
import ChangeTheme from './ChangeTheme'
import Logout from './Logout'

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
				<Grid item>
					<Divider />
				</Grid>
				<Grid item>
					<Logout />
				</Grid>
			</Grid>
		</Container>
	)
}

export default Settings
