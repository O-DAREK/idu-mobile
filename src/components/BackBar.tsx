import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'
import { useHistory } from 'react-router'
import { useLastLocation } from 'react-router-last-location'
import styled from 'styled-components'

interface Props {
	to: string
	disableSmartBack?: boolean
}

const StickyBar = styled(AppBar)`
	position: sticky;
	background-color: ${p => p.theme.palette.background.default};
`

const BackBar: React.FC<Props> = ({ to, disableSmartBack = false }) => {
	const lastLocation = useLastLocation()
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	})
	const history = useHistory()

	const handleClick = () => {
		if (!disableSmartBack && lastLocation?.pathname === to) {
			history.goBack()
		} else {
			history.push(to)
		}
	}

	return (
		<StickyBar elevation={trigger ? 4 : 0}>
			<Toolbar>
				<IconButton onClick={handleClick} edge="start" color="default">
					<ArrowBackIcon />
				</IconButton>
			</Toolbar>
		</StickyBar>
	)
}

export default BackBar
