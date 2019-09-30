import { FormControl, Grid, MenuItem, Select, Typography } from '@material-ui/core'
import { Language, useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { configStore } from 'stores'

const ChangeSettings: React.FC = observer(() => {
	const { CHANGE_LANGUAGE } = useLocale()
	const config = useContext(configStore)

	return (
		<Grid alignItems="center" justify="space-between" container>
			<Grid item>
				<Typography>{CHANGE_LANGUAGE}</Typography>
			</Grid>
			<Grid item>
				<FormControl variant="outlined">
					<Select
						value={config.language}
						onChange={e => config.changeLanguage(e.target.value as Language)}
					>
						{Object.keys(Language).map(e => (
							<MenuItem value={e} key={e}>
								{e}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	)
})

export default ChangeSettings
