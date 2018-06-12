import React, { Fragment } from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import history from '../utils/history'
import RouteFromPath from '../components/routes/RouteFromPath'
import routes from '../routes'

const App = () => (
  <Fragment>
    <Helmet>
      <title>MasterClass React Starter</title>
    </Helmet>
    <ConnectedRouter history={history}>
      <Switch>
        {routes.map((route, index) =>
          <RouteFromPath
            key={`route${index}`}
            {...route}
          />)
        }
      </Switch>
    </ConnectedRouter>
  </Fragment>
)

export default App
