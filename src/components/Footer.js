import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'


const styles = theme => ({
  root: {
    display: 'grid',
    marginTop: '32px',
  },
  button:{
    width: '10%',
    justifySelf: 'center',
    backgroundColor: 'black',
    fontSize: '13px'
  },
})

const Footer = props => {
  const { classes } = props;
  return (
    <footer className={classes.root}>
      <Button raised color="accent" className={classes.button}>
        {props.text}
      </Button>
    </footer>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
}

export default withStyles(styles)(Footer)