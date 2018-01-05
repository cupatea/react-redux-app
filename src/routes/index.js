import React from 'react'
import { Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from '../store.js'
import { rootPath, productsPath, detailPath, cartPath } from '../config/router'
import App from '../containers/App'
import Categories from '../containers/Categories'
import Products from '../containers/Products'
import Detail from '../containers/Detail'
import Cart from '../containers/Cart'



const routes = () =>
  <Provider store = { store } >
    <ConnectedRouter history = { history }>
      <App>
        <Switch>
          <Route exact path = { rootPath() } component = { Categories }/>
          <Route exact path = { productsPath(':slug') } component = { Products } />
          <Route exact path = { detailPath(':slug', ':id') } component = { Detail } />
          <Route exact path = { cartPath() } component = { Cart } />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>

export default routes
