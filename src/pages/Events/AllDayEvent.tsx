import { Paper } from '@mui/material'
import styled from 'styled-components'

interface Props {
	$bgColor: string
	$textColor: string
}

const AllDayEvent = styled(Paper)<Props>`
	padding: 10px;
	color: ${p => p.$textColor};
	background-color: ${p => p.$bgColor};
	max-width: 200px;
	min-height: 50px;
	margin: 10px;
	flex: 0 0 auto;
`

export default AllDayEvent
