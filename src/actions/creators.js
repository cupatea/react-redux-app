import * as types from './types' 

export const initUiState = (state) => ({ 
  type: types.FETCH_UI_STATE,
  payload: state
})
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
export const initDetail = (detail) => ({ 
  type: types.FETCH_DETAIL,
  payload: detail
})