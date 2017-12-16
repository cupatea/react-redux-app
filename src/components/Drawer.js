import React from 'react'
import PropTypes from 'prop-types'
import MaterialDrawer from 'material-ui/Drawer'
import List from './List'

const Drawer = props => {
  return (
    <MaterialDrawer 
      open = { props.isOpen } 
      onRequestClose = { props.closeDrawer(false) }
    >
      <div
        tabIndex = { 0 }
        role = 'button'
        onClick   = { props.closeDrawer(false) }
        onKeyDown = { props.closeDrawer(false) }
      >  
        { props.content.map((list, index) =>
            <List 
              key = { index } 
              headline = { list.headline } 
              items = { list.items }
            />  
          )
        }
      </div>  
    </MaterialDrawer>
  )  
}  

Drawer.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    headline: PropTypes.string,
    items: PropTypes.array,
  })),
  closeDrawer: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default Drawer