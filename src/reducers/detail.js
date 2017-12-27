import { FETCH_DETAIL, PENDING, FULFILLED, REJECTED } from '../actions/types'

const initialState = {
  product: null,
  categorySlug: null,
  loading: false,
  loaded: false,
  error: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL + PENDING :
    return { 
      ...state, 
      loading: true,
      loaded: false,
    }
    case FETCH_DETAIL + FULFILLED :
      return { 
        ...state, 
        categorySlug: action.payload.data.categorySlug, 
        product: action.payload.data.product, 
        loading: false,
        loaded: true,
        error: false,
      }
    case FETCH_DETAIL + REJECTED :
    return { 
      ...state, 
      loading: false,
      loaded: false,
      error: true,
    }
    default:
      return state
  }
}
