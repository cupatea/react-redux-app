import { FETCH_PRODUCTS, LOAD_MORE_PRODUCTS, PENDING, FULFILLED, REJECTED } from '../actions/types'

const initialState = {
  products: [],
  category: null,
  count: 0,
  pagesLoaded: 0,
  hasMore: false,
  updating: false,
  updated: false,
  updateError: false,
  loading: false,
  loaded: false,
  error: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_PRODUCTS + PENDING :
    return {
      ...state,
      loading: true,
      loaded: false,
    }
  case FETCH_PRODUCTS + FULFILLED :
    return {
      ...state,
      category: action.payload.data.category,
      products: action.payload.data.products,
      count: action.payload.data.count,
      pagesLoaded: 1,
      hasMore: action.payload.data.hasMore,
      loading: false,
      loaded: true,
      error: false,
    }
  case FETCH_PRODUCTS + REJECTED :
    return {
      ...state,
      loading: false,
      loaded: false,
      error: true,
    }
  case LOAD_MORE_PRODUCTS + PENDING :
    return {
      ...state,
      updating: true,
      updated: false,
    }
  case LOAD_MORE_PRODUCTS + FULFILLED :
    return {
      ...state,
      products: [
        ...state.products,
        ...action.payload.data.products,
      ],
      updating: false,
      updated: true,
      updateError: false,
      pagesLoaded: state.pagesLoaded + 1,
      hasMore: state.products.length + action.payload.data.products.length < state.count,
    }
  case LOAD_MORE_PRODUCTS + REJECTED :
    return {
      ...state,
      updating: false,
      updated: false,
      updateError: true,
    }
  default:
    return state
  }
}
