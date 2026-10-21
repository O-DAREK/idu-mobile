import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { Language, useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { configStore } from 'stores'

const ChangeSettings: React.FC = observer(() => {
	const { CHANGE_LANGUAGE } = useLocale()
	const config = useContext(configStore)

	return (
		<Grid sx={{ alignItems: 'center', justifyContent: 'space-between' }} container>
			<Grid>
				<Typography>{CHANGE_LANGUAGE}</Typography>
			</Grid>
			<Grid>
				<FormControl variant="outlined">
					<Select
						value={config.language}
						onChange={e => config.changeLanguage(e.target.value as Language)}
					>
						{(Object.keys(Language) as (keyof typeof Language)[]).map(lang => (
							<MenuItem value={Language[lang]} key={lang}>
								{lang}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	)
})

export default ChangeSettings
