import { createSlice } from '@reduxjs/toolkit'
import { SLICES } from 'constants/redux'

const initialState = null

const userDataSlice = createSlice({
  name: SLICES.userData,
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return action.payload
    },
  },
})

export const { setUserData } = userDataSlice.actions

export default userDataSlice.reducer
