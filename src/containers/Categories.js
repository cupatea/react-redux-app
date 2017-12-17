import React, { Component } from 'react'
import { connect } from 'react-redux'

import Category from '../components/Category'

class Categories extends Component{
  render(){
    const list = this.props.categories.map(c =>
      <Category
        key     = { c.id }
        title   = { c.title} 
        image   = { c.image} 
        path    = { c.slug } 
        button  = "Shop Now" 
        onClick = { window.scrollTo(0, 0) }
      />  
    )
    return (
      <div>
       { list } 
      </div>
    )
  }  
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
  }
}

export default connect(mapStateToProps)(Categories)
