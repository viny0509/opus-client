import { createSlice } from '@reduxjs/toolkit'
import { SLICES } from 'constants/redux'

const initialState = {
  addresses: null,
  chainIds: [],
  chainListWillConnect: [],
}

const walletConnectV2Slice = createSlice({
  name: SLICES.walletConnectV2,
  initialState,
  reducers: {
    setWalletConnectV2: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setWalletConnectV2 } = walletConnectV2Slice.actions

export default walletConnectV2Slice.reducer
