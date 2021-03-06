import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import rootReducer from './modules/reducers'


export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [  
  thunk
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store