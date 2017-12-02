import React, { Component } from 'react'
import { appName, categories } from '../data/fixtures'
import NavBar from './NavBar'
import NavTabs from './NavTabs'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar appName={appName}/>
        <NavTabs tabs = {categories} />
      </div>
    )
  }
}

export default App
