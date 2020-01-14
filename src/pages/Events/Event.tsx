import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { createTime } from 'utils'

interface Props {
	name: string
	from: [number, number]
	to: [number, number]
	color: string
}

const ColoredPaper = styled(Paper)<{ color: string }>`
	border: 2px solid ${p => p.color};
	padding: 10px;
`

const Event: React.FC<Props> = ({ color, from, name, to }) => (
	<ColoredPaper color={color}>
		<Typography component="p" paragraph>
			{name}
		</Typography>
		<Typography variant="overline">{`${createTime(...from)}-${createTime(...to)}`}</Typography>
	</ColoredPaper>
)

export default Event
