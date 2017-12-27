import React from 'react'
import PropTypes from 'prop-types'
import MaterialDrawer from 'material-ui/Drawer'
import List from './List'

const Drawer = ({ isOpen, closeDrawer, content }) => (
  <MaterialDrawer open = { isOpen } onRequestClose = { closeDrawer(false) }>
    <div
      tabIndex = { 0 }
      role = 'button'
      onClick   = { closeDrawer(false) }
      onKeyDown = { closeDrawer(false) }
    >  
      { content.map((list, index) => <List 
          key = { index } 
          headline = { list.headline } 
          items = { list.items }
        />)
      }
    </div>  
  </MaterialDrawer>
)
Drawer.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    headline: PropTypes.string,
    items: PropTypes.array,
  })),
  closeDrawer: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default Drawer