import { Grid, IconButton, Typography } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { userStore } from 'stores'

const Logout: React.FC = observer(() => {
	const { LOG_OUT } = useLocale()
	const user = useContext(userStore)

	return (
		<Grid alignItems="center" justify="space-between" container>
			<Grid item>
				<Typography>{LOG_OUT}</Typography>
			</Grid>
			<Grid item>
				<IconButton onClick={user.logout}>
					<ExitToApp />
				</IconButton>
			</Grid>
		</Grid>
	)
})

export default Logout
