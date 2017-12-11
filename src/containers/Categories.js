import React, { Component } from 'react'
import Category from '../components/Category'

import { categories } from '../data/fixtures'



class Categories extends Component{

  render(){
    const list = categories.map(c =>
      <Category
        key    = { c.id }
        title  = { c.title} 
        image  = { c.image} 
        path   = { c.slug } 
        button = "Shop Now" 
      />  
    )
    return (
      <div>
       { list } 
      </div>
    )
  }  
}

export default Categories
