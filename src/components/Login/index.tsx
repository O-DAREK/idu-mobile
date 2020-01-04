import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { internal } from 'constants/urls'
import { useLocale } from 'locales'
import React, { useCallback, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { authStore } from 'stores'
import styled from 'styled-components'
import { toast } from 'utils/toast'

const PaddedGrid = styled(Grid)`
	padding: 20px;
`

const Login: React.FC = () => {
	const { LOGIN, LOG_IN, PASSWORD, SUCCESSFUL_LOGIN, FAILED_LOGIN } = useLocale()
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const auth = useContext(authStore)
	const history = useHistory()

	const handleSubmit = useCallback(
		() =>
			auth
				.login(login, password)
				.then(() => {
					toast.success(SUCCESSFUL_LOGIN)
					history.push(internal.root())
				})
				.catch(() => {
					toast.error(FAILED_LOGIN)
				}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

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
							<TextField
								label={LOGIN}
								variant="outlined"
								value={login}
								onChange={e => setLogin(e.target.value)}
							/>
						</Grid>
						<Grid item>
							<TextField
								label={PASSWORD}
								variant="outlined"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item>
							<Button variant="outlined" onClick={handleSubmit}>
								{LOG_IN}
							</Button>
						</Grid>
					</PaddedGrid>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default Login
