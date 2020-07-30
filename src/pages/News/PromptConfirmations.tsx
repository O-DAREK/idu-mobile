import { Typography } from '@material-ui/core'
import { ConfirmationDialog, StrippedHtml } from 'components'
import React, { useContext } from 'react'
import { newsStore, userStore } from 'stores'
import { PieceOfNews } from 'stores/NewsStore'

interface Props {
	news: PieceOfNews[]
}

const PromptConfirmations: React.FC<Props> = ({ news: newsToCheck }) => {
	const news = useContext(newsStore)
	const user = useContext(userStore)

	return (
		<>
			{newsToCheck
				.filter(e => e.requiresConfirmation)
				.map(e => (
					<ConfirmationDialog
						key={e.id}
						waitFor={() => {
							if (user.token) {
								return news.markAsConfirmed(user.token, e.id)
							}

							return Promise.reject()
						}}
					>
						<Typography variant="h5" gutterBottom>
							{e.title}
						</Typography>
						<StrippedHtml>{e.body}</StrippedHtml>
					</ConfirmationDialog>
				))}
		</>
	)
}

export default PromptConfirmations
