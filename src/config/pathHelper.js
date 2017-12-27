import { baseURL } from './axios'

export const productsPath = (slug) => `/list/${slug}`
export const serverURL = (path) => `${baseURL}/${path}`
export const detailPath = (slug, id) => `/detail/${slug}/${id}`