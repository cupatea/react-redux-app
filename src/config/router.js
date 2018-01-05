export const rootPath = (locale = '') => locale ?  `/${locale}/` : '/'
export const productsPath = (slug, locale = '') => locale ? `/${locale}/list/${slug}` : `/list/${slug}`
export const detailPath = (slug, id, locale = '') => locale ? `/${locale}/detail/${slug}/${id}` : `/detail/${slug}/${id}`
export const cartPath = (locale = '') => locale ? `/${locale}/cart` : `/cart`
