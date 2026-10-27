import { Box, Divider, Stack } from '@mui/material'
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
			{/* each section keeps a wrapper: Stack spaces and resets margins of its direct children */}
			<Stack spacing={3}>
				<div>
					<ChangeLanguage />
				</div>
				<div>
					<Divider />
				</div>
				<div>
					<ChangeTheme />
				</div>
				<div>
					<Divider />
				</div>
				<div>
					<ChangeColors />
				</div>
				<div>
					<Divider />
				</div>
				<div>
					<Logout />
				</div>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<PWAInstall />
				</Box>
			</Stack>
		</Container>
	)
}

export default Settings
