import { createSlice } from '@reduxjs/toolkit'
import { SLICES } from 'constants/redux'

const initialState = {
  accounts: [],
  address: '',
}

const metamaskExtensionSlice = createSlice({
  name: SLICES.metamaskExtension,
  initialState,
  reducers: {
    setMetamaskExtension: (state, action) => {
      return action.payload
    },
  },
})

export const { setMetamaskExtension } = metamaskExtensionSlice.actions

export default metamaskExtensionSlice.reducer
