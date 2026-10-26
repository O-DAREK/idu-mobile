import { Button, Paper, Stack, TextField } from '@mui/material'
import iduLogo from 'assets/idu-logo.png'
import { Snackbar, TopLoading, Turnstile } from 'components'
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

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

const Login: React.FC = () => {
	const { LOGIN, LOG_IN, PASSWORD, FAILED_LOGIN, SESSION_EXPIRED } = useLocale()
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const user = useContext(userStore)
	const { call: userLogin, loading, error } = useAsync(user.login)
	const [turnstileToken, setTurnstileToken] = useState<string>()
	const [attempt, setAttempt] = useState(0)

	const submit = () => {
		userLogin(login, password, turnstileToken)
		// the token is single-use, so every attempt needs a fresh widget
		setAttempt(a => a + 1)
	}

	return (
		<>
			{user.forcedLogout && <Snackbar variant="warning">{SESSION_EXPIRED}</Snackbar>}
			{loading && <TopLoading />}
			{error && <Snackbar variant="error">{FAILED_LOGIN}</Snackbar>}
			<Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
				<Paper style={{ position: 'relative', maxWidth: `${(11 / 12) * 100}%`, marginTop: -8 }}>
					<AbsoluteLogo src={iduLogo} alt="IDU logo" />
					<PaddedStack sx={{ alignItems: 'center', justifyContent: 'center' }} spacing={1}>
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
						{turnstileSiteKey && (
							<Turnstile key={attempt} siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
						)}
						<Button
							variant="outlined"
							disabled={loading || (!!turnstileSiteKey && !turnstileToken)}
							onClick={submit}
						>
							{LOG_IN}
						</Button>
					</PaddedStack>
				</Paper>
			</Stack>
		</>
	)
}

export default Login
