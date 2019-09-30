import { Grid, IconButton, Typography } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React from 'react'

const Logout: React.FC = observer(() => {
	const { LOG_OUT } = useLocale()

	return (
		<Grid alignItems="center" justify="space-between" container>
			<Grid item>
				<Typography>{LOG_OUT}</Typography>
			</Grid>
			<Grid item>
				<IconButton>
					<ExitToApp />
				</IconButton>
			</Grid>
		</Grid>
	)
})

export default Logout
