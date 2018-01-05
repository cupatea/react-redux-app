export const defaultLocale = 'en'
export const locales = ['en', 'ua', 'ru']
export const appName = 'React Shop'
export const shortName = 'Shop'

const messages = {
  en: {
    actionButtonText: 'Shop now',
    footerButtonText: 'Contacts',
    categories: 'Categories',
    languages: 'Language',
    item:{
      one: 'item',
      few: 'item',
      many: 'items',
    },
    currency: '₴',
    addToCart: 'Add to cart',
    description: 'Description',
    sizes:{
      bra: "Bra",
      standard: "Panties",
    },
    checkout: 'Checkout',
    total: 'Total',
    cart: 'Cart',
    your: 'Your ',
    isEmpty: ' is empty',
  },
  ua: {
    actionButtonText: 'Купити',
    footerButtonText: 'Контакти',
    categories: 'Категорії',
    languages: 'Мова',
    item:{
      one: 'позиція',
      few: 'позиції',
      many: 'позицій',
    },
    currency: '₴',
    addToCart: 'В кошик',
    description: "Опис",
    sizes:{
      bra: "Розмір бюстгальтера",
      standard: "Розмір трусів",
    },
    checkout: 'Оформити',
    total: 'Сума',
    cart: 'Кошик',
    your: 'Ваш ',
    isEmpty: ' пустий'
  },
  ru: {
    actionButtonText: 'Купить',
    footerButtonText: 'Контакты',
    categories: 'Категории',
    languages: 'Язык',
    item:{
      one: 'позиция',
      few: 'позиции',
      many: 'позиций',
    },
    currency: '₴',
    addToCart: 'В корзину',
    description: 'Описание',
    sizes:{
      bra: "Размер бюстгальтера",
      standard: "Размер трусов",
    },
    checkout: 'Оформить',
    total: 'Сумма',
    cart: 'Корзина',
    your: 'Ваша ',
    isEmpty: ' пуста'
  }
}
export default (locale) => messages[locale]
