import MuiSnackbar, { SnackbarProps } from '@mui/material/Snackbar'
import { Alert, AlertColor, AlertProps, AlertTitle, Button } from '@mui/material'
import React, { useState } from 'react'

interface Props extends Omit<Partial<SnackbarProps>, 'children' | 'action'> {
	variant: AlertColor
	lifespan?: number
	position?: 'bottom' | 'BAB' | 'top'
	dismissible?: boolean
	title?: string
	action?: {
		text: string
		onClick: () => void
	}
	children: AlertProps['children']
}

const Snackbar: React.FC<Props> = ({
	variant,
	lifespan = 3000,
	position = 'bottom',
	children,
	dismissible = false,
	title,
	action,
	...props
}) => {
	const [open, setOpen] = useState(true)

	return (
		<MuiSnackbar
			anchorOrigin={position === 'top' ? { horizontal: 'center', vertical: 'top' } : undefined}
			open={open}
			autoHideDuration={lifespan === Infinity ? undefined : lifespan}
			onClose={(_, reason) => reason !== 'clickaway' && setOpen(false)}
			{...props}
		>
			<Alert
				style={{ width: '100%' }}
				severity={variant}
				action={
					action ? (
						<Button color="inherit" size="small" onClick={action.onClick} children={action.text} />
					) : undefined
				}
				onClose={dismissible ? () => setOpen(false) : undefined}
			>
				{title && <AlertTitle>{title}</AlertTitle>}
				{children}
			</Alert>
		</MuiSnackbar>
	)
}

export default Snackbar
