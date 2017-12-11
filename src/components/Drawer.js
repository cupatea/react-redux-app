import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import MaterialDrawer from 'material-ui/Drawer'
import List, { ListItem, ListItemText } from 'material-ui/List'

const styles = {
  list: {
    width: 250,
  },
  link:{
    textDecoration: 'none',
  },
}
const Drawer = props => {
  const { classes } = props
  const items = props.items.map(i => (
     <ListItem key = { i.id }>
      <Link className = { classes.link } to = { i.slug }>
        <ListItemText secondary = { i.title }/>   
      </Link>  
    </ListItem>
  ))
  return (
    <MaterialDrawer 
      open = { props.isOpen } 
      onRequestClose = { props.close(false) }
    >
    <div
      tabIndex = { 0 }
      role = 'button'
      onClick   = { props.close(false) }
      onKeyDown = { props.close(false) }
    >
       
      <List className = { classes.list }>
        <ListItem>
          <ListItemText primary = { props.title }/>  
        </ListItem>  
        { items }
      </List>
    </div>  
    </MaterialDrawer>
  )  
}  

Drawer.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string,
    title: PropTypes.string,
  })),
  close: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default withStyles(styles)(Drawer)