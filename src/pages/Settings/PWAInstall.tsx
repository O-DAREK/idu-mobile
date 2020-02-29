import { Button } from '@material-ui/core'
import { useLocale } from 'locales'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { metaStore } from 'stores'

const PWAInstall: React.FC = observer(() => {
	const { INSTALL_BUTTON } = useLocale()
	const meta = useContext(metaStore)

	if (!meta.pwaInstallEvent) return null

	return (
		<Button variant="outlined" onClick={() => meta.pwaInstallEvent?.prompt()}>
			{INSTALL_BUTTON}
		</Button>
	)
})

export default PWAInstall
