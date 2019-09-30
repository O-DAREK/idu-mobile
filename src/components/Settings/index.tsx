import { Container as MuiContainer, Divider, Grid } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import ChangeLanguage from './ChangeLanguage'
import ChangeTheme from './ChangeTheme'

const Container = styled(MuiContainer)`
	padding-top: 20px;
	padding-bottom: 20px;
`

const Settings: React.FC = () => (
	<Container>
		<Grid direction="column" spacing={3} container>
			<Grid item>
				<ChangeLanguage />
			</Grid>
			<Grid item>
				<Divider />
			</Grid>
			<Grid item>
				<ChangeTheme />
			</Grid>
		</Grid>
	</Container>
)

export default Settings
