import MuiSnackbar from '@material-ui/core/Snackbar'
import { Alert, Color } from '@material-ui/lab'
import React, { useState } from 'react'

interface Props {
	variant: Color
	lifespan?: number
}

const Snackbar: React.FC<Props> = ({ variant, lifespan = 3000, children }) => {
	const [open, setOpen] = useState(true)

	return (
		<MuiSnackbar open={open} autoHideDuration={lifespan} onClose={() => setOpen(false)}>
			<Alert style={{ width: '100%' }} severity={variant} variant="filled">
				{children}
			</Alert>
		</MuiSnackbar>
	)
}

export default Snackbar
