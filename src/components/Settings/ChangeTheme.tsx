import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import { Theme } from 'constants/interfaces'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { configStore } from 'stores'

const ChangeTheme: React.FC = observer(() => {
	const { CHANGE_THEME, THEME_DARK, THEME_LIGHT } = useLocale()
	const config = useContext(configStore)

	return (
		<FormControl component="fieldset">
			<FormLabel component="legend">{CHANGE_THEME}</FormLabel>
			<RadioGroup value={config.theme} onChange={e => config.changeTheme(e.target.value as Theme)}>
				<FormControlLabel value="light" control={<Radio />} label={THEME_LIGHT} />
				<FormControlLabel value="dark" control={<Radio />} label={THEME_DARK} />
			</RadioGroup>
		</FormControl>
	)
})

export default ChangeTheme
