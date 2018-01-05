import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { initUiState, initCategories, initProducts } from '../actions'
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
  componentWillMount() {
    this.props.initUiState()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale !== this.props.locale) {
      this.props.initUiState(nextProps.locale)
      this.props.onInitCategories(nextProps.locale)
    }
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
        { this.renderTabs() }
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
    loading: state.uiState.loading,
    loaded: state.uiState.loaded,
    error: state.uiState.error,
    router: state.router,
  }
}

const mapDispachToProps = dispatch => {
  return {
    initUiState:  (locale) => dispatch(initUiState(locale)),
    onInitCategories:  (locale) => dispatch(initCategories(locale)),
    onInitProducts:  (locale)  => dispatch(initProducts(locale)),
    handleLocationChange:  (path) => dispatch(push(path))
  }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispachToProps)(App)))
