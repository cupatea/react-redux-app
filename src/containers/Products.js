import React, { Component } from 'react';
import { connect } from 'react-redux'
import { serverURL, firstImage } from '../config/api'
import { detailPath } from '../config/router'
import { initProducts, initCategories, loadMoreProducts } from '../actions'
import { push } from 'react-router-redux'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import Category from '../components/Category'
import Product from '../components/Product'
import ScrollToTopOnMount from './ScrollToTopOnMount'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container:{
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    maxWidth: 1440,
    alignItems: 'center'
  },
  errorMessage: {
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
})

class Products extends Component {
  classes = this.props.classes
  componentWillMount() {
    if (!this.props.categories.length)
      this.props.onInitCategories(this.props.locale)
    this.props.onInitProducts(this.props.locale, this.props.match.params.slug)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.slug !== this.props.match.params.slug || nextProps.locale !== this.props.locale)
      this.props.onInitProducts(nextProps.locale, nextProps.match.params.slug)
  }
  componentDidMount(){
    window.addEventListener("scroll", () => this.handleScroll(this.props))
  }

  handleScroll(props) {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight)
    const windowBottom = windowHeight + window.pageYOffset
    const threshold = 300

    if (props.hasMore && props.loaded && !props.updating && windowBottom >= docHeight - threshold )
       this.props.loadMoreProducts(props.locale, props.match.params.slug, props.pagesLoaded + 1 )
  }

  renderCategory({ title, image, slug }, itemsCount){
    const item = this.props.messages.item
    const word = itemsCount === 0 || itemsCount > 4 ?
      item.many : (itemsCount === 1 ? item.one : item.few)
    return(
      <Category
        title = { title }
        image = { serverURL(image.url)}
        info  = { `${itemsCount} ${word}` }
        path  = { slug }
      />
    )
  }

  renderProduct({ title, images, price }){
    return(
      <Product
        title = { title }
        image = { firstImage(images) }
        price = { price }
        currency = { this.props.messages.currency }
      />
    )
  }

  renderProductsGrid(products){
    return(
      products.map(product =>
        <Grid
          onClick = { () => this.props.handleLocationChange(detailPath(this.props.match.params.slug, product.id )) }
          key = { product.id }
          className = { this.classes.container }
          item xs = { 12 }
          sm = { 6 }
          md = { 4 }
          lg = { 4 }
          children = { this.renderProduct(product)  }
        />
      )
    )
  }
  renderLoading(){
    return <CircularProgress className = { this.classes.progress } size = { 50 } color = "accent" />
  }

  renderError(){
    console.log("Error! Can't fetch products from the server")
  }
  renderContentContainer({products, category, count}){
    return(
      <div className = { this.classes.container }>
        { this.renderCategory(category, count) }
        { <Grid container spacing = { 24 } children = { this.renderProductsGrid(products) } /> }
        { this.props.updating && this.renderLoading() }
      </div>
    )
  }

  render(){
    return (
      <div className = { this.classes.root }>
        <ScrollToTopOnMount />
        { this.props.loading && this.renderLoading() }
        { (this.props.error || this.props.updateError) && this.renderError() }
        { this.props.loaded && this.renderContentContainer( this.props )}
      </div>
    )
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    locale: state.uiState.locale,
    messages: state.uiState.messages,
    categories: state.categories.data,
    products: state.products.products,
    category: state.products.category,
    hasMore: state.products.hasMore,
    pagesLoaded: state.products.pagesLoaded,
    count: state.products.count,
    loading: state.products.loading,
    loaded: state.products.loaded,
    error: state.products.error,
    updating: state.products.updating,
    updated: state.products.updated,
    updateError: state.products.updateError,
    lineItems: state.cart.lineItems,
  }
}
const mapDispachToProps = dispatch => {
  return {
    onInitCategories: (locale) => dispatch(initCategories(locale)),
    onInitProducts: (locale, slug) => dispatch(initProducts(locale,slug)),
    loadMoreProducts: (locale, slug, page) => dispatch(loadMoreProducts(locale, slug, page)),
    handleLocationChange: (path) => dispatch(push(path)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispachToProps)(Products))
