import {
	AppBar as MuiAppBar,
	Fab,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	SwipeableDrawer,
	Toolbar,
	Typography
} from '@material-ui/core'
import { SvgIconComponent } from '@material-ui/icons'
import InfoIcon from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu'
import MessageIcon from '@material-ui/icons/Message'
import MoreIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import { internal } from 'constants/urls'
import { useLocale } from 'locales'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
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
	const [openDrawer, setOpenDrawer] = useState(false)
	const history = useHistory()
	const { MESSAGES, NEWS, SETTINGS } = useLocale()
	const navigation = [
		{
			name: MESSAGES,
			url: internal.messages(),
			Icon: MessageIcon
		},
		{
			name: NEWS,
			url: internal.news(),
			Icon: InfoIcon
		},
		{
			name: SETTINGS,
			url: internal.settings(),
			Icon: SettingsApplicationsIcon
		}
	]

	return (
		<>
			<Content square>
				{title && <Title variant="h5">{title}</Title>}
				{children}
			</Content>
			<SwipeableDrawer
				anchor="bottom"
				open={openDrawer}
				onOpen={() => setOpenDrawer(true)}
				onClose={() => setOpenDrawer(false)}
			>
				<List component="nav">
					{navigation.map(({ name, url, Icon }) => (
						<ListItem button onClick={() => history.push(url)} key={url}>
							<ListItemIcon>
								<Icon />
							</ListItemIcon>
							<ListItemText primary={name} />
						</ListItem>
					))}
				</List>
			</SwipeableDrawer>
			<AppBarBottom position="fixed">
				<Toolbar>
					<IconButton onClick={() => setOpenDrawer(true)} edge="start">
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
