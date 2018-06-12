import React, { Fragment } from 'react'
import { Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import RouteFromPath from '../src/components/routes/RouteFromPath'
import routes from '../src/routes'

const App = () => (
  <Fragment>
    <Helmet>
      <title>RS React Redux Base</title>
    </Helmet>
    <Switch>
      {routes.map((route, index) =>
        <RouteFromPath
          key={`route${index}`}
          {...route}
        />)
      }
    </Switch>
  </Fragment>
)

export default App
