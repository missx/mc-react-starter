import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { addLocaleData, IntlProvider } from 'react-intl'
import includes from 'lodash/includes'
import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'

import configureStore from '../src/redux/store/configureStore'
import App from '../src/app/App'
import locales from '../src/locales'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../src/constants/constants'
import '../src/styles/styles.scss'

require('../src/favicon.ico') // Tell webpack to load favicon.ico

// Fix for browsers that don't implement Intl by default e.g.: Safari)
if (!window.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/es.js',
  ], (require) => {
    require('intl')
    require('intl/locale-data/jsonp/en.js')
    require('intl/locale-data/jsonp/es.js')
  })
}

addLocaleData([...en, ...es])
const usersLocale = navigator.language.split('-')[0]
const supportedUserLocale = includes(SUPPORTED_LANGUAGES, usersLocale)
const locale = supportedUserLocale ? usersLocale : DEFAULT_LANGUAGE
const messages = locales[locale]

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)

const renderApp = (Component) => {
  hydrate(
    <IntlProvider
      locale={locale}
      messages={messages}
      defaultLocale='en'
    >
      <Provider store={store}>
        <Component />
      </Provider>
    </IntlProvider>,
    document.getElementById('app'),
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept()
}
