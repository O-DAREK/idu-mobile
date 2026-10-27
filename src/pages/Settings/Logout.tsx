import { Grid, IconButton, Typography } from '@mui/material'
import ExitToApp from '@mui/icons-material/ExitToApp'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { userStore } from 'stores'

const Logout: React.FC = observer(() => {
	const { LOG_OUT } = useLocale()
	const user = useContext(userStore)

	return (
		<Grid sx={{ alignItems: 'center', justifyContent: 'space-between' }} container>
			<Grid>
				<Typography>{LOG_OUT}</Typography>
			</Grid>
			<Grid>
				<IconButton onClick={() => user.logout()} size="large">
					<ExitToApp />
				</IconButton>
			</Grid>
		</Grid>
	)
})

export default Logout
