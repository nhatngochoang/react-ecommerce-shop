import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   login: {
      currentUser: null,
      isFetching: false,
      error: false
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
         state.login.currentUser = action.payload
      },
      loginError: (state) => {
         state.login.isFetching = false
         state.login.error = true
      },
   },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginError } = authSlice.actions

export default authSlice.reducer