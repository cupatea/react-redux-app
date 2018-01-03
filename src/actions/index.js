import * as creators from './creators'
import axios  from '../config/axios'

export const selectLanguage = (locale) =>
  creators.selectLanguage(locale)

export const initUiState = (locale ) =>
  creators.initUiState(
    axios.get(`${locale ? locale + '/' : '/'}api/v1/store`)
  )

export const initCategories = (locale) =>
  creators.initCategories(
    axios.get(`${locale ? locale + '/' : '/'}api/v1/categories`)
  )

export const initProducts = (locale, slug) =>
  creators.initProducts(
    axios.get(`${locale ? locale + '/' : '/'}api/v1/products?category=${slug}`)
  )

export const initDetail = (locale, id) =>
  creators.initDetail(
    axios.get(`${locale ? locale + '/' : '/'}api/v1/products/${id}`)
  )

export const addLineItem = (lineItem) =>
  creators.addLineItem(lineItem)

export const removeLineItem = (lineItem) =>
  creators.removeLineItem(lineItem)

export const incrementLineItemQuantity = (lineItem) =>
  creators.incrementLineItemQuantity(lineItem)

export const decrementLineItemQuantity = (lineItem) =>
  creators.decrementLineItemQuantity(lineItem)

export const updateQuantityCounter = () =>
  creators.updateQuantityCounter()

export const updateTotalPrice = () =>
  creators.updateTotalPrice()
