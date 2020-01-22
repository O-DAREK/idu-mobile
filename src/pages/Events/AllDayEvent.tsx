import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import React, { ComponentProps } from 'react'

interface Props {
	bgColor: string
	textColor: string
}

const AllDayEvent = styled(({ bgColor, textColor, ...rest }) => <Paper {...rest} />)<Props>`
	padding: 10px;
	color: ${p => p.textColor};
	background-color: ${p => p.bgColor};
	max-width: 200px;
	min-height: 50px;
	margin: 10px;
	flex: 0 0 auto;
` as React.FC<ComponentProps<typeof Paper> & Props>

export default AllDayEvent
