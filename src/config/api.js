import axios from 'axios'

export const baseURL = 'http://localhost:3001'
export const serverURL = (path, locale = '') => locale ? `${baseURL}/${locale}/${path}` : `${baseURL}/${path}`
export const UiPath = (locale = '') => `${ locale ?  locale + '/' : '/' }api/v1/store`
export const categoriesPath = (locale = '') => `${locale ? locale + '/' : '/'}api/v1/categories`
export const productsPath = (slug, locale = '') => `${locale ? locale + '/' : '/'}api/v1/products?category=${slug}`
export const detailPath = (id, locale = '') => `${locale ? locale + '/' : '/'}api/v1/products/${id}`

export default axios.create({
  baseURL: baseURL
})
