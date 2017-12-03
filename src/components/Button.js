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

function Button(props) {
  const { classes } = props
  return <MaterialButton color="contrast" className={classes.root}>{props.text} </MaterialButton>
}

Button.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Button)
