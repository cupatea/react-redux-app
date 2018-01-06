import React, { Component } from 'react'
import { connect } from 'react-redux'
import  {
  initCategories,
  initDetail,
  addLineItem,
  updateQuantityCounter,
  updateTotalPrice
}  from '../actions'
import { firstImage } from '../config/api'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { MuiThemeProvider } from 'material-ui/styles'
import withWidth from 'material-ui/utils/withWidth'
import theme from '../config/theme'
import { withStyles } from 'material-ui/styles'
import { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Button from '../components/Button'
import ScrollToTopOnMount from './ScrollToTopOnMount'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    maxWidth: '1440px',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      flexDirection: 'row',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  media:{
    maxWidth: '600px',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      margin: '64px 32px',
    },
    [theme.breakpoints.down('md')]: {
      margin: '0px',
      width: '80%',
    },
  },
  image: {
    justifySelf: 'center',
    height: 'auto',
    width: '100%',
  },
  details:{
    [theme.breakpoints.up('md')]: {
      margin: '64px 32px',
      width: '50%',
      maxWidth: '400px'
    },
    [theme.breakpoints.down('md')]: {
      boxSizing: 'border-box',
      margin: '32px',
      padding: '0 24px',
      width: '100%',
      maxWidth: '600px',
    },
  },
  price: {
    margin: '16px 0 20px',
    color: '#757575'
  },
  description:{
    margin: '32px 0',
  },
  title: {
    marginBottom: '16px'
  },
  inputLable: {
    textTransform: 'capitalize'
  },
  actions:{
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '8px',
    padding: '0 16px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
})

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stateInitiated: false,
      changeHandeled: {},
      selectedSizes: {},
    }
  }

  classes =  this.props.classes
  componentWillMount() {
    if (!this.props.categories.length)
      this.props.onInitCategories(this.props.locale)
    this.props.onInitDetail(this.props.locale, this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.locale !== this.props.locale)
      this.props.onInitDetail(nextProps.locale, nextProps.match.params.id)
  }
  componentWillUpdate(nextProps, nextState){
    //initiate selectedSizes object unless it's initiated
    if (nextProps.loaded && !nextState.stateInitiated){
      const keys = Object.keys(nextProps.product.sizes)
      this.setState({
        selectedSizes:  this.createInitialObject('', keys),
        changeHandeled: this.createInitialObject(false, keys),
        stateInitiated: true,
      })
    }
  }

  handleChange = event => {
    this.setState({
      selectedSizes: {
        ...this.state.selectedSizes,
        [event.target.name]: event.target.value
      },
      changeHandeled: {
        ...this.state.changeHandeled,
        [event.target.name]: true
      }
    })
  }

  createInitialObject = (initialValue, keysArray) => {
    const initObject = {}
    keysArray.map(key => initObject[key] = initialValue)
    return initObject
  }

  checkValues = (keysArray, targetObject) => {
    return keysArray.reduce((acc, key) => {
      return targetObject[key] ? targetObject[key] && acc : false
    }, true)
  }

  handleAddLineItem = (product) => {
    const keysArray = Object.keys(product.sizes)
    this.setState({
      changeHandeled: this.createInitialObject(true, keysArray),
      stateInitiated: true,
    })
    if (this.checkValues(keysArray,this.state.selectedSizes)){
      this.props.addLineItem({
        product:{
          ...product,
          sizes: this.state.selectedSizes
        },
        quantity: 1,
      })
      this.props.updateQuantityCounter()
      this.props.updateTotalPrice()
    }
  }

  renderError(){
    console.log("Error! Can't fetch details from the server")
  }
  renderLoading(){
    return <CircularProgress size = { 50 } color = "accent" />
  }

  renderSelect(object){
    return(
      Object.keys(object).map( key =>
        <FormControl
          fullWidth
          key = { key }
          error = { this.state.changeHandeled[key] && !this.state.selectedSizes[key] }
        >
          <InputLabel
            className = { this.classes.inputLable }
            htmlFor = { key }
            children = { this.props.messages.sizes[key]}
          />
          <Select
            native
            value = { this.state.selectedSizes[key]  }
            onChange = { this.handleChange }
            input = { <Input name = { key } id = { key } /> }
            children = { ['',...object[key]].map( e => <option key = { e } value = { e }>{ e }</option>) }
          />
        </FormControl>
      )
    )
  }

  renderContent(){
    return(
      <MuiThemeProvider theme = { theme }>
        <div className = { this.classes.container }>
          <div className = { this.classes.media }>
            <img
              className = { this.classes.image }
              alt = { this.props.product.title }
              src = { firstImage(this.props.product.images) }
            />
          </div>
          <div className = { this.classes.details } >
            <CardContent>
              <Typography
                type = "headline"
                component = "h1"
                children = { this.props.product.title }
              />
              <Typography
                className = { this.classes.price }
                type = "subheading"
                component = "div"
                children = { this.props.messages.currency + this.props.product.price }
              />
              { this.renderSelect(this.props.product.sizes) }
              <div className = { this.classes.description }>
                <Typography
                  className = { this.classes.title }
                  type = "body2"
                  component = "h3"
                  children = { this.props.messages.description }
                />
                <Typography
                  type = "caption"
                  component = "p"
                  children = { this.props.product.description }
                />
              </div>
            </CardContent>
            <CardActions className = { this.classes.actions }>
              <Button
                className = { this.classes.button }
                text = { this.props.messages.addToCart }
                click = { () => this.handleAddLineItem(this.props.product) }
              />
            </CardActions>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

  render(){
    return (
      <div className = { this.classes.root }>
        <ScrollToTopOnMount />
        { this.props.loading && this.renderLoading()  }
        { this.props.error && this.renderError()  }
        { this.props.loaded && this.renderContent()  }
      </div>
    )
  }
}

Detail.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    locale: state.uiState.locale,
    messages: state.uiState.messages,
    categories: state.categories.data,
    categorySlug: state.detail.categorySlug,
    product: state.detail.product,
    loading: state.detail.loading,
    loaded: state.detail.loaded,
    error: state.detail.error,
  }
}
const mapDispachToProps = dispatch => {
  return {
    onInitCategories: (locale) => dispatch(initCategories(locale)),
    onInitDetail: (locale, id) => dispatch(initDetail(locale, id)),
    addLineItem: (lineItem) => dispatch(addLineItem(lineItem)),
    updateQuantityCounter: () => dispatch(updateQuantityCounter()),
    updateTotalPrice: () => dispatch(updateTotalPrice())
  }
}
export default compose(withStyles(styles), withWidth())(connect(mapStateToProps,mapDispachToProps)(Detail))
