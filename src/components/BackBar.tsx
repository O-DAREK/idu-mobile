import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLastLocation } from 'utils/LastLocation'
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
	const navigate = useNavigate()

	const handleClick = () => {
		if (!disableSmartBack && lastLocation?.pathname === to) {
			navigate(-1)
		} else {
			navigate(to)
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
