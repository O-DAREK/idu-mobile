import { Typography } from '@material-ui/core'
import React, { ComponentProps } from 'react'
import styled from 'styled-components'
import { stripHtml } from 'utils'

const StrippedHtml = styled(({ children, ...rest }: ComponentProps<typeof Typography>) => (
	<Typography children={stripHtml(children as string)} {...rest} />
))`
	overflow-wrap: break-word;
	white-space: pre-line;
` as typeof Typography

export default StrippedHtml
