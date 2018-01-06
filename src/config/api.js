import axios from 'axios'
import defaultImage from '../data/default-image_450.png'

export const baseURL = 'http://localhost:3001'
export const serverURL = (path, locale = '') => locale ? `${baseURL}/${locale}/${path}` : `${baseURL}/${path}`
export const UiPath = (locale = '') => `${ locale ?  locale + '/' : '/' }api/v1/store`
export const categoriesPath = (locale = '') => `${locale ? locale + '/' : '/'}api/v1/categories`
export const productsPath = (slug, page, locale = '') => `${locale ? locale + '/' : '/'}api/v1/products?category=${slug}&page=${page}`
export const detailPath = (id, locale = '') => `${locale ? locale + '/' : '/'}api/v1/products/${id}`

export const firstImage = (arrayOfImages) =>  arrayOfImages && arrayOfImages[0] && arrayOfImages[0].url ? serverURL(arrayOfImages[0].url) : defaultImage
export default axios.create({
  baseURL: baseURL
})
