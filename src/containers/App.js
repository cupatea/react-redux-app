import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { cartPath } from '../config/router'
import { initCategories } from '../actions'
import { productsPath } from '../config/router'
import { withStyles } from 'material-ui/styles'
import Toolbar from './Toolbar'
import Tabs from '../components/Tabs'

const styles = theme => ({

  root:{
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  errorMessage: {
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
})

class App extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale !== this.props.locale)
      this.props.onInitCategories(nextProps.locale)
  }

  handleCategoryChange = (slug) =>
    this.props.handleLocationChange(productsPath(slug))

  renderToolbar() {
    return <Toolbar />
  }

  renderTabs(){
    const currentTabSlug = this.props.router.location.pathname.split('/')[2]
    return(
      <Tabs
        tabs = { this.props.categories }
        currentTab = { currentTabSlug }
        action = { this.handleCategoryChange }
      />
    )
  }

  renderError(){
    return <p className = { this.props.classes.errorMessage } >Error! Can't fetch data from the server</p>
  }

  render() {
    return(
      <div>
        { this.renderToolbar() }
        { this.props.router.location.pathname !== cartPath() && this.renderTabs() }
        { this.props.error && this.renderError() }
        { this.props.children }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories.data,
    locale: state.uiState.locale,
    router: state.router,
  }
}

const mapDispachToProps = dispatch => {
  return {
    onInitCategories:  (locale) => dispatch(initCategories(locale)),
    handleLocationChange:  (path) => dispatch(push(path))
  }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispachToProps)(App)))
