import { SET_LANGUAGE } from '../actions/types'
import messages, { defaultLocale, locales, appName, shortName } from '../config/i18n'
const initialState = {
  locale: defaultLocale,
  locales,
  appName,
  shortName,
  messages: messages(defaultLocale)
}

export default (state = initialState, action) => {
  switch (action.type) {

  case SET_LANGUAGE:
    return {
      ...state,
      locale: action.payload,
      messages: messages(action.payload)
    }
  default:
    return state
  }
}
