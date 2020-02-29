import { Divider, Grid } from '@material-ui/core'
import { Container } from 'components'
import { buildListen, EventNames } from 'components/BottomAppBar/events'
import React, { useContext, useEffect } from 'react'
import { configStore } from 'stores'
import ChangeColors from './ChangeColors'
import ChangeLanguage from './ChangeLanguage'
import ChangeTheme from './ChangeTheme'
import Logout from './Logout'
import PWAInstall from './PWAInstall'

const Settings: React.FC = () => {
	const config = useContext(configStore)
	useEffect(() => buildListen(EventNames.SETTINGS_RESTORE, config.reset), [config])

	return (
		<Container>
			<Grid direction="column" spacing={3} container>
				<Grid style={{ width: '100%' }} item>
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
					<ChangeColors />
				</Grid>
				<Grid item>
					<Divider />
				</Grid>
				<Grid item>
					<Logout />
				</Grid>
				<Grid alignItems="center" justify="center" container item>
					<Grid item>
						<PWAInstall />
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Settings
