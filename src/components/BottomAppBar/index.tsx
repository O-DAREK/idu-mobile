import {
	AppBar as MuiAppBar,
	Badge,
	Fab,
	Grow,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Slide,
	SwipeableDrawer,
	Toolbar,
	Typography,
	Zoom
} from '@material-ui/core'
import { Restore as RestoreIcon, SvgIconComponent } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import EventIcon from '@material-ui/icons/Event'
import InfoIcon from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu'
import MessageIcon from '@material-ui/icons/Message'
import SendIcon from '@material-ui/icons/Send'
import SettingsIcon from '@material-ui/icons/Settings'
import { FlexGrow } from 'components'
import * as urls from 'constants/urls'
import { UNAUTHORIZED } from 'http-status-codes'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { metaStore, userStore } from 'stores'
import styled from 'styled-components'
import { emit, EventNames } from './events'

const Content = styled.div<{ pad: boolean }>`
	padding-bottom: ${p => (p.pad ? 90 : 0)}px;
	min-height: calc(100 * var(--visible-height, 1vh));
`

const AppBarBottom = styled(MuiAppBar)`
	top: auto;
	bottom: 0;
	position: fixed;
`

const Title = styled(Typography)`
	padding: 20px;
`

const MainFab = styled(Fab)<FabPlacement>`
	position: absolute;
	z-index: 1;
	top: -30px;
	${p =>
		p.placement === 'center'
			? `
	left: 0;
	right: 0;
	`
			: `
	right: 30px;
	`}
	margin: 0 auto;
`

type ClickableSvg = {
	Icon: SvgIconComponent
	onClick: () => void
}

type FabPlacement = {
	placement: 'center' | 'right'
}

interface InternalState {
	// test decides whether this state should be used
	test: RegExp
	title?: string
	fab?: ClickableSvg & FabPlacement
	actions?: ClickableSvg[]
}

interface NavigationElement {
	name: string
	url: string
	Icon: React.ElementType
}

/* ⚠ THIS IS A SMART COMPONENT, ITS STATE IS FULLY DEPENDANT ON THE CURRENT URL, NOT PROPS ⚠ */
const BottomAppBar: React.FC = observer(({ children }) => {
	const [openDrawer, setOpenDrawer] = useState(false)
	const [forceHide, setForceHide] = useState(false)
	const enterAnimationKey = useRef(0)
	const history = useHistory()
	const { MESSAGES, NEWS, SETTINGS, EVENTS } = useLocale()
	const user = useContext(userStore)
	const meta = useContext(metaStore)

	useEffect(() => {
		if (meta.isOnline)
			user.fetchProfile().catch(err => {
				if (err.status === UNAUTHORIZED) user.logout(true)
			})
	}, [meta.isOnline, user])

	// force hiding if user is focused on an input
	useEffect(() => {
		window.addEventListener('resize', () =>
			setForceHide(
				fh =>
					(document.activeElement?.tagName === 'INPUT' ||
						document.activeElement?.tagName === 'TEXTAREA') &&
					!fh
			)
		)
	}, [])

	// states of the BAB depending on the screen (= url)
	const states: InternalState[] = useMemo(
		() => [
			{
				test: new RegExp(String.raw`${urls.internal.messages()}$`),
				title: MESSAGES,
				fab: {
					Icon: AddIcon,
					onClick: () => history.push(urls.internal.newMessage()),
					placement: 'center'
				}
			},
			{
				test: new RegExp(String.raw`${urls.internal.newMessage()}$`),
				fab: {
					Icon: SendIcon,
					onClick: () => emit(EventNames.MESSAGES_SEND_NEW),
					placement: 'right'
				}
			},
			{
				test: new RegExp(String.raw`${urls.internal.news()}$`),
				title: NEWS
			},
			{
				test: new RegExp(urls.internal.settings()),
				title: SETTINGS,
				actions: [
					{
						Icon: RestoreIcon,
						onClick: () => emit(EventNames.SETTINGS_RESTORE)
					}
				]
			},
			{
				test: new RegExp(urls.internal.events()),
				title: EVENTS,
				actions: [
					{
						Icon: EventIcon,
						onClick: () => emit(EventNames.EVENTS_CALENDAR)
					}
				]
			}
		],
		[MESSAGES, NEWS, SETTINGS, EVENTS, history]
	)

	// navigation drawer options
	const navigation: NavigationElement[] = [
		{
			name: MESSAGES,
			url: urls.internal.messages(),
			Icon: () => (
				<Badge color="secondary" badgeContent={user.profile?.unreadMessagesCount} max={99}>
					<MessageIcon />
				</Badge>
			)
		},
		{
			name: EVENTS,
			url: urls.internal.events(),
			Icon: CalendarTodayIcon
		},
		{
			name: NEWS,
			url: urls.internal.news(),
			Icon: () => (
				<Badge color="secondary" badgeContent={user.profile?.unreadNewsCount} max={99}>
					<InfoIcon />
				</Badge>
			)
		},
		{
			name: SETTINGS,
			url: urls.internal.settings(),
			Icon: SettingsIcon
		}
	]

	const state = states.find(s => s.test.test(history.location.pathname))

	const show = !!state && !forceHide

	const { title, fab, actions } = state || {}

	return (
		<>
			<Content pad={show}>
				{title && <Title variant="h5">{title}</Title>}
				<Grow key={enterAnimationKey.current} in>
					<div>{children}</div>
				</Grow>
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
							selected={history.location.pathname === url}
							onClick={() => {
								enterAnimationKey.current = +new Date()
								history.push(url)
								setOpenDrawer(false)
							}}
							key={url}
							button
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
				<AppBarBottom>
					<Toolbar>
						<IconButton onClick={() => setOpenDrawer(true)} edge="start">
							<MenuIcon />
						</IconButton>
						{fab && (
							<Zoom in key={fab.placement}>
								<MainFab onClick={fab.onClick} placement={fab.placement} color="secondary">
									<fab.Icon color="action" />
								</MainFab>
							</Zoom>
						)}
						{fab?.placement !== 'right' && <FlexGrow />}
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
})

export default BottomAppBar
