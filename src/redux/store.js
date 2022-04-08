import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import userReducer from './firebase/userSlice.js'

import productModalReducer from './product-modal/productModalSlice'

import cartItemsReducer from './shopping-cart/cartItemsSlice'

import authReducer from './auth/authSlice'

import themeReducer from './theme/themeSlice'

import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
   key: 'root',
   version: 1,
   storage,
}

const rootReducer = combineReducers({
   productModal: productModalReducer,
   cartItems: cartItemsReducer,
   user: userReducer,
   auth: authReducer,
   theme: themeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//    reducer: persistedReducer,
//    middleware: [...getDefaultMiddleware({ thunk: true })]
// })

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
         thunk: true
      }),
})

export let persistor = persistStore(store)
