import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewsList from './NewsList'
import SpecificNews from './SpecificNews'

// paths are relative to the `/news/*` route in Router.tsx (see urls.internal.specificNews)
const News = () => (
	<Routes>
		<Route path=":id" element={<SpecificNews />} />
		<Route path="*" element={<NewsList />} />
	</Routes>
)

export default News
