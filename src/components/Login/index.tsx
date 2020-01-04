import { Button, Grid, Paper, TextField } from '@material-ui/core'
import Snackbar from 'components/Snackbar'
import { internal } from 'constants/urls'
import { useLocale } from 'locales'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { authStore } from 'stores'
import styled from 'styled-components'
import { usePromise } from 'utils/hooks'

const PaddedGrid = styled(Grid)`
	padding: 20px;
`

const Login: React.FC = () => {
	const { LOGIN, LOG_IN, PASSWORD, FAILED_LOGIN } = useLocale()
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const auth = useContext(authStore)
	const [authLogin, result, loading, error] = usePromise(auth.login)
	const history = useHistory()

	if (result) {
		history.push(internal.messages())
	}

	return (
		<>
			{error && <Snackbar variant="error">{FAILED_LOGIN}</Snackbar>}
			<Grid
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '100vh' }}
				container
			>
				<Grid xs={11} item>
					<Paper>
						<PaddedGrid
							direction="column"
							alignItems="center"
							justify="center"
							spacing={1}
							container
						>
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
								<Button variant="outlined" onClick={() => authLogin(login, password)}>
									{LOG_IN}
								</Button>
							</Grid>
						</PaddedGrid>
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}

export default Login
