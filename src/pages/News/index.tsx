import * as urls from 'constants/urls'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewsList from './NewsList'
import SpecificNews from './SpecificNews'

const News = () => (
	<Switch>
		<Route path={urls.internal.specificNews()}>
			<SpecificNews />
		</Route>
		<Route path={urls.internal.news()}>
			<NewsList />
		</Route>
	</Switch>
)

export default News
