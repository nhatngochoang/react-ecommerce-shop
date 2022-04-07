import { createSlice } from '@reduxjs/toolkit'

const themeMode = localStorage.getItem('themeMode')

const themeColor = localStorage.getItem('colorMode')

const initialState = {
   mode: themeMode,
   color: themeColor,
}

export const themeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      setMode: (state, action) => {
         state.mode = action.payload
      },
      setColor: (state, action) => {
         state.color = action.payload
      }
   },
})

// Action creators are generated for each case reducer function
export const {
   setMode,
   setColor,
} = themeSlice.actions

export default themeSlice.reducer