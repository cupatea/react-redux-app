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
import ArrowDropDown from 'material-ui-icons/ArrowDropDown'
import Hidden from 'material-ui/Hidden'
import Badge from 'material-ui/Badge'
import Button from 'material-ui/Button'
import { MenuList, MenuItem } from 'material-ui/Menu'
import ClickAwayListener from 'material-ui/utils/ClickAwayListener'
import Grow from 'material-ui/transitions/Grow'
import Paper from 'material-ui/Paper'
import { Manager, Target, Popper } from 'react-popper'

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
    margin: '0',
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
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

const Header = props => {
  const { classes } = props
  const withBadge = 
    <Badge className = { classes.badge } badgeContent = { props.cartCount } color = "accent">
      <ShoppingCartIcon />
    </Badge>
  const cartIcon = props.cartCount > 0 ? withBadge : <ShoppingCartIcon />
  return (
    <div className = { classes.root }>
      <AppBar className = { classes.appBar }>
        <Toolbar className = { classes.toolBar }>
          <Hidden only = { ['sm', 'md', 'lg', 'xl'] }>
            <IconButton className = { classes.navButton } aria-label = "Menu" onClick = { props.openDrawer(true) }>
              <MenuIcon />
            </IconButton>
          </Hidden > 
          <Hidden only = 'xs'>
            <Manager>
              <Target>
                <Button 
                  className = { classes.button }
                  aria-owns = { props.isLangMenuOpen ? 'menu-list' : null }
                  aria-haspopup = "true"
                  onClick = { props.openLangMenu }
                >
                  { props.currentLang } <ArrowDropDown/>
                </Button>
              </Target> 
              <Popper
                placement = "bottom-start"
                eventsEnabled = { props.isLangMenuOpen }
              >
              <ClickAwayListener onClickAway = { props.closeLangMenu} >
                <Grow 
                  in = { props.isLangMenuOpen  } 
                  id = "menu-list"
                >
                <Paper>
                  <MenuList role = "menu">
                    { props.langList.map(lang => 
                        <MenuItem 
                          key={ lang }
                          className = { classes.menuItem } 
                          onClick={() => props.selectLang(lang)}
                        >
                          { lang }
                        </MenuItem>
                      )
                    }
                  </MenuList>
                </Paper>
                </Grow>
              </ClickAwayListener>  
            </Popper>
          </Manager>
          </Hidden >             
            <Link to = '/' className = { classes.link }>
              <Typography className = { classes.logo }>
                { props.appName }
              </Typography>
            </Link> 
          <IconButton 
            onClick = { props.incrementCounter }
            className = { classes.navButton } 
            aria-label = "ShoppingCart"
          >
            { cartIcon }
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
  openDrawer: PropTypes.func.isRequired,
  cartCount: PropTypes.number.isRequired,
}

export default withStyles(styles)(Header)
