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
	Typography
} from '@material-ui/core'
import { Restore as RestoreIcon, SvgIconComponent } from '@material-ui/icons'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import EventIcon from '@material-ui/icons/Event'
import InfoIcon from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu'
import MessageIcon from '@material-ui/icons/Message'
import SettingsIcon from '@material-ui/icons/Settings'
import { FlexGrow } from 'components'
import * as urls from 'constants/urls'
import { UNAUTHORIZED } from 'http-status-codes'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useMemo, useState } from 'react'
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
const BottomAppBar: React.FC = observer(({ children }) => {
	const [openDrawer, setOpenDrawer] = useState(false)
	const [forceHide, setForceHide] = useState(false)
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

	const states: { [key: string]: InternalProps } = useMemo(
		() => ({
			[urls.internal.messages()]: {
				title: MESSAGES
			},
			[urls.internal.news()]: {
				title: NEWS
			},
			[urls.internal.settings()]: {
				title: SETTINGS,
				actions: [
					{
						Icon: RestoreIcon,
						onClick: () => emit(EventNames.SETTINGS_RESTORE)
					}
				]
			},
			[urls.internal.events()]: {
				title: EVENTS,
				actions: [
					{
						Icon: EventIcon,
						onClick: () => emit(EventNames.EVENTS_CALENDAR)
					}
				]
			}
		}),
		[MESSAGES, NEWS, SETTINGS, EVENTS]
	)

	const navigation = [
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

	const show = history.location.pathname in states && !forceHide

	const { title, fab, actions } = states[history.location.pathname] || {}

	return (
		<>
			<Content pad={show}>
				{title && <Title variant="h5">{title}</Title>}
				<Grow in={true} key={title}>
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
				<AppBarBottom>
					<Toolbar>
						<IconButton onClick={() => setOpenDrawer(true)} edge="start">
							<MenuIcon />
						</IconButton>
						{fab && (
							<MiddleFab onClick={fab.onClick} color="secondary">
								<fab.Icon />
							</MiddleFab>
						)}
						<FlexGrow />
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
