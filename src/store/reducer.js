import * as actionTypes from './actions'
import { appName, categories, products } from '../data/fixtures'

const initialState = {
	locale: 'en',
	cartCount: 0,
	appName,
	categories,
	products,
}

const reducer = (state = initialState, action) => {
	switch ( action.type ) {
		case actionTypes.INCREMENT: 
			return { ...state, cartCount: state.cartCount + 1 }
		case actionTypes.SELECT_LANGUAGE:   
			return { ...state, locale: action.payload }
		default: 
			break	
	}
	return state
}

export default reducer