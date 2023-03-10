import { createSlice } from '@reduxjs/toolkit'
import { SLICES } from 'constants/redux'

const initialState = null

const connectionMethodSlice = createSlice({
  name: SLICES.connectionMethod,
  initialState,
  reducers: {
    setConnectionMethod: (state, action) => {
      return action.payload
    },
  },
})

export const { setConnectionMethod } = connectionMethodSlice.actions

export default connectionMethodSlice.reducer
