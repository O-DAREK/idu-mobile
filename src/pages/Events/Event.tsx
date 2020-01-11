import { Typography } from '@material-ui/core'
import { PaddedPaper } from 'components'
import React from 'react'

interface Props {
	name: string
	from: [number, number]
	to: [number, number]
	color: string
	textColor: string
}

const Event: React.FC<Props> = ({ color, from, name, textColor, to }) => (
	<PaddedPaper color={color}>
		<Typography component="p" paragraph>
			{name}
		</Typography>
		<Typography variant="overline">{`${from[0]}:${from[1]}-${to[0]}:${to[1]}`}</Typography>
	</PaddedPaper>
)

export default Event
