import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { SLICES } from 'constants/redux'
// import TokenService from 'services/Api/Token'
const initialState = []

// asynchronous function with createAsyncThunk
export const fetchToken = createAsyncThunk('appTokens/fetchToken', async () => {
  // // const resTokens = await TokenService.getAll({ limit: 1000 })

  // if (resTokens?.data?.items) {
  //   return resTokens?.data?.items
  // }
  return []
})

const appTokenSlice = createSlice({
  name: SLICES.tokens,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.fulfilled, (_, action) => {
        return action.payload
      })
      .addCase(fetchToken.rejected, () => {
        return initialState
      })
  },
})

export default appTokenSlice.reducer
