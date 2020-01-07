import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { Snackbar, TopLoading } from 'components'
import { internal } from 'constants/urls'
import { useLocale } from 'locales'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { userStore } from 'stores'
import styled from 'styled-components'
import { usePromise } from 'utils/hooks'

const PaddedGrid = styled(Grid)`
	padding: 20px;
`

const Login: React.FC = () => {
	const { LOGIN, LOG_IN, PASSWORD, FAILED_LOGIN } = useLocale()
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const auth = useContext(userStore)
	const [authLogin, result, loading, error] = usePromise(auth.login)
	const history = useHistory()

	if (result) {
		history.push(internal.messages())
	}

	return (
		<>
			{loading && <TopLoading />}
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
									type="password"
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
