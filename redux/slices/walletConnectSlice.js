import { createSlice } from '@reduxjs/toolkit'
import { SLICES } from 'constants/redux'

const initialState = {
  connector: {},
  chainId: 0,
  accounts: [],
  address: '',
  session: {},
  appConnected: null,
}

const walletConnectSlice = createSlice({
  name: SLICES.walletConnect,
  initialState,
  reducers: {
    setWalletConnect: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setWalletConnect } = walletConnectSlice.actions

export default walletConnectSlice.reducer
