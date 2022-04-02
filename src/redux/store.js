import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './firebase/userSlice.js'

import productModalReducer from './product-modal/productModalSlice'

import cartItemsReducer from './shopping-cart/cartItemsSlice'

export const store = configureStore({
   reducer: {
      productModal: productModalReducer,
      cartItems: cartItemsReducer,
      user: userReducer
   },
   middleware: [...getDefaultMiddleware({ thunk: true })]

})