import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MaterialButton from 'material-ui/Button'

const styles = theme => ({
  root: {
    justifySelf: 'center',
    alignSelf: 'start',
    padding: '8px 44px',
    margin: 0,
    border: "2px solid #000",
    backgroundColor: '#FFF',
    color: '#202020',
    outline: 'none',
    lineHeight: 1.5,
  },
})

const Button = props =>(
  <MaterialButton 
    className = { props.classes.root }
    color = 'contrast' 
    onClick = { props.click }
  >
    { props.text } 
  </MaterialButton>
)

Button.propTypes = {
  classes: PropTypes.object.isRequired,
  click: PropTypes.func
}

export default withStyles(styles)(Button)
