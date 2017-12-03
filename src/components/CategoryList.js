import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import CategoryItem from './CategoryItem'
import Button from './Button'

const styles = theme => ({
  root: {
  },
})
function CategoryList(props) {
  const { classes } = props
  return props.categories.map( category => <CategoryItem
    title= {category.title}
    image = {category.image}
    actions = {<Button text ="Shop now"/>}
  />)
}

CategoryList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryList)
