import Client from '@walletconnect/sign-client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { getAppMetadata, getSdkError } from '@walletconnect/utils'
import { USER_SIGN } from 'constants/app'
import { CONNECTION_METHOD, DEFAULT_EIP155_METHODS } from 'constants/web3'
import { setUserData } from 'redux/slices/userDataSlice'
import {
  convertToHex,
  getAccountObjectFromAccounts,
  getChainIdsFromAccounts,
  getDataLocal,
  getRequiredNamespaces,
  lowerCase,
  mapChainWithNamespace,
} from 'common/function'
import ReduxService from 'common/redux'
import UserService from 'services/Api/User'

const DEFAULT_APP_METADATA = {
  name: 'Gemnode Bridge',
  description: 'Gemnode Bridge',
  url: process.env.NEXT_PUBLIC_APP_URL,
  icons: ['https://ipfs.pantograph.app/ipfs/QmWuVbEzk45PSKKqKkpW9JbYFdLUpdz2vByCk6z3edu6Z2'],
}

export default class WalletConnectV2Services {
  static client
  static session
  static async initialize() {
    try {
      ReduxService.setLoadingGlobal(true)
      this.client = await Client.init({
        projectId: process.env.NEXT_PUBLIC_REACT_APP_PROJECT_ID,
        metadata: getAppMetadata() || DEFAULT_APP_METADATA,
      })
      console.log('CREATED CLIENT: ', this.client)
      await this._subscribeToEvents()
      await this._checkPersistedState()
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      ReduxService.setLoadingGlobal(false)
    }
  }

  static async onSessionConnected() {
    if (this.session) {
      const allNamespaceAccounts = Object.values(this.session.namespaces)
        .map((namespace) => namespace.accounts)
        .flat()
      ReduxService.updateWalletConnectV2({
        addresses: getAccountObjectFromAccounts(allNamespaceAccounts),
        chainIds: getChainIdsFromAccounts(allNamespaceAccounts),
      })
      const userAddress = getAccountObjectFromAccounts(allNamespaceAccounts)[ReduxService.getChainConnected()]
      const usersSign = getDataLocal(USER_SIGN) || []
      const userSign = usersSign.find((user) => lowerCase(user?.address) === lowerCase(userAddress))
      let user = {
        address: userAddress,
        isSigned: false,
      }
      if (userSign?.token) {
        const resUserLogin = await UserService.getUserByAccessToken(userSign.token)
        if (resUserLogin?.data) {
          user = {
            ...resUserLogin?.data,
            token: userSign?.token,
            isSigned: true,
          }
        }
      }
      ReduxService.callDispatchAction(setUserData(user))
    }
  }

  static async connect(pairing) {
    if (typeof this.client === 'undefined') {
      throw new Error('WalletConnect is not initialized')
    }
    ReduxService.setConnectionMethod(CONNECTION_METHOD.WALLET_CONNECT_V2)
    try {
      const requiredNamespaces = getRequiredNamespaces(mapChainWithNamespace(ReduxService.getChainList()))
      const { uri, approval } = await this.client.connect({
        requiredNamespaces,
        pairingTopic: pairing?.topic,
      })
      if (uri) {
        QRCodeModal.open(uri, () => {
          console.log('EVENT', 'QR Code Modal closed')
        })
      }
      this.session = await approval()
      await this.onSessionConnected()
    } catch (e) {
      console.error(e)
    } finally {
      QRCodeModal.close()
    }
  }

  static async disconnect() {
    try {
      if (typeof this.client === 'undefined') {
        throw new Error('WalletConnect is not initialized')
      }
      if (typeof this.session === 'undefined') {
        throw new Error('Session is not connected')
      }
      await this.client.disconnect({
        topic: this.session.topic,
        reason: getSdkError('USER_DISCONNECTED'),
      })
    } catch (error) {
      console.log(error)
    }
    this.reset()
  }

  static reset() {
    this.session = undefined
    ReduxService.updateWalletConnectV2({
      addresses: null,
      chainIds: [],
    })
    ReduxService.resetUser()
  }

