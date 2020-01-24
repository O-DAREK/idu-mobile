import {
	AppBar as MuiAppBar,
	Fab,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Slide,
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
import SettingsIcon from '@material-ui/icons/Settings'
import { internal } from 'constants/urls'
import { useLocale } from 'locales'
import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { eev, EventNames } from './events'

const Grow = styled.div`
	flex-grow: 1;
`

const Content = styled.div<{ pad: boolean }>`
	padding-bottom: ${p => (p.pad ? 90 : 0)}px;
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

	const states: { [key: string]: InternalProps } = useMemo(
		() => ({
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
		}),
		[MESSAGES, NEWS, SETTINGS, EVENTS]
	)

	const navigation = useMemo(
		() => [
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
				Icon: SettingsIcon
			}
		],
		[MESSAGES, NEWS, SETTINGS, EVENTS]
	)

	const show = history.location.pathname in states

	const { title, fab, actions } = states[history.location.pathname] || {}

	return (
		<>
			<Content pad={show}>
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
			<Slide direction="up" in={show}>
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
			</Slide>
		</>
	)
}

export default BottomAppBar
