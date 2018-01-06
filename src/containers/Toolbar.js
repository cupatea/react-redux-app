import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { selectLanguage, initCategories } from '../actions'
import PropTypes from 'prop-types'
import { productsPath, cartPath, rootPath } from '../config/router'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import MaterialToolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'
import Hidden from 'material-ui/Hidden'
import Badge from 'material-ui/Badge'
import ButtonBase from 'material-ui/ButtonBase'
import DropdownMenu from '../components/DropdownMenu'
import Drawer from '../components/Drawer'

const styles = theme => ({
  appBar: {
    width: '100%',
    position: 'static',
    minHeith: '54px',
    backgroundColor: 'white',
    boxShadow: 'none',
    margin: '0px',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  toolBar: {
    margin: '0px',
    padding: '0px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoButton:{
    justifySelf: 'center',
  },
  name: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '16px',
    fontWeight: 500,
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

})

class Toolbar extends Component {
  componentWillMount() {
    this.props.onInitCategories(this.props.locale)
  }
  state = {
    isDrowerOpen: false,
  }

  toggleDrawer = (isOpen) => () => {
    this.setState({
      isDrowerOpen: isOpen,
    })
  }

  renderShopingCartIcon(count) {
    const icon = <ShoppingCartIcon />
    const withBadge =
      <Badge
        className = { this.props.classes.badge }
        badgeContent = { count }
        color = "accent"
        children = { icon }
      />
    return (
      <IconButton
        className = { this.props.classes.navButton }
        aria-label = "ShoppingCart"
        onClick = { () => this.props.handleLocationChange(cartPath()) }
        children = { count ? withBadge : icon }
      />
    )
  }
  renderMenuIcon(forWhat){
    return(
      <Hidden only = { forWhat } >
        <IconButton
          className = { this.props.classes.navButton }
          aria-label = "Menu"
          onClick = { this.toggleDrawer(true) }
          children = { <MenuIcon /> }
        />
      </Hidden>
    )
  }

  renderLangMenu(forWhat){
    return(
    <Hidden only = { forWhat }>
      <DropdownMenu
        currentLang = { this.props.locale }
        list   = { this.props.locales }
        action = { this.props.handleLocaleChange }
      />
    </Hidden>
    )
  }

  renderAppLogo(longName, shortName, action){
    const returnLogo = ( name ) =>
      <ButtonBase className = { this.props.classes.logoButton } onClick = { () => this.props.handleLocationChange(rootPath()) }>
        <Typography className = { this.props.classes.name } children = { name } />
      </ButtonBase>
    return(
      <div>
        <Hidden only = { ['sm', 'md', 'lg', 'xl'] } children = { returnLogo(shortName) } />
        <Hidden only = 'xs' children = { returnLogo(longName) }/>
      </div>
    )
  }

  renderDrawerContent(){
    const categories = this.props.categories.map(c => ({
      title: c.title,
      path: productsPath(c.slug),
      action: this.props.handleLocationChange,
    }))
    const languages = this.props.locales.map(l =>({
      title: l.toUpperCase(),
      path: l,
      action: this.props.handleLocaleChange
    }))

    return([
      {
        headline: this.props.categoriesTitle,
        items: categories,
      },
      {
        headline: this.props.languagesTitle,
        items: languages,
      },
    ])
  }

  renderDrawer(){
    return(
      <Drawer
        isOpen = { this.state.isDrowerOpen }
        content = { this.renderDrawerContent() }
        closeDrawer = { this.toggleDrawer }
      />
    )
  }

  render(){
    return (
      <AppBar className = { this.props.classes.appBar }>
        { this.renderDrawer() }
        <MaterialToolbar className = { this.props.classes.toolBar }>
          { this.renderMenuIcon(['sm', 'md', 'lg', 'xl']) }
          { this.renderLangMenu('xs') }
          { this.renderAppLogo(this.props.appName, this.props.shortName, this.props.logoClick) }
          { this.renderShopingCartIcon(this.props.cartCount) }
        </MaterialToolbar>
      </AppBar>
    )
  }
}
const mapStateToProps = state => {
  return {
    cartCount: state.cart.quantityCounter,
    categories: state.categories.data,
    locale: state.uiState.locale,
    locales: state.uiState.locales,
    appName: state.uiState.appName,
    shortName: state.uiState.shortName,
    categoriesTitle: state.uiState.messages.categories,
    languagesTitle: state.uiState.messages.languages,
    router: state.router,
  }
}

const mapDispachToProps = dispatch => {
  return {
    onInitCategories: (locale) => dispatch(initCategories(locale)),
    handleLocaleChange: (locale) => dispatch(selectLanguage(locale)),
    handleLocationChange: (path) => dispatch(push(path))
  }
}

Toolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
  shortName: PropTypes.string.isRequired,
  locales: PropTypes.array.isRequired,
  locale: PropTypes.string.isRequired,
  handleLocaleChange: PropTypes.func.isRequired,
  cartCount: PropTypes.number.isRequired,
}

export default connect(mapStateToProps, mapDispachToProps)(withStyles(styles)(Toolbar))
