export const OBSERVER_KEY = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_DRAWER: 'SIGN_IN_DRAWER',
  FOOTER_DRAWER: 'FOOTER_DRAWER',
  ALREADY_SIGNED: 'ALREADY_SIGNED',
  CHANGED_ACCOUNT: 'CHANGED_ACCOUNT',
  REHYDRATED: 'REHYDRATED',
}

export const CONNECTION_METHOD = {
  METAMASK: 'METAMASK',
  WALLET_CONNECT: 'WALLET_CONNECT',
  WALLET_CONNECT_V2: 'WALLET_CONNECT_V2',
}

export const DEFAULT_LOGGER = 'debug'

export const CLIENT_EVENTS = {
  session: {},
  pairing: {
    delete: 'pairing_delete',
  },
}

export const DEFAULT_EIP155_METHODS = {
  ETH_SEND_TRANSACTION: 'eth_sendTransaction',
  ETH_SIGN_TRANSACTION: 'eth_signTransaction',
  ETH_SIGN: 'eth_sign',
  PERSONAL_SIGN: 'personal_sign',
  ETH_SIGN_TYPED_DATA: 'eth_signTypedData',
}

export const DEFAULT_EIP_155_EVENTS = {
  ETH_CHAIN_CHANGED: 'chainChanged',
  ETH_ACCOUNTS_CHANGED: 'accountsChanged',
}

/**
 * COSMOS
 */
export const DEFAULT_COSMOS_METHODS = {
  COSMOS_SIGN_DIRECT: 'cosmos_signDirect',
  COSMOS_SIGN_AMINO: 'cosmos_signAmino',
}

export const DEFAULT_COSMOS_EVENTS = {}

/**
 * SOLANA
 */
export const DEFAULT_SOLANA_METHODS = {
  SOL_SIGN_TRANSACTION: 'solana_signTransaction',
  SOL_SIGN_MESSAGE: 'solana_signMessage',
}

export const DEFAULT_SOLANA_EVENTS = {}

/**
 * POLKADOT
 */
export const DEFAULT_POLKADOT_METHODS = {
  POLKADOT_SIGN_TRANSACTION: 'polkadot_signTransaction',
  POLKADOT_SIGN_MESSAGE: 'polkadot_signMessage',
}

export const DEFAULT_POLKADOT_EVENTS = {}

/**
 * NEAR
 */
export const DEFAULT_NEAR_METHODS = {
  NEAR_SIGN_IN: 'near_signIn',
  NEAR_SIGN_OUT: 'near_signOut',
  NEAR_GET_ACCOUNTS: 'near_getAccounts',
  NEAR_SIGN_AND_SEND_TRANSACTION: 'near_signAndSendTransaction',
  NEAR_SIGN_AND_SEND_TRANSACTIONS: 'near_signAndSendTransactions',
}

export const DEFAULT_NEAR_EVENTS = {}

/**
 * ELROND
 */
export const DEFAULT_ELROND_METHODS = {
  ELROND_SIGN_TRANSACTION: 'erd_signTransaction',
  ELROND_SIGN_TRANSACTIONS: 'erd_signTransactions',
  ELROND_SIGN_MESSAGE: 'erd_signMessage',
  ELROND_SIGN_LOGIN_TOKEN: 'erd_signLoginToken',
}

export const DEFAULT_ELROND_EVENTS = {}

export const EXTRA_RATE_GAS = 1.1
