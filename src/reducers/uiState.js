import { FETCH_UI_STATE, SET_LANGUAGE, PENDING, REJECTED, FULFILLED } from '../actions/types'

const initialState = {
  locales: [],
  locale: 'ua',
  appName: '',
  shortName: '',
  drawerPoints: [],
  actionButtonText: '',
  footerButtonText: '',
  loading: false,
  loaded: false,
  error: false,

}

export default (state = initialState, action) => {
  switch (action.type) {
  case FETCH_UI_STATE + PENDING:
    return {
      ...state,
      loading: true,
      loaded: false,
    }
  case FETCH_UI_STATE + FULFILLED:
    return {
      ...state,
      locales: action.payload.data.locales,
      locale: action.payload.data.locale,
      appName:  action.payload.data.appName,
      shortName: action.payload.data.shortName,
      drawerPoints: action.payload.data.drawerPoints,
      actionButtonText: action.payload.data.actionButtonText,
      footerButtonText: action.payload.data.footerButtonText,
      loading: false,
      loaded: true,
      error: false
    }
  case FETCH_UI_STATE + REJECTED:
    return {
      ...state,
      loading: false,
      loaded: false,
      error: true,
    }
  case SET_LANGUAGE:
    return {
      ...state,
      locale: action.payload
    }
  default:
    return state
  }
}
