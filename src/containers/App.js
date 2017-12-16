import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { appName, categories } from '../data/fixtures'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Tabs from '../components/Tabs'
import Drawer from '../components/Drawer'
import Categories from './Categories'
import Products from './Products'

class App extends Component {
  state =  {
    langList: ['en', 'ua', 'ru'],
    currentLang: 'en',
    isDrowerOpen: false,
    isLangMenuOpen: false,
    cartCount: 1,
  }
  ScrollToTop() {
    window.scrollTo(0, 0)
    return null
  }  
    
  toggleDrawer = (isOpen) => () => {
    this.setState({
      isDrowerOpen: isOpen,
    })
  }
  handleLangMenuClick = () => {
    this.setState({ isLangMenuOpen: true })
  }

  handleLangMenuRequestClose = () => {
    this.setState({ isLangMenuOpen: false })
  }
  handleLangMenuRequestSelect = (lang) => {
    this.setState({ 
      currentLang: lang,
      isLangMenuOpen: false 
    })
  }
  handleCategoryMenuRequestSelect = (slug) => {
    this.props.history.push(slug)
  }

  render() {
    const currentTabSlug = this.props.location.pathname.split('/')[1]
    const drawerContent = [
      {
        headline: "Category",
        items: categories.map(c => 
          ({ 
            title: c.title, 
            path: c.slug, 
            action: this.handleCategoryMenuRequestSelect 
          })
        )
      },
      {
        headline: 'Language',
        items: this.state.langList.map(l => 
          ({ 
            title: l.toUpperCase(), 
            path: l, 
            action: this.handleLangMenuRequestSelect 
          })
        )
      },
    ]
    return(
      <div>
        <Header 
          appName = { appName } 
          openDrawer = { this.toggleDrawer }
          cartCount = { this.state.cartCount }
          langList = { this.state.langList }
          currentLang = { this.state.currentLang }
          isLangMenuOpen = { this.state.isLangMenuOpen }
          closeLangMenu = { this.handleLangMenuRequestClose }
          openLangMenu = { this.handleLangMenuClick }
          selectLang = { this.handleLangMenuRequestSelect }
        />
        <Drawer 
          content = { drawerContent }
          isOpen = { this.state.isDrowerOpen } 
          closeDrawer = {this.toggleDrawer} 
        />
        <Tabs 
          tabs = { categories } 
          currentTab = { currentTabSlug } 
        />
        
        <Route component = { this.ScrollToTop } />
        <Route exact path = {'/'}       component = { Categories }/>
        <Route exact path = {`/:slug`} component = { Products } />]

        <Footer text = 'Contacts' />
      </div>
    )
  }
}  
export default withRouter(App)
