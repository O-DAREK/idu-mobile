import { Divider, Grid } from '@material-ui/core'
import { Container } from 'components'
import React from 'react'
import ChangeLanguage from './ChangeLanguage'
import ChangeTheme from './ChangeTheme'
import Logout from './Logout'

const Settings: React.FC = () => {
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
					<Logout />
				</Grid>
			</Grid>
		</Container>
	)
}

export default Settings
