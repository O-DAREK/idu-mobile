import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core'
import { BackBar, Container, Snackbar, TopLoading } from 'components'
import { buildListen, EventNames } from 'components/BottomAppBar/events'
import * as urls from 'constants/urls'
import { useLocale } from 'locales'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { messagesStore, userStore } from 'stores'
import useAsync from 'use-async-react'
import AutocompleteRecipients from './AutocompleteRecipients'

const NewMessage: React.FC = () => {
	const { TITLE, COPY_ON_MAIL, ERROR_GENERIC } = useLocale()
	const user = useContext(userStore)
	const messages = useContext(messagesStore)
	const [formData, setFormData] = useState({
		recipients: [] as number[],
		title: '',
		body: '',
		sendCopyToMail: false
	})
	const [showValidity, setShowValidity] = useState(false)
	const { call: createThread, loading, error, result } = useAsync(messages.createThread)
	const history = useHistory()

	const bads: { [key in keyof typeof formData]: boolean } = {
		recipients: formData.recipients.length === 0,
		title: formData.title.length === 0,
		body: formData.body.length === 0,
		sendCopyToMail: false
	}
	const valid = Object.values(bads).every(e => !e)

	useEffect(() => {
		// disable event listener if it already dispatched an API call
		if (!loading)
			return buildListen(EventNames.MESSAGES_SEND_NEW, () => {
				if (valid && user.token) {
					createThread(
						user.token,
						formData.recipients,
						formData.title,
						formData.body,
						formData.sendCopyToMail
					)
				}
				setShowValidity(true)
			})
	}, [loading, valid, formData, user, createThread])

	useEffect(() => {
		if (result) {
			history.push(urls.internal.messages())
		}
	}, [result, history])

	return (
		<>
			{loading && <TopLoading />}
			{error && <Snackbar variant="error">{ERROR_GENERIC}</Snackbar>}
			<BackBar to={urls.internal.messages()} />
			<Container>
				<Grid spacing={2} container>
					<Grid xs={12} item>
						<AutocompleteRecipients
							onSelect={ids => setFormData(prevState => ({ ...prevState, recipients: ids }))}
							error={showValidity && bads.recipients}
						/>
					</Grid>
					<Grid xs={6} item>
						<TextField
							label={TITLE}
							variant="outlined"
							error={showValidity && bads.title}
							value={formData.title}
							onChange={({ target: { value } }) =>
								setFormData(prevState => ({ ...prevState, title: value }))
							}
							fullWidth
						/>
					</Grid>
					<Grid xs={12} item>
						<TextField
							variant="outlined"
							rows="6"
							error={showValidity && bads.body}
							value={formData.body}
							onChange={({ target: { value } }) =>
								setFormData(prevState => ({ ...prevState, body: value }))
							}
							multiline
							fullWidth
						/>
					</Grid>
					<Grid item>
						<FormControlLabel
							control={
								<Checkbox
									checked={formData.sendCopyToMail}
									onChange={({ target: { checked } }) =>
										setFormData(prevState => ({ ...prevState, sendCopyToMail: checked }))
									}
								/>
							}
							label={COPY_ON_MAIL}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default NewMessage
