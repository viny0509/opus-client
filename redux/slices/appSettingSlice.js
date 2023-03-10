import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import ReduxService from 'common/redux'
import { SLICES } from 'constants/redux'
// import SettingService from 'services/Api/Setting'
const initialState = {}

let timeOut
// asynchronous function with createAsyncThunk
export const fetchSetting = createAsyncThunk('settingRedux/fetchSetting', async () => {
  if (timeOut) {
    clearTimeout(timeOut)
  }
  // const res = await SettingService.getTemplate()
  // if (res?.data) {
  //   if (res.data.liveTime) {
  //     timeOut = setTimeout(() => ReduxService.callDispatchAction(fetchSetting()), res.data.liveTime)
  //   }
  //   return res.data
  // }
  return initialState
})

const appSettingSlice = createSlice({
  name: SLICES.settingRedux,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSetting.fulfilled, (_, action) => {
        return action.payload
      })
      .addCase(fetchSetting.rejected, () => {
        return initialState
      })
  },
})

export default appSettingSlice.reducer
