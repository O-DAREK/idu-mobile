import { Typography } from '@material-ui/core'
import { formatLong } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { configStore, userStore } from 'stores'
import styled from 'styled-components'

interface Props {
	date: Date
}

const Title = styled(Typography)`
	margin-left: 20px;
`

const DayList: React.FC<Props> = observer(({ date }) => {
	const config = useContext(configStore)
	const user = useContext(userStore)

	return (
		<>
			<Title variant="h6">{formatLong(config.language, date)}</Title>
			{/* {user.events?.map(e => (
				<Event
					key={e.id}
					name={e.name}
					from={[11, 23]}
					to={[12, 32]}
					color="#ff0000"
					textColor="#ffffff"
				/>
			))} */}
		</>
	)
})

export default DayList
