import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { CalendarToday, ChatBubble, Info } from '@material-ui/icons'
import { useLocale } from 'locales'
import React, { useState } from 'react'
import styled from 'styled-components'

const Content = styled.div`
	height: calc(var(--visible-height, 1vh) * 100 - 56px);
`

const Login: React.FC = () => {
	const [current, setCurrent] = useState(0)
	const { NEWS, MESSAGES, CALENDAR } = useLocale()

	return (
		<>
			<Content>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nam impedit et deserunt.
				Deleniti, magnam suscipit iure similique velit error dolor numquam a quam, ex in corporis!
				Ullam exercitationem, esse natus ea molestias alias consequuntur enim, ducimus doloremque
				recusandae cupiditate veritatis labore explicabo quam maiores distinctio quibusdam,
				voluptate mollitia velit odit magnam! Rerum consequatur quae, obcaecati explicabo beatae
				pariatur voluptatem, facilis laudantium odio repellat cum perferendis dolores, porro
				dolorem!
			</Content>
			<BottomNavigation value={current} onChange={(_, newValue) => setCurrent(newValue)} showLabels>
				<BottomNavigationAction label={NEWS} icon={<Info />} />
				<BottomNavigationAction label={MESSAGES} icon={<ChatBubble />} />
				<BottomNavigationAction label={CALENDAR} icon={<CalendarToday />} />
			</BottomNavigation>
		</>
	)
}

export default Login
