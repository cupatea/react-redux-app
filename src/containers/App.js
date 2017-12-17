import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { increment, selectLanguage }  from '../store/actions'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Tabs from '../components/Tabs'
import Drawer from '../components/Drawer'
import Categories from './Categories'
import Products from './Products'

class App extends Component {
  state = {
    locales: ['en', 'ua', 'ru'],
    isDrowerOpen: false,
    isLangMenuOpen: false,
  }

  toggleDrawer = (isOpen) => () => {
    this.setState({
      isDrowerOpen: isOpen,
    })
  }
  handleLangMenuOpen = () => {
    this.setState({ isLangMenuOpen: true })
  }

  handleLangMenuClose = () => {
    this.setState({ isLangMenuOpen: false })
  }

  handleCategoryChange = (slug) => {
    this.props.history.push(`/${slug}`)
    window.scrollTo(0, 0)  
  }

  render() {
    const currentTabSlug = this.props.location.pathname.split('/')[1]
    const drawerContent = [
      {
        headline: "Category",
        items: this.props.categories.map(c => 
          ({ 
            title: c.title, 
            path: c.slug, 
            action: this.handleCategoryChange 
          })
        )
      },
      {
        headline: 'Language',
        items: this.state.locales.map(l => 
          ({ 
            title: l.toUpperCase(), 
            path: l, 
            action: this.props.handleLocaleChange 
          })
        )
      },
    ]
    return(
      <div>
        <Header 
          incrementCounter = { this.props.increment }
          openDrawer = { this.toggleDrawer }
          closeLangMenu = { this.handleLangMenuClose }
          openLangMenu = { this.handleLangMenuOpen }
          selectLang = { this.props.handleLocaleChange }

          appName = { this.props.appName } 
          cartCount = { this.props.cartCount }
          langList = { this.state.locales }
          currentLang = { this.props.currentLang }
          isLangMenuOpen = { this.state.isLangMenuOpen }
        
        />
        <Drawer 
          content = { drawerContent }
          isOpen = { this.state.isDrowerOpen } 
          closeDrawer = {this.toggleDrawer} 
        />
        <Tabs 
          tabs = { this.props.categories } 
          currentTab = { currentTabSlug } 
          action = { this.handleCategoryChange }
        />
        
        <Route exact path = {'/'}       component = { Categories }/>
        <Route exact path = {`/:slug`} component = { Products } />

        <Footer text = 'Contacts' />
      </div>
    )
  }
}  

const mapStateToProps = state => {
  return {
    appName: state.appName,
    categories: state.categories,
    currentLang: state.locale,
    cartCount: state.cartCount,

  }
}

const mapDispachToProps = dispatch => {
  return {
    increment: () => dispatch(increment()),
    handleLocaleChange: (locale) => dispatch(selectLanguage(locale))
  }
}

export default withRouter(connect(mapStateToProps,mapDispachToProps)(App))
