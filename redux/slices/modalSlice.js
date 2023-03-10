import { createSlice } from '@reduxjs/toolkit'
import { SLICES } from 'constants/redux'

const initialState = null

const modalSlice = createSlice({
  name: SLICES.modal,
  initialState,
  reducers: {
    setModal: (state, action) => {
      if (action.payload === null && state?.afterClose) {
        state?.afterClose()
      }
      return action.payload
    },
  },
})

export const { setModal } = modalSlice.actions

export default modalSlice.reducer
