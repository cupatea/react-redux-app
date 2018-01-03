import { FETCH_PRODUCTS, PENDING, FULFILLED, REJECTED } from '../actions/types'

const initialState = {
	products: [],
	category: null,
	count: 0,
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
	default:
		return state
	}
}
