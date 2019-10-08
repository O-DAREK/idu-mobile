import { AppBar as MuiAppBar, Fab, IconButton, Paper, Toolbar, Typography } from '@material-ui/core'
import { SvgIconComponent } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import styled from 'styled-components'

const Grow = styled.div`
	flex-grow: 1;
`

const Content = styled(Paper)`
	padding-bottom: 90px;
	min-height: calc(100 * var(--visible-height, 1vh));
`

const AppBarBottom = styled(MuiAppBar)`
	top: auto;
	bottom: 0;
`

const Title = styled(Typography)`
	padding: 20px;
`

const MiddleFab = styled(Fab)`
	position: absolute;
	z-index: 1;
	top: -30px;
	left: 0;
	right: 0;
	margin: 0 auto;
`

interface Props {
	title?: string
	FabIcon?: SvgIconComponent
	onFabClick?: () => void
}

const BottomAppBar: React.FC<Props> = ({ children, title, onFabClick, FabIcon }) => {
	return (
		<>
			<Content square>
				{title && <Title variant="h5">{title}</Title>}
				{children}
			</Content>
			<AppBarBottom position="fixed">
				<Toolbar>
					<IconButton edge="start">
						<MenuIcon />
					</IconButton>
					{FabIcon && (
						<MiddleFab onClick={onFabClick} color="secondary">
							<FabIcon />
						</MiddleFab>
					)}
					<Grow />
					<IconButton>
						<SearchIcon />
					</IconButton>
					<IconButton edge="end">
						<MoreIcon />
					</IconButton>
				</Toolbar>
			</AppBarBottom>
		</>
	)
}

export default BottomAppBar
