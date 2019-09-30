import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const PaddedGrid = styled(Grid)`
	padding: 20px;
`

const Login: React.FC = () => (
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
						<TextField label="Login" variant="outlined" />
					</Grid>
					<Grid item>
						<TextField label="Password" variant="outlined" />
					</Grid>
					<Grid item>
						<Button variant="outlined">Login </Button>
					</Grid>
				</PaddedGrid>
			</Paper>
		</Grid>
	</Grid>
)

export default Login
