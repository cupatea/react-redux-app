import { createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'
import reducers from './reducers'

export const history = createHistory()
export default createStore(reducers, applyMiddleware(promise(), routerMiddleware(history), thunk,logger))