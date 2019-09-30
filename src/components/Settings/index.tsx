import { Container as MuiContainer } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import ChangeSettings from './ChangeLanguage'

const Container = styled(MuiContainer)`
	padding-top: 20px;
	padding-bottom: 20px;
`

const Settings: React.FC = () => (
	<Container>
		<ChangeSettings />
	</Container>
)

export default Settings
