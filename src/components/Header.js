import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
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
  link:{
    flex: 1,
    textDecoration: 'none',
  },
  logo: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '16px',
    fontWeight: 600,
    letterSpacing: '0.3em',
    color: '#202020',
  },
  navButton: {
    color: '#202020',
    margin: '0px',
  },
})

const Header = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className = {classes.toolBar}>
          <IconButton className={classes.navButton} aria-label="Menu">
            <MenuIcon />
          </IconButton>
            <Link to='/' className={classes.link}>
              <Typography className={classes.logo}>
                {props.appName}
              </Typography>
            </Link> 
          <IconButton className={classes.navButton} aria-label="ShoppingCart">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
}

export default withStyles(styles)(Header)
