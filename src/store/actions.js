export const INCREMENT = 'INCREMENT'
export const SELECT_LANGUAGE = 'SELECT_LANGUAGE'

export const increment = () => ({ type: INCREMENT })
export const selectLanguage = (lang) => ({type: SELECT_LANGUAGE, payload: lang })