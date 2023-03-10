import { createSlice } from '@reduxjs/toolkit'
import { SLICES } from 'constants/redux'

const initialState = 'en'

const languageSlice = createSlice({
  name: SLICES.chainConnected,
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      return action.payload
    },
  },
})

export const { setLanguage } = languageSlice.actions

export default languageSlice.reducer
