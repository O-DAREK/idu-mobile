import { Typography } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { stripHtml } from 'utils'

const StrippedHtml = styled(({ children, ...rest }) => (
	<Typography children={stripHtml(children)} {...rest} />
))`
	overflow-wrap: break-word;
	white-space: pre-line;
` as typeof Typography

export default StrippedHtml
