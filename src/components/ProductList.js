import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ProductItem from './ProductItem'
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container:{
    dispaly: 'grid',
  },
  item:{
    justifySelf: 'center',
  }
})
function ProductList(props) {
  const { classes } = props
  const list = props.products.map( product =>
      <Grid key = {product.id} className = {classes.container} item xs={12} sm={6} md={4} lg={4}>
        <ProductItem
          className = {classes.item}
          title= {product.title}
          image = {product.image}
          price = {product.price}
        />
    </Grid>
  )
  return (
    <div className = {classes.root} >
      <Grid className = {classes.container} container spacing={24}>
        {list}
      </Grid>
    </div>
  )
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductList)
