import { combineReducers } from '@reduxjs/toolkit'
import loadingReducer from './slices/loadingSlice'
import modalReducer from './slices/modalSlice'
import appSettingReducer from './slices/appSettingSlice'
import appTokenReducer from './slices/appTokenSlice'
import languageReducer from './slices/languageSlice'
import connectedChainReducer from './slices/connectedChainSlice'
import connectionMethodReducer from './slices/connectionMethodSlice'
import metamaskExtensionReducer from './slices/metamaskExtensionSlice'
import walletConnectReducer from './slices/walletConnectSlice'
import walletConnectV2Reducer from './slices/walletConnectV2Slice'

import userDataReducer from './slices/userDataSlice'
export default combineReducers({
  loading: loadingReducer,
  language: languageReducer,
  tokens: appTokenReducer,
  settingRedux: appSettingReducer,
  chainConnected: connectedChainReducer,
  connectionMethod: connectionMethodReducer,
  metamaskExtension: metamaskExtensionReducer,
  walletConnect: walletConnectReducer,
  walletConnectV2: walletConnectV2Reducer,
  userData: userDataReducer,
  modal: modalReducer,
})
