import { createSlice } from '@reduxjs/toolkit'
import { CHAIN_ID } from 'constants/chain'
import { SLICES } from 'constants/redux'

const initialState = CHAIN_ID.AVAX

const connectedChainSlice = createSlice({
  name: SLICES.chainConnected,
  initialState,
  reducers: {
    setConnectedChain: (state, action) => {
      return action.payload
    },
  },
})

export const { setConnectedChain } = connectedChainSlice.actions

export default connectedChainSlice.reducer
