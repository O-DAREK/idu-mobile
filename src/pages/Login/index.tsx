import { Button, Grid, Paper, TextField } from '@material-ui/core'
import iduLogo from 'assets/idu-logo.png'
import { Snackbar, TopLoading } from 'components'
import { useLocale } from 'locales'
import React, { useContext, useState } from 'react'
import { userStore } from 'stores'
import styled from 'styled-components'
import useAsync from 'use-async-react'

const PaddedGrid = styled(Grid)`
	padding: 20px;
`

const AbsoluteLogo = styled.img`
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
`

const Login: React.FC = () => {
	const { LOGIN, LOG_IN, PASSWORD, FAILED_LOGIN, SESSION_EXPIRED } = useLocale()
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const user = useContext(userStore)
	const { call: userLogin, loading, error } = useAsync(user.login)

	return (
		<>
			{user.forcedLogout && <Snackbar variant="warning">{SESSION_EXPIRED}</Snackbar>}
			{loading && <TopLoading />}
			{error && <Snackbar variant="error">{FAILED_LOGIN}</Snackbar>}
			<Grid
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '100%' }}
				container
			>
				<Grid xs={11} item>
					<Paper style={{ position: 'relative' }}>
						<AbsoluteLogo src={iduLogo} alt="IDU logo" />
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
								<Button variant="outlined" onClick={() => userLogin(login, password)}>
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
