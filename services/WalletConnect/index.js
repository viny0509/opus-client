/* eslint-disable no-undef */
import WalletConnect from '@walletconnect/client'
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal'
import { CHAIN_DATA } from 'constants/chain'
import { CONNECTION_METHOD, OBSERVER_KEY } from 'constants/web3'
import { setConnectedChain } from 'redux/slices/connectedChainSlice'
import { convertToHex, getDataLocal, prepareDataForWalletConnect, removeDataLocal, saveDataLocal } from 'common/function'
import Observer from 'common/observer'
import ReduxService from 'common/redux'
import { WALLET_CONNECT_APP } from 'constants/walletconnect-app'

const DEFAULT_BRIDGE = 'https://bridge.keyringpro.com'
const INITIAL_STATE = {
  connector: null,
  connected: false,
  chainId: 0,
  accounts: [],
  address: '',
  session: {},
}
let connector

export default class WalletConnectServices {
  static async initialize(prevConnector = null, isMobile = false) {
    try {
      if (prevConnector) {
        let oldSession = getDataLocal('wallet_connect_session')
        connector = new WalletConnect({ session: oldSession || prevConnector.session, bridge: DEFAULT_BRIDGE })
      } else {
        if (isMobile) {
          connector = new WalletConnect({
            bridge: DEFAULT_BRIDGE,
            session: INITIAL_STATE.session,
          })
        } else {
          connector = new WalletConnect({
            bridge: DEFAULT_BRIDGE,
            qrcodeModal: WalletConnectQRCodeModal,
            session: INITIAL_STATE.session,
          })
        }
      }

      ReduxService.updateWalletConnect({ connector: JSON.parse(JSON.stringify(connector)) })

      if (!connector.connected) {
        await connector.createSession({ chainId: ReduxService.getChainConnected() })
      } else {
        const { accounts, chainId, peerMeta } = connector
        this.onConnect(connector, accounts, chainId, peerMeta)
      }

      this.subscribeToEvents()

      return connector
    } catch (error) {
      console.log('walletconnect initialize', error)
      return null
    }
  }

  static async initializeMobileDeeplink() {
    const connectedChain = ReduxService.getChainConnected()

    try {
      // create new connector
      connector = new WalletConnect({
        bridge: DEFAULT_BRIDGE,
        session: {},
      })
      ReduxService.updateWalletConnect({ connector: JSON.parse(JSON.stringify(connector)) })
      if (!connector.connected) {
        await connector.createSession({ chainId: connectedChain })
      } else {
        const { accounts, chainId, peerMeta } = connector
        this.onConnect(connector, accounts, chainId, peerMeta)
      }
      this.subscribeToEvents()
      return connector
    } catch (error) {
      console.log(error)
    }
  }

  static async refresh(isMobile = false) {
    let walletConnect = ReduxService.getWalletConnect()
    const prevConnector = walletConnect.connector
    const res = await this.initialize(prevConnector, isMobile)
    if (res) {
      return true
    } else {
      return false
    }
  }

  static subscribeToEvents() {
    if (!connector) {
      return
    }

    connector.on('session_update', (error, payload) => {
      console.log('session_update', error, payload)
      if (error) {
        throw error
      }

      // get updated accounts and chainId
      const { accounts, chainId } = payload.params[0]
      this.onSessionUpdate(accounts, chainId)
    })

    connector.on('session_request', (error, payload) => {
      console.log('session_request', error, payload)
      if (error) {
        throw error
      }
    })

    connector.on('connect', (error, payload) => {
      console.log('connect', error, payload)
      if (error) {
        throw error
      }

      // get updated accounts and chainId
      const { accounts, chainId, peerMeta } = payload.params[0]
      this.onConnect(connector, accounts, chainId, peerMeta)
      saveDataLocal('wallet_connect_session', connector.session)
    })

    connector.on('disconnect', (error, payload) => {
      console.log('disconnect', error, payload)
      if (error) {
        throw error
      }

      // delete connector
      this.onDisconnect()
    })
  }

  static onSessionUpdate(accounts, chainId) {
    const address = accounts[0]
    if (ReduxService.getConnectionMethod() === CONNECTION_METHOD.WALLET_CONNECT && chainId !== ReduxService.getChainConnected()) {
      ReduxService.callDispatchAction(setConnectedChain(chainId))
      this.onConnect(connector, connector.accounts, connector.chainId, connector.peerMeta)
    }
    saveDataLocal('wallet_connect_session', connector.session)
    ReduxService.updateWalletConnect({
      chainId,
      accounts,
      address,
    })
  }

  static onDisconnect() {
    this.resetApp()
  }

  static resetApp() {
    // update redux state
    ReduxService.updateWalletConnect(INITIAL_STATE)
    ReduxService.resetUser()
    Observer.emit(OBSERVER_KEY.CHANGED_ACCOUNT)
    removeDataLocal('wallet_connect_session')
  }

  static killSession = () => {
    if (connector) {
      connector.killSession()
    }
    this.resetApp()
  }

  static formatIOSMobile = (uri, entry) => {
    const encodedUri = encodeURIComponent(uri)
    return entry.universalLink
      ? `${entry.universalLink}/wc?uri=${encodedUri}`
      : entry.deepLink
      ? `${entry.deepLink}${entry.deepLink.endsWith(':') ? '//' : '/'}wc?uri=${encodedUri}`
      : ''
  }

