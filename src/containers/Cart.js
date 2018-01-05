import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  initCategories,
  removeLineItem,
  incrementLineItemQuantity,
  decrementLineItemQuantity,
  updateTotalPrice,
  updateQuantityCounter }  from '../actions'
import { push } from 'react-router-redux'
import compose from 'recompose/compose'
import withWidth from 'material-ui/utils/withWidth'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from '../config/theme'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import LineItem from '../components/LineItem'
import Button from '../components/Button'
import Typography from 'material-ui/Typography'
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'
import ScrollToTopOnMount from './ScrollToTopOnMount'

const styles = theme => ({
  root:{
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 900,
  },
  checkoutBox:{
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '10px',
    marginTop: '40px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  total: {
    display: 'flex',
    marginRight: '64px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0px',
      marginBottom: '40px',
      justifyContent: 'flex-end',
    },
  },
  subtotal: {
    marginLeft: '24px'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: '16.9px',
    fontWeight: 500,
  },
  info: {
    alignSelf: 'center',
    fontSize: '13px',
    fontWeight: 400,
  },
})

class Cart extends Component{
  classes = this.props.classes

  componentWillMount() {
    this.props.onInitCategories(this.props.locale)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.locale !== this.props.locale)
      this.props.onInitCategories(nextProps.locale)
  }

  handleRemoveLineItem(lineItem) {
    this.props.removeLineItem(lineItem)
    this.props.updateQuantityCounter()
    this.props.updateTotalPrice()
  }

  handleDecrementLineItemQuantity(lineItem) {
    this.props.decrementLineItemQuantity(lineItem)
    this.props.updateQuantityCounter()
    this.props.updateTotalPrice()
  }

  handleIncrementLineItemQuantity(lineItem) {
    this.props.incrementLineItemQuantity(lineItem)
    this.props.updateQuantityCounter()
    this.props.updateTotalPrice()
  }

  renderError(){
    console.log("Error! Can't fetch cart from the server")
  }
  renderLoading(){
    return <CircularProgress className = { this.classes.progress } size = { 50 } color = "accent" />
  }
  renderLineItems(lineItems){
    return(
      lineItems.map(lineItem =>
        <LineItem
          key = { lineItem.product.id + Object.entries(lineItem.product.sizes).join("-")}
          image = { lineItem.product.images[0].url }
          title = { lineItem.product.title }
          currentQuantity = { lineItem.quantity }
          handleChange = { () => {} }
          sizes = { lineItem.product.sizes }
          currency = { this.props.messages.currency }
          price = { lineItem.product.price }
          handleDelete = { () => this.handleRemoveLineItem(lineItem) }
          handleIncrement = { () => this.handleIncrementLineItemQuantity(lineItem) }
          handleDecrement = { () => this.handleDecrementLineItemQuantity(lineItem) }
        />
      )
    )
  }
  renderEmptyCartMessage(){
    return(
      <Typography
        type = 'caption'
        component = 'p'
        children = { [ this.props.messages.your,<ShoppingCartIcon/>, this.props.messages.isEmpty ] }
      />
    )
  }

  renderCheckBox(){
    return(
      <div className = { this.classes.checkoutBox }>
      <div className = { this.classes.total }>
        <Typography
          type = 'body2'
          component = 'p'
          children = { `${this.props.messages.total}:` }
        />
        <Typography
          className = { this.classes.subtotal }
          type = 'body2'
          component = 'span'
          children = { this.props.messages.currency + this.props.totalPrice }
        />
      </div>
      <div
        className = { this.classes.button }
        children = { <Button text = { this.props.messages.checkout }/> }
      />
    </div>
    )
  }
  renderContentContainer(lineItems){
    const count = this.props.lineItems.length
    const item = this.props.messages.item
    const word = count === 1 ?  item.one : (count > 4 ? item.many : item.few)
    return(
      <div className = { this.classes.container }>
        <Typography
          className = { this.classes.title }
          children = { this.props.messages.cart } />
        <Typography
          className = { this.classes.info }
          children = { `${count} ${word}`}
        />
        { this.renderLineItems(lineItems) }
        { this.renderCheckBox() }
      </div>
    )
  }
  render(){
    return (
      <MuiThemeProvider theme = { theme }>
        <ScrollToTopOnMount />
        <div className = {this.classes.root }>
            { this.props.loading && this.renderLoading() }
            { this.props.error && this.renderError() }
            { !this.props.lineItems.length && this.renderEmptyCartMessage() }
            { this.props.lineItems.length > 0 && this.renderContentContainer(this.props.lineItems) }
        </div>
      </MuiThemeProvider>
    )
  }
}


const mapStateToProps = state => {
  return {
    locale: state.uiState.locale,
    messages: state.uiState.messages,
    categories: state.categories.data,
    lineItems: state.cart.lineItems,
    totalPrice: state.cart.totalPrice,
    error: state.categories.error,
    loading: state.categories.loading,
    loaded: state.categories.loaded
  }
}

const mapDispachToProps = dispatch => {
  return {
    onInitCategories: locale => dispatch(initCategories(locale)),
    handleLocationChange: (path) => dispatch(push(path)),
    removeLineItem: (lineItem) => dispatch(removeLineItem(lineItem)),
    incrementLineItemQuantity: (lineItem) => dispatch(incrementLineItemQuantity(lineItem)),
    decrementLineItemQuantity: (lineItem) => dispatch(decrementLineItemQuantity(lineItem)),
    updateTotalPrice: () => dispatch(updateTotalPrice()),
    updateQuantityCounter: () => dispatch(updateQuantityCounter()),
  }
}

export default compose(withStyles(styles), withWidth())(connect(mapStateToProps, mapDispachToProps)(Cart))
