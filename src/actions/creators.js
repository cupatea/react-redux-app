import * as types from './types'

export const selectLanguage = (locale) => ({
  type: types.SET_LANGUAGE,
  payload: locale
})
export const initCategories = (categories) => ({
  type: types.FETCH_CATEGORIES,
  payload: categories
})
export const initProducts = (products) => ({
  type: types.FETCH_PRODUCTS,
  payload: products
})
export const loadMoreProducts = (products) => ({
  type: types.LOAD_MORE_PRODUCTS,
  payload: products
})
export const initDetail = (detail) => ({
  type: types.FETCH_DETAIL,
  payload: detail
})

export const addLineItem = (lineItem) => ({
  type: types.ADD_LINE_ITEM,
  payload: lineItem
})

export const removeLineItem = (lineItem) => ({
  type: types.REMOVE_LINE_ITEM,
  payload: lineItem
})

export const incrementLineItemQuantity = (lineItem) => ({
  type: types.INCREMENT_LINE_ITEM_QUANTITY,
  payload: lineItem
})

export const decrementLineItemQuantity = (lineItem) => ({
  type: types.DECREMENT_LINE_ITEM_QUANTITY,
  payload: lineItem
})

export const updateQuantityCounter = () => ({
  type: types.UPDATE_QUANTITY_COUNTER
})

export const updateTotalPrice = () => ({
  type: types.UPDATE_TOTAL_PRICE
})
