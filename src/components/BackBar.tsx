import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'
import styled from 'styled-components'
import CleanLink from './CleanLink'

interface Props {
	to: string
}

const StickyBar = styled(AppBar)`
	position: sticky;
	background-color: ${p => p.theme.palette.background.default};
`

const BackBar: React.FC<Props> = ({ to }) => {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	})

	return (
		<StickyBar elevation={trigger ? 4 : 0}>
			<Toolbar>
				<CleanLink to={to}>
					<IconButton edge="start" color="default">
						<ArrowBackIcon />
					</IconButton>
				</CleanLink>
			</Toolbar>
		</StickyBar>
	)
}

export default BackBar
