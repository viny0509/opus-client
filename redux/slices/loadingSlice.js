import { createSlice } from '@reduxjs/toolkit'
import { SLICES } from 'constants/redux'

const initState = {
  // for init
  value: true,
  loadingCount: 1,
}

export const loadingSlice = createSlice({
  name: SLICES.loading,
  initialState: initState,
  reducers: {
    setLoadingGlobal: (state, action) => {
      if (action.payload) {
        state.loadingCount = state.loadingCount + 1
      } else {
        state.loadingCount = state.loadingCount - 1
      }

      if (state.loadingCount < 0) {
        state.loadingCount = 0
      }

      if (state.loadingCount <= 0) {
        state.value = false
      } else {
        state.value = true
      }
    },
  },
})

export const { setLoadingGlobal } = loadingSlice.actions

export default loadingSlice.reducer
