import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import uiState from './uiState'
import categories from './categories'
import products from './products'
import detail from './detail'
import cart from './cart'

export default combineReducers({
  uiState,
  categories,
  products,
  detail,
  cart,
  router: routerReducer
})
