import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { useLocale } from 'locales'
import React from 'react'
import styled from 'styled-components'

const PaddedGrid = styled(Grid)`
	padding: 20px;
`

const Login: React.FC = () => {
	const { LOGIN, LOG_IN, PASSWORD } = useLocale()

	return (
		<Grid
			direction="column"
			alignItems="center"
			justify="center"
			style={{ minHeight: '100vh' }}
			container
		>
			<Grid xs={11} item>
				<Paper>
					<PaddedGrid direction="column" alignItems="center" justify="center" spacing={1} container>
						<Grid item>
							<TextField label={LOGIN} variant="outlined" />
						</Grid>
						<Grid item>
							<TextField label={PASSWORD} variant="outlined" />
						</Grid>
						<Grid item>
							<Button variant="outlined">{LOG_IN}</Button>
						</Grid>
					</PaddedGrid>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default Login
