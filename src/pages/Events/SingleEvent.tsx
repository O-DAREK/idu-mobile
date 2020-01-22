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

const AccentedPaper = styled(Paper)<{ accent: string }>`
	border: 2px solid ${p => p.accent};
	padding: 10px;
`

const SingleEvent: React.FC<Props> = ({ color, from, name, to }) => (
	<AccentedPaper accent={color}>
		<Typography component="p" paragraph>
			{name}
		</Typography>
		<Typography variant="overline">{`${createTime(...from)}-${createTime(...to)}`}</Typography>
	</AccentedPaper>
)

export default SingleEvent
