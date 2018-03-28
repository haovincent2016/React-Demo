import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { AppContainer } from 'react-hot-loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import reducers from '@/reducers'
import routers from '@/routers'

const store = createStore(reducers)

const render = Component => {
  ReactDOM.render(
    <AppContainer key={Math.random()}>
      <Provider store={store}>
        <MuiThemeProvider>{Component}</MuiThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(routers)

//hot reloading
if (module.hot) {
  module.hot.accept('./routers', () => {
    const nextRoutes = require('./routers/index').default
    render(nextRoutes)
  })
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}