  static async _subscribeToEvents() {
    if (typeof this.client === 'undefined') {
      throw new Error('WalletConnect is not initialized')
    }

    this.client.on('session_ping', (args) => {
      console.log('EVENT', 'session_ping', args)
    })

    this.client.on('session_event', (args) => {
      console.log('EVENT', 'session_event', args)
    })

    this.client.on('session_update', ({ topic, params }) => {
      console.log('EVENT', 'session_update', { topic, params })
      const { namespaces } = params
      const _session = this.client.session.get(topic)
      this.session = { ..._session, namespaces }
      this.onSessionConnected()
    })

    this.client.on('session_delete', () => {
      this.reset()
    })
  }

  static async _checkPersistedState() {
    if (typeof this.client === 'undefined') {
      throw new Error('WalletConnect is not initialized')
    }
    // populates existing pairings to state
    console.log('RESTORED PAIRINGS: ', this.client.pairing.getAll({ active: true }))

    if (typeof this.session !== 'undefined') return
    // populates (the last) existing session to state
    if (this.client.session.length) {
      const lastKeyIndex = this.client.session.keys.length - 1
      this.session = this.client.session.get(this.client.session.keys[lastKeyIndex])
      console.log('RESTORED SESSION:', this.session)
      await this.onSessionConnected()
      return this.session
    }
  }

  static async signPersonalMessage(message) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') {
        throw new Error('WalletConnect is not initialized')
      }
      if (typeof this.session === 'undefined') {
        throw new Error('Session is not connected')
      }

      const user = ReduxService.getUserData()
      const chainId = ReduxService.getChainConnected()
      const { address } = user
      const hexMsg = convertToHex(message)
      const params = [hexMsg, address]

      this.client
        .request({
          topic: this.session.topic,
          chainId: `eip155:${chainId}`,
          request: {
            method: DEFAULT_EIP155_METHODS.PERSONAL_SIGN,
            params,
          },
        })
        .then((result) => resolve(result))
        .catch((error) => {
          return reject(error)
        })
    })
  }

  static async permitToken(userAddress, spenderAddress, namePermit, version, chainId, tokenAddress, amount, nonce, deadline) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') {
        throw new Error('WalletConnect is not initialized')
      }
      if (typeof this.session === 'undefined') {
        throw new Error('Session is not connected')
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

      this.client
        .request({
          topic: this.session.topic,
          chainId: `eip155:${chainId}`,
          request: {
            method: DEFAULT_EIP155_METHODS.ETH_SIGN_TYPED_DATA,
            params: msgParams,
          },
        })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error)
        })
    })
  }

  static permitNFT(spenderAddress, namePermit, version, chainId, tokenAddress, tokenId, nonce, deadline) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') {
        throw new Error('WalletConnect is not initialized')
      }
      if (typeof this.session === 'undefined') {
        throw new Error('Session is not connected')
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

      this.client
        .request({
          topic: this.session.topic,
          chainId: `eip155:${chainId}`,
          request: {
            method: DEFAULT_EIP155_METHODS.ETH_SIGN_TYPED_DATA,
            params: msgParams,
          },
        })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error)
        })
    })
  }

  static signTypedData({ types, domain, value, primaryType = undefined }) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') {
        throw new Error('WalletConnect is not initialized')
      }
      if (typeof this.session === 'undefined') {
        throw new Error('Session is not connected')
      }
      const user = ReduxService.getUserData()
      const userAddress = user?.address
      const typeEIP = {
        types: types,
        domain: domain,
        primaryType: primaryType,
        message: value,
      }
      const message = JSON.stringify(typeEIP)

      const msgParams = [userAddress, message]

      this.client
        .request({
          topic: this.session.topic,
          chainId: `eip155:${ReduxService.getChainConnected()}`,
          request: {
            method: DEFAULT_EIP155_METHODS.ETH_SIGN_TYPED_DATA,
            params: msgParams,
          },
        })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error)
        })
    })
  }

  static async sendTransaction(tx) {
    return new Promise((resolve, reject) => {
      if (typeof this.client === 'undefined') {
        throw new Error('WalletConnect is not initialized')
      }
      if (typeof this.session === 'undefined') {
        throw new Error('Session is not connected')
      }
      const chainId = ReduxService.getChainConnected()
      this.client
        .request({
          topic: this.session.topic,
          chainId: `eip155:${chainId}`,
          request: {
            method: DEFAULT_EIP155_METHODS.ETH_SEND_TRANSACTION,
            params: [tx],
          },
        })
        .then((result) => resolve(result))
        .catch((error) => {
          return reject(error)
        })
    })
  }
}
