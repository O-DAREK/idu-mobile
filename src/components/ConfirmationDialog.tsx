import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Snackbar, TopLoading } from 'components'
import { useLocale } from 'locales'
import React, { useState } from 'react'

interface Props {
	onConfirm?: () => void
	/* acts like onConfirm, but waits for the promise to resolve before closing */
	waitFor?: () => Promise<unknown>
}

const ConfirmationDialog: React.FC<Props> = ({ waitFor, onConfirm, children }) => {
	const { CONFIRM, CONFIRM_TO_CONTINUE, FAILED_TO_CONFIRM } = useLocale()
	const [open, setOpen] = useState(true)
	const [failed, setFailed] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleClick = async () => {
		onConfirm?.()

		if (waitFor) {
			setLoading(true)
			setFailed(false)
			try {
				await waitFor()
				setOpen(false)
			} catch {
				setFailed(true)
			}
			setLoading(false)
		}
	}

	return (
		<>
			{loading && <TopLoading />}
			{failed && <Snackbar variant="error">{FAILED_TO_CONFIRM}</Snackbar>}
			<Dialog fullScreen open={open}>
				<DialogTitle>{CONFIRM_TO_CONTINUE}</DialogTitle>
				<DialogContent dividers>{children}</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClick} color="primary">
						{CONFIRM}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ConfirmationDialog
