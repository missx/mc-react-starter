import routesPaths from './constants/routesPaths'
import HomePage from './containers/HomePage'
import NotFoundPage from './containers/NotFoundPage'
import WelcomePage from './containers/WelcomePage'

const routes = [
  {
    path: routesPaths.index,
    component: WelcomePage,
    exact: true,
  },
  {
    component: NotFoundPage,
  },
]

export default routes
