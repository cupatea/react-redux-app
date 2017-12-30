import React, { Component } from 'react'
import { connect } from 'react-redux'
import  { initCategories, initDetail }  from '../actions'
import { serverURL } from '../config/pathHelper' 

import { MuiThemeProvider } from 'material-ui/styles'
import theme from '../config/theme'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Button from '../components/Button'
import PropTypes from 'prop-types'

import ScrollToTopOnMount from './ScrollToTopOnMount'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
    margin: '0 16px',
  },
  container: {
    maxWidth: 1440,
  },
  media: {
    justifySelf: 'center',
    height: 'auto',
    width: '100%',
  },
  content:{
    display: 'flex',
    flexDirection: 'column',
    marginTop: '8px',
  },
  actions:{
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '8px',
    padding: '0 16px',
  },
  headline: {
    justifySelf: 'start',
    fontSize: '24px',
    color: '#202020',
    fontWeight: 500,
  },
  title: {
    justifySelf: 'start',
    fontSize: '16px',
    marginTop: '24px',
    marginBottom: '12px',
    color: '#202020',
    fontWeight: 500,
    
  },
  price:{
    justifySelf: 'start',
    marginTop: '12px',
    marginBottom: '24px',
    fontSize: '16px',
    fontWeight: 400,
  },
  description:{
    justifySelf: 'start',
    marginBottom: '24px',
    fontSize: '13px',
    fontWeight: 400,
  },
  button: {
    justifySelf: 'end',
  },
  errorMessage: {
    textAlign: 'center',
    fontFamily: 'Roboto'
  },
  progress: {
    justifySelf: 'center',
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  inputLable: {
    textTransform: 'capitalize'
  },
  selectWrapper: {
    width: '100%'
  }
})

class Detail extends Component {
  classes =  this.props.classes

  componentWillMount() {
    if (!this.props.categories.length){
      this.props.onInitCategories(this.props.locale)
    } 
    this.props.onInitDetail(this.props.locale, this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) { 
    if ( nextProps.locale !== this.props.locale) {
      this.props.onInitDetail(nextProps.locale, nextProps.match.params.id)
    }
  }

  state = {
    age: '',
    name: 'hai',
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  renderError(){
    return <p className = {this.classes.errorMessage}>Error! Can't fetch details from the server</p>
  }
  renderLoading(){
    return <CircularProgress className = { this.classes.progress } size = { 50 } color = "accent" />
  }

  renderSelect(object){
    return(
      Object.keys(object).map( key => 
        <FormControl className = { this.classes.formControl }>
          <InputLabel className = { this.classes.inputLable } htmlFor = { key }>
            { key }
          </InputLabel>
          <Select native onChange = { this.handleChange } input = { <Input name = { key } id = { key } /> }>
            { object[key].map( e => <option value = { e }>{ e }</option>) }
          </Select>
        </FormControl>
      )
    )
  }

  

  renderDetail(){
    return(
      <MuiThemeProvider theme = { theme }>
        <Grid className = { this.classes.container } container spacing = { 24 }>
            <Grid className = { this.classes.container } item xs = { 12 } sm = { 6 } md = { 6 } lg = { 6 }>
              <img className = { this.classes.media } alt = { this.props.product.title } src = { serverURL(this.props.product.images[0].url) }/>
            </Grid>
            <Grid className = { this.classes.container } item xs = { 12 } sm = { 6 } md = { 6 } lg = { 6 }>
              <CardContent className = { this.classes.content }>
                <Typography className = { this.classes.headline }type = "headline" component = "h1">{this.props.product.title}</Typography>
                <Typography className = { this.classes.price }type = "title" component = "h2">₴{this.props.product.price}</Typography>
                { this.renderSelect(this.props.product.sizes) }
                <Typography className = { this.classes.title }type = "title" component = "h2">Description</Typography>
                <Typography className = { this.classes.description }type = "body2" component = "p">{ this.props.product.description }</Typography>
              </CardContent>
              <CardActions className = { this.classes.actions }>
                <Button className = { this.classes.button } text = "Add to cart"/>
              </CardActions>  
            </Grid>
          </Grid>  
        </MuiThemeProvider >  
    )
  }

  render(){
    return (
      <div className = { this.classes.root }>
        <ScrollToTopOnMount />
        { this.props.loading && this.renderLoading()  }
        { this.props.error && this.renderError()  }
        { this.props.loaded && this.renderDetail()  }
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
  }
}
export default withStyles(styles)(connect(mapStateToProps,mapDispachToProps)(Detail))