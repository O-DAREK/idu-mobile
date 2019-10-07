import { BottomNavigation, BottomNavigationAction, Container } from '@material-ui/core'
import { CalendarToday, ChatBubble, Info } from '@material-ui/icons'
import { useLocale } from 'locales'
import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'
import MessageList from './MessageList'
import NewsList from './NewsList'

const Content = styled(Container)`
	margin-top: 20px;
	height: calc(var(--visible-height, 1vh) * 100 - 76px);
`

const Login: React.FC = () => {
	const [current, setCurrent] = useState(0)
	const { NEWS, MESSAGES, CALENDAR } = useLocale()

	return (
		<>
			<SwipeableViews index={current} onChangeIndex={i => setCurrent(i)}>
				<Content>
					<NewsList />
				</Content>
				<Content>
					<MessageList />
				</Content>
				<Content>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum tempore at, ipsa esse
					consequuntur maxime vero velit distinctio delectus assumenda placeat commodi similique,
					dignissimos ducimus soluta molestiae aspernatur magni voluptatem nisi modi, illum numquam.
					Rerum soluta quae expedita ipsam quibusdam! At laudantium non beatae facere accusantium
					quo omnis itaque hic, enim in provident dolorem veritatis? In harum veniam iste
					consequuntur possimus. Nulla, similique voluptas expedita quis voluptate necessitatibus
					facilis aut ab asperiores molestiae vel magni illo deleniti sed repellendus officiis
					dignissimos provident! Magnam adipisci totam sunt debitis ipsa asperiores fugiat saepe
					optio necessitatibus eveniet esse possimus, doloribus et. Obcaecati, maiores sint minus
					possimus debitis dolorum distinctio. Dolor sit ut labore aut ea sapiente et perspiciatis
					obcaecati ad praesentium aliquid repellendus facilis, beatae cupiditate aspernatur
					molestiae possimus adipisci laborum eum magnam dignissimos ratione nobis excepturi. Fugit
					aut sequi rerum voluptas! Cumque similique accusamus saepe, blanditiis odio ipsam
					accusantium eum. Tenetur saepe architecto voluptas totam suscipit ut nemo accusamus,
					eaque, facere asperiores dolor. Nostrum voluptate aut reprehenderit animi? Facere amet
					dignissimos ducimus necessitatibus qui, itaque ex soluta quam aspernatur non a nihil
					veritatis accusantium corrupti maiores dolorum animi eos est totam odio porro? Hic dolorum
					id blanditiis soluta sequi obcaecati alias qui.
				</Content>
			</SwipeableViews>
			<BottomNavigation value={current} onChange={(_, newValue) => setCurrent(newValue)} showLabels>
				<BottomNavigationAction label={NEWS} icon={<Info />} />
				<BottomNavigationAction label={MESSAGES} icon={<ChatBubble />} />
				<BottomNavigationAction label={CALENDAR} icon={<CalendarToday />} />
			</BottomNavigation>
		</>
	)
}

export default Login
