import { LinearProgress } from '@material-ui/core'
import styled from 'styled-components'

const TopLoading = styled(LinearProgress)`
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 1000000;
	background-color: rgba(0, 0, 0, 0);
`

export default TopLoading
