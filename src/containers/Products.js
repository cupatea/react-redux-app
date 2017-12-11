import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import Grid from 'material-ui/Grid'

import Category from '../components/Category'
import Product from '../components/Product'

import PropTypes from 'prop-types'

import { categories, products } from '../data/fixtures'

const styles = theme => ({
  root: {
    display: 'grid',
  },
  container: {
    maxWidth: 1440,
    justifySelf: 'center',
  }
})

class Products extends Component {
  render(){
    const { classes } = this.props
    const currentCategory = categories.find(c => '/' + c.slug === this.props.location.pathname)
    const list = products
      .filter(p => p.category_id === currentCategory.id)
      .map(p =>
      <Grid key = { p.id } className = { classes.container } item xs = { 12 } sm = { 6 } md = { 4 } lg = { 4 }>
        { }
        <Product
          title = { p.title }
          image = { p.image }
          price = { p.price }
        />
      </Grid>
    )
    return (
      <div className = { classes.root }>
        <Category 
          title = { currentCategory.title }
          image = { currentCategory.image } 
          info  = { list.length } 
          path  = { currentCategory.slug }
        />
        <Grid className = { classes.container } container spacing = { 24 }>
          { list }
        </Grid>
      </div>
    )    
  }  
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Products))