import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   login: {
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
      isFetching: false,
      error: false
   },
   register: {
      isFetching: false,
      error: false,
   }
}

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      loginStart: (state) => {
         state.login.isFetching = true
      },
      loginSuccess: (state, action) => {
         state.login.isFetching = false
         state.login.error = false
         // state.login.currentUser = action.payload
      },
      loginError: (state) => {
         state.login.isFetching = false
         state.login.error = true
      },
      registerStart: (state) => {
         state.register.isFetching = true
      },
      registerSuccess: (state) => {
         state.register.isFetching = false
         state.register.error = false
      },
      registerError: (state) => {
         state.register.isFetching = false
         state.register.error = true
      },
   },
})

// Action creators are generated for each case reducer function
export const {
   loginStart,
   loginSuccess,
   loginError,
   registerStart,
   registerSuccess,
   registerError
} = authSlice.actions

export default authSlice.reducer