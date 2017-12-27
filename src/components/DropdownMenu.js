import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import ArrowDropDown from 'material-ui-icons/ArrowDropDown'
import Button from 'material-ui/Button'
import { MenuList, MenuItem } from 'material-ui/Menu'
import ClickAwayListener from 'material-ui/utils/ClickAwayListener'
import Grow from 'material-ui/transitions/Grow'
import Paper from 'material-ui/Paper'
import { Manager, Target, Popper } from 'react-popper'

const styles = theme => ({
  button: {
    padding: '0',
    minWidth: '48px',
    minHeith: '24px',
  },
  menuItem: {
    textTransform: 'uppercase',	
    fontSize: '0.875rem',
  }

})

class DropdownList extends Component {

state = {
  isMenuOpen: false,
}

handleMenuOpen = () => {
  this.setState({ isMenuOpen: true })
}

handleMenuClose = () => {
  this.setState({ isMenuOpen: false })
}

renderTargetButton(currentValue, action) {
  return(
    <Target>
      <Button 
        className = { this.props.classes.button }
        aria-owns = { this.state.isMenuOpen ? 'menu-list' : null }
        aria-haspopup = "true"
        onClick = { this.handleMenuOpen }
      >
        { currentValue } 
        <ArrowDropDown/>
      </Button>
    </Target> 
  )
}      

renderList (inputItems, inputAction) {
  const items = inputItems.map(item => 
    <MenuItem key = { item } className = { this.props.classes.menuItem } onClick = { () => inputAction(item) }>
      { item }
    </MenuItem>
    )
  return <Paper><MenuList role = "menu">{ items }</MenuList></Paper> 
}
render(){
  return (
    <Manager>
      { this.renderTargetButton(this.props.currentLang) }
      <Popper placement = "bottom-start" eventsEnabled = { this.state.isMenuOpen }>
        <ClickAwayListener onClickAway = { this.handleMenuClose } >
          <Grow in = { this.state.isMenuOpen } id = "menu-list">{ this.renderList(this.props.list, this.props.action) }</Grow>
        </ClickAwayListener>  
      </Popper>
    </Manager>
  )
}

}
DropdownList.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired, 
  open: PropTypes.func.isRequired, 
  close: PropTypes.func.isRequired, 
  action: PropTypes.func.isRequired, 
  isOpen: PropTypes.bool.isRequired,
  currentItem: PropTypes.string.isRequired,
}

export default withStyles(styles)(DropdownList)
