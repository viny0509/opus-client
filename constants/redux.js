// Name for using in createSlice(...) in redux/slices
export const SLICES = {
  loading: 'loading',
  settingRedux: 'settingRedux',
  tokens: 'tokens',
  language: 'language',
  chainConnected: 'chainConnected',
  connectionMethod: 'connectionMethod',
  walletConnect: 'walletConnect',
  walletConnectV2: 'walletConnectV2',
  metamaskExtension: 'metamaskExtension',
  userData: 'userData',
  modal: 'modal',
}

// which redux data will be stored in redux-persist (localstorage)
export const REDUX_PERSIST_WHITELIST = [
  SLICES.settingRedux,
  SLICES.tokens,
  SLICES.language,
  SLICES.chainConnected,
  SLICES.connectionMethod,
  SLICES.walletConnect,
  SLICES.walletConnectV2,
  SLICES.metamaskExtension,
  SLICES.userData,
]
