import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { appName, categories, products } from '../data/fixtures'

import NavBar from './NavBar'
import NavTabs from './NavTabs'
import CategoryList from './CategoryList'
import ProductList from './ProductList'
import CategoryItem from './CategoryItem'

const styles = theme => ({
  root: {
    display: 'grid',
  },
})

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar appName = {appName}/>
        <NavTabs tabs = {categories} />
        <CategoryList categories = {categories} />
        <ProductList products = {products}/>
      </div>
    )
  }
}

export default withStyles(styles)(App)
