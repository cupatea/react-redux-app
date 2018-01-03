import React from 'react'
import PropTypes from 'prop-types'
import MaterialDrawer from 'material-ui/Drawer'
import List from './List'

const Drawer = ({ isOpen, closeDrawer, content }) => {
  const drawerContent = content.map((list, index) =>
    <List
      key = { index }
      headline = { list.headline }
      items = { list.items }
    />
  )
  return(
    <MaterialDrawer open = { isOpen } onRequestClose = { closeDrawer(false) }>
      <div
        tabIndex = { 0 }
        role = 'button'
        onClick   = { closeDrawer(false) }
        onKeyDown = { closeDrawer(false) }
        children = { drawerContent }
      />
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
