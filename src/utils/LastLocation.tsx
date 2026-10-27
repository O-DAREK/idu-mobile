import React, { createContext, useContext, useEffect, useRef } from 'react'
import { Location, useLocation } from 'react-router'

const LastLocationContext = createContext<Location | null>(null)

/** Provides the location the user was on before the current one (replacement for react-router-last-location) */
export const LastLocationProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const location = useLocation()
	const committed = useRef(location)
	const lastStored = useRef<Location | null>(null)
	const last = committed.current !== location ? committed.current : lastStored.current

	useEffect(() => {
		if (committed.current !== location) {
			lastStored.current = committed.current
			committed.current = location
		}
	}, [location])

	return <LastLocationContext.Provider value={last}>{children}</LastLocationContext.Provider>
}

export const useLastLocation = () => useContext(LastLocationContext)
