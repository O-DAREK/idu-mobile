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
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import EventIcon from '@material-ui/icons/Event'
import InfoIcon from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu'
import MessageIcon from '@material-ui/icons/Message'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import { internal } from 'constants/urls'
import { useLocale } from 'locales'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { eev, EventNames } from './events'

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

type ClickableSvg = {
	Icon: SvgIconComponent
	onClick: () => void
}

interface InternalProps {
	title?: string
	fab?: ClickableSvg
	actions?: ClickableSvg[]
}

/* ⚠ THIS IS A SMART COMPONENT, ITS STATE IS FULLY DEPENDANT ON THE CURRENT URL, NOT PROPS ⚠ */
const BottomAppBar: React.FC = ({ children }) => {
	const [openDrawer, setOpenDrawer] = useState(false)
	const history = useHistory()
	const { MESSAGES, NEWS, SETTINGS, EVENTS } = useLocale()

	const states: { [key: string]: InternalProps } = {
		[internal.messages()]: {
			title: MESSAGES
		},
		[internal.news()]: {
			title: NEWS
		},
		[internal.settings()]: {
			title: SETTINGS
		},
		[internal.events()]: {
			title: EVENTS,
			actions: [
				{
					Icon: EventIcon,
					onClick: () => eev.emit(EventNames.EVENTS_CALENDAR)
				}
			]
		}
	}

	const navigation = [
		{
			name: MESSAGES,
			url: internal.messages(),
			Icon: MessageIcon
		},
		{
			name: EVENTS,
			url: internal.events(),
			Icon: CalendarTodayIcon
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

	if (!(history.location.pathname in states)) {
		return <>{children}</>
	}

	const { title, fab, actions } = states[history.location.pathname]

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
						<ListItem
							button
							selected={history.location.pathname === url}
							onClick={() => {
								history.push(url)
								setOpenDrawer(false)
							}}
							key={url}
						>
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
					{fab && (
						<MiddleFab onClick={fab.onClick} color="secondary">
							<fab.Icon />
						</MiddleFab>
					)}
					<Grow />
					{actions?.map(({ onClick, Icon }, i) => (
						<IconButton onClick={onClick} key={i}>
							<Icon />
						</IconButton>
					))}
				</Toolbar>
			</AppBarBottom>
		</>
	)
}

export default BottomAppBar
