import { Container, IconButton, Input, InputAdornment } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { Snackbar } from 'components'
import { UNAUTHORIZED } from 'http-status-codes'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useRef } from 'react'
import { messagesStore, metaStore, userStore } from 'stores'
import styled from 'styled-components'
import useAsync from 'use-async-react'

interface Props {
	threadId: number
}

const StickyContainer = styled(Container)`
	position: sticky;
	bottom: 1px;
	background-color: ${p => p.theme.palette.background.default};
`

const MessageBox: React.FC<Props> = observer(({ threadId }) => {
	const { MESSAGE_PLACEHOLDER, ERROR_GENERIC } = useLocale()
	const user = useContext(userStore)
	const messages = useContext(messagesStore)
	const meta = useContext(metaStore)
	const messageRef = useRef<HTMLInputElement | undefined>()
	const { call: sendMessage, loading, error, result } = useAsync(messages.sendMessage)

	const disabled = loading || !meta.isOnline

	const handleClick = () => {
		if (!disabled && user.token && messageRef.current?.value.trim())
			sendMessage(user.token, threadId, messageRef.current.value.trim())
	}

	useEffect(() => {
		if (error?.status === UNAUTHORIZED) user.logout(true)
	}, [error, user])

	useEffect(() => {
		if (messageRef.current) messageRef.current.value = ''
	}, [result])

	return (
		<>
			{error && <Snackbar variant="error">{ERROR_GENERIC}</Snackbar>}
			<StickyContainer>
				<Input
					inputProps={{ ref: messageRef }}
					placeholder={MESSAGE_PLACEHOLDER}
					disabled={disabled}
					endAdornment={
						<InputAdornment position="end">
							<IconButton onClick={handleClick}>
								<SendIcon />
							</IconButton>
						</InputAdornment>
					}
					rowsMax="5"
					multiline
					fullWidth
				/>
			</StickyContainer>
		</>
	)
})

export default MessageBox