  static async onConnect(connector, accounts, chainId, peerMeta) {
    const address = accounts[0]
    const { name } = peerMeta
    const appConnected = WALLET_CONNECT_APP.find((item) => item.name.toLowerCase().startsWith(name?.toLowerCase()))

    await ReduxService.updateWalletConnect({
      connector,
      connected: true,
      chainId,
      accounts,
      address,
      session: connector.session,
      appConnected,
    })
    ReduxService.loginWalletConnect(null, null)
  }

  static sendTransaction(tx) {
    let walletConnect = ReduxService.getWalletConnect()
    const { connector } = walletConnect
    if (!(connector && connector.connected)) {
      this.killSession()
      return
    }

    return new Promise((resolve, reject) => {
      // Sign transaction
      connector
        .sendTransaction(tx)
        .then((result) => {
          // Returns signed transaction
          return resolve(result)
        })
        .catch((error) => {
          // Error returned when rejected
          return reject(error)
        })
    })
  }

  static signPersonalMessage(message, address) {
    let walletConnect = ReduxService.getWalletConnect()
    const { connector } = walletConnect
    if (!(connector && connector.connected)) {
      this.killSession()
      return
    }
    const msgParams = [convertToHex(message), address]

    return new Promise((resolve) => {
      // Sign transaction
      connector
        .signPersonalMessage(msgParams)
        .then((result) => {
          // Returns signed transaction
          return resolve(result)
        })
        .catch((error) => {
          console.log(error)
          // Error returned when rejected
          return resolve(null)
        })
    })
  }

  static async switchChain(chainId) {
    try {
      const chain = CHAIN_DATA[chainId]
      let walletConnect = ReduxService.getWalletConnect()
      const { connector } = walletConnect
      if (!connector) {
        return false
      }
      // Sign transaction
      const requestData = '0x'
      // const additionalData = {
      //   type: 'CONFIRM_CHANGE_NETWORK',
      // }
      const customRequest = {
        id: new Date().getTime(),
        jsonrpc: '2.0',
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: chain.chainId,
            data: prepareDataForWalletConnect(requestData),
          },
        ],
      }
      return new Promise((resolve) => {
        // Sign transaction
        connector.sendCustomRequest(customRequest).catch((error) => {
          console.log(error)
          // Error returned when rejected
          return resolve(false)
        })
        connector.on('session_update', (error, payload) => {
          console.log('session_update_switch_chain', error, payload)
          if (error) {
            throw error
          }
          return resolve(true)
        })
      })
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static permitToken(userAddress, spenderAddress, namePermit, version, chainId, tokenAddress, amount, nonce, deadline) {
    if (!(connector && connector.connected)) {
      this.killSession()
      return
    }

    const typeEIP = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Permit: [
          {
            name: 'owner',
            type: 'address',
          },
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
          {
            name: 'nonce',
            type: 'uint256',
          },
          {
            name: 'deadline',
            type: 'uint256',
          },
        ],
      },
      domain: {
        name: namePermit,
        version,
        chainId,
        verifyingContract: tokenAddress,
      },
      primaryType: 'Permit',
      message: {
        owner: userAddress,
        spender: spenderAddress,
        value: amount,
        nonce,
        deadline,
      },
    }
    const message = JSON.stringify(typeEIP)

    const msgParams = [userAddress, message]

    return new Promise((resolve, reject) => {
      // Sign transaction
      connector
        .signTypedData(msgParams)
        .then((result) => {
          // Returns signed transaction
          return resolve(result)
        })
        .catch((error) => {
          // Error returned when rejected
          return reject(error)
        })
    })
  }

  static permitNFT(spenderAddress, namePermit, version, chainId, tokenAddress, tokenId, nonce, deadline) {
    if (!(connector && connector.connected)) {
      this.killSession()
      return
    }
    const user = ReduxService.getUserData()
    const userAddress = user?.address
    const typeEIP = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Permit: [
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'tokenId',
            type: 'uint256',
          },
          {
            name: 'nonce',
            type: 'uint256',
          },
          {
            name: 'deadline',
            type: 'uint256',
          },
        ],
      },
      domain: {
        name: namePermit,
        version,
        chainId,
        verifyingContract: tokenAddress,
      },
      primaryType: 'Permit',
      message: {
        spender: spenderAddress,
        tokenId,
        nonce,
        deadline,
      },
    }
    const message = JSON.stringify(typeEIP)

    const msgParams = [userAddress, message]

    return new Promise((resolve, reject) => {
      // Sign transaction
      connector
        .signTypedData(msgParams)
        .then((result) => {
          // Returns signed transaction
          return resolve(result)
        })
        .catch((error) => {
          // Error returned when rejected
          return reject(error)
        })
    })
  }

  static signTypedData({ domain, types, value, primaryType = undefined }) {
    if (!(connector && connector.connected)) {
      this.killSession()
      return
    }
    const user = ReduxService.getUserData()
    const userAddress = user?.address
    const typeEIP = {
      types,
      domain,
      primaryType,
      message: value,
    }
    const message = JSON.stringify(typeEIP)

    const msgParams = [userAddress, message]

    return new Promise((resolve, reject) => {
      // Sign transaction
      connector
        .signTypedData(msgParams)
        .then((result) => {
          // Returns signed transaction
          return resolve(result)
        })
        .catch((error) => {
          // Error returned when rejected
          return reject(error)
        })
    })
  }
}
