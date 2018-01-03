import { 
	ADD_LINE_ITEM, 
	REMOVE_LINE_ITEM, 
	INCREMENT_LINE_ITEM_QUANTITY,
	DECREMENT_LINE_ITEM_QUANTITY, 
	UPDATE_QUANTITY_COUNTER, 
	UPDATE_TOTAL_PRICE  } from '../actions/types'

const initialState = {
	lineItems: [],
	quantityCounter: 0,
	totalPrice: 0,
}

const findIndexOfElementWithKey = (array, element, key) => {
	if(array.length && array.every( e => e[key]) && element && element[key])
		return array.findIndex(e => JSON.stringify(e[key]) === JSON.stringify(element[key]))
	return -1
}

export default (state = initialState, action) => {
	const lineItemIndex = findIndexOfElementWithKey(state.lineItems, action.payload, 'product')
	switch (action.type) {
	case ADD_LINE_ITEM:
		if( lineItemIndex > -1 ){
			return { 
				...state,
				lineItems: state.lineItems.map(item => {
					if(JSON.stringify(item.product) !== JSON.stringify(action.payload.product))
						return item
					return {
						...item,
						quantity: item.quantity + 1
					}  
				}),
			}
		}
		return { 
			...state,
			lineItems:[
				...state.lineItems,
				action.payload  
			],
		}
	case REMOVE_LINE_ITEM: 
		if(lineItemIndex > -1){
			return { 
				...state, 
				lineItems:[
					...state.lineItems.slice(0, lineItemIndex),
					...state.lineItems.slice(lineItemIndex, -1),
				]
			}
		}
		break
	case INCREMENT_LINE_ITEM_QUANTITY:
		return { 
			...state,
			lineItems: state.lineItems.map((item, index) => {
				if(index !== lineItemIndex) 
					return item
				return {
					...item,
					quantity: action.payload.quantity + 1
				}  
			})
		}
	case DECREMENT_LINE_ITEM_QUANTITY:
		return {
			...state,
			lineItems: state.lineItems.map((item, index) => {
				if(index !== lineItemIndex)
					return item
				return {
					...item,
					quantity: action.payload.quantity - 1
				}  
			})
		}
	case UPDATE_QUANTITY_COUNTER:
		return {
			...state,
			quantityCounter: state.lineItems.reduce(
				(sum, item) => item.quantity + sum , 
				0 
			)
		}
	case UPDATE_TOTAL_PRICE:
		return {
			...state,
			totalPrice: Math.round(state.lineItems.reduce(
				(sum, item) => item.product.price * item.quantity + sum , 
				0 
			))
		}  
	default:
		return state
	}
}
