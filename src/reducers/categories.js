import { FETCH_CATEGORIES, FULFILLED, PENDING, REJECTED } from '../actions/types'

const initialState = {
  data: [],
  loading: false,
  loaded: false,
  error: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES + PENDING:
      return { 
        ...state, 
        loading: true,
        loaded: false,
      }
    case FETCH_CATEGORIES + FULFILLED:
      return { 
        ...state, 
        loading: false,
        loaded: true,
        error: false,
        data: action.payload.data,
      }
    case FETCH_CATEGORIES + REJECTED:
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
