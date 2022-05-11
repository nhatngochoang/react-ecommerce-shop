import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userApi from "../../api/userApi.js"

export const getMe = createAsyncThunk('user/getMe', async (params, thunkApi) => {
   // thunkApi.dispatch(...)
   const currentUser = await userApi.getMe()
   return currentUser // currentUser === action.payload
})

export const userSlice = createSlice({
   name: 'user',
   initialState: {
      current: {},
      loading: false,
      error: null,
      userID: null
   },
   reducers: {
      setUserID: (state, action) => {
         state.userID = action.payload
      },
      setUserIDNull: (state) => {
         state.userID = null
      }
   },
   extraReducers: {
      [getMe.pending]: state => {
         state.loading = true;
      },
      [getMe.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.error
      },
      [getMe.fulfilled]: (state, action) => {
         state.loading = false;
         state.current = action.payload
      }
   },
})

export const {
   setUserID,
   setUserIDNull
} = userSlice.actions

export default userSlice.reducer
