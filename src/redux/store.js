import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './firebase/userSlice.js'

import productModalReducer from './product-modal/productModalSlice'

import cartItemsReducer from './shopping-cart/cartItemsSlice'

import authReducer from './auth/authSlice'

import themeReducer from './theme/themeSlice'

export const store = configureStore({
   reducer: {
      productModal: productModalReducer,
      cartItems: cartItemsReducer,
      user: userReducer,
      auth: authReducer,
      theme: themeReducer
   },
   middleware: [...getDefaultMiddleware({ thunk: true })]

})