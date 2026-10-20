import { Button, Paper, Stack, TextField } from '@mui/material'
import iduLogo from 'assets/idu-logo.png'
import { Snackbar, TopLoading } from 'components'
import { useLocale } from 'locales'
import React, { useContext, useState } from 'react'
import { userStore } from 'stores'
import styled from 'styled-components'
import useAsync from 'utils/useAsync'

// reproduces the legacy grid spacing: 8px more space above the first field, while the card's -8px
// margin keeps it at the same vertical position
const PaddedStack = styled(Stack)`
	padding: 28px 20px 20px;
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
			<Stack alignItems="center" justifyContent="center" style={{ minHeight: '100%' }}>
				<Paper style={{ position: 'relative', maxWidth: `${(11 / 12) * 100}%`, marginTop: -8 }}>
					<AbsoluteLogo src={iduLogo} alt="IDU logo" />
					<PaddedStack alignItems="center" justifyContent="center" spacing={1}>
						<TextField
							label={LOGIN}
							variant="outlined"
							value={login}
							onChange={e => setLogin(e.target.value)}
						/>
						<TextField
							type="password"
							label={PASSWORD}
							variant="outlined"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<Button variant="outlined" onClick={() => userLogin(login, password)}>
							{LOG_IN}
						</Button>
					</PaddedStack>
				</Paper>
			</Stack>
		</>
	)
}

export default Login
