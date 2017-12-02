import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'

const styles = theme => ({
  root: {
    width: '100%',
    paddingBottom: '10px',
  },
  appBar:{
    position: 'static',
    backgroundColor: 'white',
    boxShadow: 'none',
    margin: '0px',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  toolBar:{
    margin: '0px',
    padding: '0px',
  },
  logo: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '16px',
    fontWeight: 600,
    letterSpacing: '0.3em',
    color: '#202020',
    textDecoration: 'none',
  },
  navButton: {
    color: '#202020',
    margin: '0px',
  },
})

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className = {classes.toolBar}>
          <IconButton className={classes.navButton} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.logo}>
            {props.appName}
          </Typography>
          <IconButton className={classes.navButton} aria-label="ShoppingCart">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)
