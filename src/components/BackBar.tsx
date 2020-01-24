import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'
import CleanLink from './CleanLink'

interface Props {
	to: string
}

const BackBar: React.FC<Props> = ({ to }) => (
	<AppBar position="sticky">
		<Toolbar>
			<CleanLink to={to}>
				<IconButton edge="start" color="inherit">
					<ArrowBackIcon />
				</IconButton>
			</CleanLink>
		</Toolbar>
	</AppBar>
)

export default BackBar
