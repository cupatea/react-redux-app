import * as creators from './creators'
import api, { categoriesPath , productsPath, detailPath }  from '../config/api'

export const selectLanguage = (locale) =>
  creators.selectLanguage(locale)

export const initCategories = (locale) =>
  creators.initCategories(
    api.get(categoriesPath(locale))
  )

export const initProducts = (locale, slug) =>
  creators.initProducts(
    api.get(productsPath(slug,1,locale))
  )

export const loadMoreProducts = (locale, slug, page) =>
  creators.loadMoreProducts(
    api.get(productsPath(slug,page,locale))
  )

export const initDetail = (locale, id) =>
  creators.initDetail(
    api.get(detailPath(id,locale))
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
