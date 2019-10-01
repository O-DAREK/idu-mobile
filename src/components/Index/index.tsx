import { BottomNavigation, BottomNavigationAction, Container } from '@material-ui/core'
import { CalendarToday, ChatBubble, Info } from '@material-ui/icons'
import { useLocale } from 'locales'
import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'
import MessageList from './MessageList'

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
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis minus necessitatibus
					mollitia tenetur placeat commodi, ratione odio harum rerum dolor. Vel eius illum
					laboriosam obcaecati ducimus non voluptate nobis tenetur in veritatis, ut quae voluptates
					reprehenderit molestiae atque natus molestias dolore. Id recusandae corporis culpa quae
					necessitatibus debitis. Beatae facere dolorum quam optio fugiat praesentium, quidem
					deleniti deserunt dignissimos voluptatum? Ducimus minus aliquid, est non possimus
					reprehenderit. Dolor temporibus quod voluptatem iusto eveniet, rerum nostrum tempore eum
					dolorem aspernatur accusantium a maiores error modi nemo repellendus non rem labore!
					Dolorum repudiandae mollitia excepturi, doloremque, fuga dolore corporis architecto
					voluptas asperiores hic recusandae optio earum dignissimos tempora nesciunt. Maiores
					reiciendis laborum voluptatum pariatur, nisi, eum provident quod labore iste dolore omnis
					deleniti! Nostrum itaque iusto doloribus vel nesciunt beatae veritatis nihil perspiciatis.
					Enim, harum. Ipsa nisi dolorum id, sunt ea optio totam adipisci quae a, ipsum atque
					quisquam inventore officia minus soluta, commodi harum vel eligendi. Unde impedit, qui
					deleniti possimus pariatur at itaque commodi obcaecati! Commodi, nihil. Et nesciunt magnam
					provident ad commodi tempora vel rerum nihil, velit natus? Incidunt, reprehenderit
					adipisci repellat nisi numquam accusamus repudiandae totam nostrum iure perspiciatis eius
					voluptates blanditiis, tempora deserunt vero omnis debitis fuga.
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
