import { SvgIcon } from '@material-ui/core'
import { amber, green } from '@material-ui/core/colors'
import MuiSnackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import React, { useState } from 'react'
import styled from 'styled-components'

type Variant = 'success' | 'warning' | 'error' | 'info'

const variantIcon: { [key in Variant]: typeof SvgIcon } = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon
}

interface Props {
	variant: Variant
	lifespan?: number
}

const Snackbar: React.FC<Props> = ({ variant, lifespan = 3000, children }) => {
	const [open, setOpen] = useState(true)
	const Icon = variantIcon[variant]

	const Content = styled(SnackbarContent)`
		background-color: ${p => {
			switch (variant) {
				case 'success':
					return green[600]
				case 'error':
					return p.theme.palette.error.dark
				case 'info':
					return p.theme.palette.primary.main
				case 'warning':
					return amber[700]
			}
		}};
	`

	const Message = styled.span`
		display: flex;
		align-items: center;
	`

	const MsgIcon = styled(Icon)`
		opacity: 0.9;
		margin-right: ${p => p.theme.spacing(1)}px;
		font-size: 20px;
	`

	return (
		<MuiSnackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			open={open}
			autoHideDuration={lifespan}
			onClose={() => setOpen(false)}
		>
			<Content
				message={
					<Message>
						<MsgIcon />
						{children}
					</Message>
				}
			/>
		</MuiSnackbar>
	)
}

export default Snackbar
