/* eslint-disable no-undef */
/* eslint-disable no-async-promise-executor */

import { USER_SIGN } from 'constants/app'
import { CHAIN_DATA } from 'constants/chain'
import { CONNECTION_METHOD } from 'constants/web3'
import { isMobile } from 'react-device-detect'
import { setConnectedChain } from 'redux/slices/connectedChainSlice'
import { setConnectionMethod } from 'redux/slices/connectionMethodSlice'
import { setLoadingGlobal } from 'redux/slices/loadingSlice'
import { setMetamaskExtension } from 'redux/slices/metamaskExtensionSlice'
import { setModal } from 'redux/slices/modalSlice'
import { setUserData } from 'redux/slices/userDataSlice'
import { setWalletConnect } from 'redux/slices/walletConnectSlice'
import { setWalletConnectV2 } from 'redux/slices/walletConnectV2Slice'
import { storeRedux as store } from 'redux/store'
import TokenService from 'services/Api/Token'
import UserService from 'services/Api/User'
import MetamaskServices from 'services/MetaMask'
import WalletConnectServices from 'services/WalletConnect'
import WalletConnectV2Services from 'services/WalletConnectV2'
import { getDataLocal, lowerCase, removeDataLocal, saveDataLocal, showNotificationError } from './function'

export default class ReduxService {
  static callDispatchAction(action) {
    store.dispatch(action)
  }

  static getMetaMask() {
    const { metamaskExtension } = store.getState()
    return metamaskExtension
  }
  static getModal() {
    const { modal } = store.getState()
    return modal
  }

  static getChainList() {
    const { walletConnectV2 } = store.getState()
    const { chainListWillConnect } = walletConnectV2
    return chainListWillConnect
  }

  static getBearerToken() {
    const userData = ReduxService.getUserData()
    if (ReduxService.checkIsSigned()) {
      return `Bearer ${userData.token}`
    } else {
      return null
    }
  }

  static getWalletConnect() {
    const { walletConnect } = store.getState()
    return walletConnect
  }

  static getWalletConnectV2() {
    const { walletConnectV2 } = store.getState()
    return walletConnectV2
  }

  static getConnectionMethod() {
    const { connectionMethod } = store.getState()
    return connectionMethod
  }

  static getUserData() {
    const { userData } = store.getState()
    return userData
  }

  static getCountryCode() {
    const { settingRedux } = store.getState()
    return settingRedux?.location?.code
  }

  static getChainConnected() {
    const { chainConnected } = store.getState()
    return Number(chainConnected)
  }

  static updateUserData(data) {
    const userData = this.getUserData()
    const newUser = { ...userData, ...data }
    ReduxService.callDispatchAction(setUserData(newUser))
  }

  static updateMetamask(data) {
    const metamask = this.getMetaMask()
    let newMetamask = { ...metamask, ...data }
    ReduxService.callDispatchAction(setMetamaskExtension(newMetamask))
  }

  static updateWalletConnect(data) {
    const walletConnect = this.getWalletConnect()
    let newWalletConnect = { ...walletConnect, ...data }
    ReduxService.callDispatchAction(setWalletConnect(newWalletConnect))
  }

  static updateWalletConnectV2(data) {
    const walletConnectV2 = this.getWalletConnect()
    let newWalletConnectV2 = { ...walletConnectV2, ...data }
    ReduxService.callDispatchAction(setWalletConnectV2(newWalletConnectV2))
  }

  static setLoadingGlobal(state) {
    ReduxService.callDispatchAction(setLoadingGlobal(state))
  }

  static setConnectionMethod(state) {
    ReduxService.callDispatchAction(setConnectionMethod(state))
  }

  static setChainConnected(state) {
    ReduxService.callDispatchAction(setConnectedChain(Number(state)))
  }

  static resetApp() {
    const { connectionMethod } = store.getState()
    if (connectionMethod === CONNECTION_METHOD.METAMASK) {
      ReduxService.resetUser()
    } else if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT) {
      WalletConnectServices.killSession()
    } else if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT_V2) {
      WalletConnectV2Services.disconnect()
    }
  }

  static resetUser() {
    removeDataLocal(USER_SIGN)
    ReduxService.callDispatchAction(setUserData(null))
    ReduxService.callDispatchAction(setConnectionMethod(''))
  }

  static async refreshUserData(accessToken) {
    if (accessToken) {
      const res = await UserService.getUserByAccessToken(accessToken)
      if (res?.data) {
        ReduxService.updateUserData({ ...res.data })
      }
    } else {
      try {
        const res = await UserService.getUser()
        if (res?.data) {
          ReduxService.updateUserData({ ...res.data })
        }
      } catch (error) {
        ReduxService.resetApp()
      }
    }
  }

  static async loginMetamask(callbackAfterLogin = null, callbackError = null) {
    return new Promise(async (resolve, reject) => {
      const metamask = this.getMetaMask()
      let currentWeb3 = window.ethereum

      try {
        if (!currentWeb3) {
          showNotificationError('Install Metamask')
          return resolve(null)
        }

        const findNetwork = parseInt(ReduxService.getChainConnected())
        let network = findNetwork || 0
        if (parseInt(metamask.chainId) !== network) {
          showNotificationError(`Please switch to ${CHAIN_DATA[findNetwork]?.chainName}`)
          return resolve(null)
        }

        if (metamask.accounts) {
          let isSigned = ReduxService.checkIsSigned()
          if (!isSigned) {
            this.connectMetamaskWithOutSign(callbackAfterLogin, callbackError)
          } else {
            callbackAfterLogin && callbackAfterLogin()
            return resolve(null)
          }
        } else {
          return resolve(null)
        }
      } catch (error) {
        callbackError && callbackError()
        return reject(error)
      }
    })
  }

  static connectMetamaskWithSign(callbackAfterLogin = null, callbackError = null) {
    return new Promise(async (resolve, reject) => {
      try {
        const metamask = this.getMetaMask()
        const resMessage = await UserService.getMessageHash({ address: metamask.address })
        const message = resMessage?.data?.hash
        let signature = await MetamaskServices.signPersonalMessage(metamask.address, message ?? 'SIGN MESSAGE')
        if (signature) {
          let newMetaMask = Object.assign({}, metamask)
          ReduxService.updateMetamask(newMetaMask)
          const resUserLogin = (await UserService.signIn(metamask.address, signature))?.data
          if (resUserLogin) {
            let newUserLogin = Object.assign(
              {},
              {
                ...resUserLogin,
                isSigned: true,
              }
            )
            ReduxService.updateUserData(newUserLogin)
            callbackAfterLogin && callbackAfterLogin()
          } else {
            showNotificationError('Sign error')
            ReduxService.callDispatchAction(setUserData({}))
            callbackError && callbackError()
            return reject()
          }
          return resolve()
        } else {
          showNotificationError('Active Metamask')
          ReduxService.callDispatchAction(setUserData({}))
          callbackError && callbackError()
          return reject()
        }
      } catch (error) {
        console.log(error)
        showNotificationError('Connect Metamask Error')
        ReduxService.resetApp()
        ReduxService.callDispatchAction(setModal(null))
        reject(error)
      }
    })
  }

  static async connectMetamaskWithOutSign(callbackAfterLogin = null, callbackError = null) {
    return new Promise(async (resolve, reject) => {
      try {
        const metamask = this.getMetaMask()
        let newMetaMask = Object.assign({}, metamask)
        this.updateMetamask(newMetaMask)
        let newUserLogin = Object.assign({}, { address: metamask.address })
        ReduxService.updateUserData(newUserLogin)
        callbackAfterLogin && callbackAfterLogin()
        return resolve()
      } catch (error) {
        showNotificationError('Connect Metamask Error')
        callbackError && callbackError()
        reject(error)
      }
    })
  }

  static async refreshUser() {
    const userData = this.getUserData()
    const isSigned = ReduxService.checkIsSigned()
    if (isSigned) {
      // Call api get user
      // let resUser = await HubService.getUserBySignatureHub(userData.sig)
      let resUser = { address: userData?.address }
      if (resUser && resUser.address) {
        let newUser = {
          ...userData,
          ...resUser,
        }
        ReduxService.callDispatchAction(setUserData(newUser))
      } else {
        ReduxService.callDispatchAction(setUserData(null))
      }
    }
  }

  static async loginWalletConnect(callbackAfterLogin = null, callbackError = null) {
    return new Promise(async (resolve, reject) => {
      const { walletConnect } = store.getState()
      try {
        if (!walletConnect.connector) {
          showNotificationError('Connect Wallet Error')
          return resolve(null)
        }

        const findNetwork = parseInt(ReduxService.getChainConnected())

        let netword = findNetwork || 0

        if (walletConnect.chainId !== netword) {
          showNotificationError(`Only support network ${netword}`)
          ReduxService.updateWalletConnect({ connected: false })
          walletConnect.connector.killSession()
          return resolve(null)
        }
        if (walletConnect.address) {
          let isSigned = ReduxService.checkIsSigned()
          if (!isSigned) {
            ReduxService.walletConnectWithoutSign(callbackAfterLogin, callbackError)
          } else {
            callbackAfterLogin && callbackAfterLogin()
            return resolve(null)
          }
        } else {
          ReduxService.callDispatchAction(setUserData(null))
          return resolve(null)
        }
      } catch (error) {
        callbackError && callbackError()
        return reject(error)
      }
    })
  }

  static walletConnectWithoutSign = (callbackAfterLogin = null, callbackError = null) => {
    return new Promise(async (resolve, reject) => {
      const walletConnect = this.getWalletConnect()
      try {
        let newUserLogin = Object.assign({}, { address: walletConnect.address })
        ReduxService.updateUserData(newUserLogin)
        callbackAfterLogin && callbackAfterLogin()
      } catch (error) {
        showNotificationError('Connect Wallet Error')
        callbackError && callbackError()
        reject(error)
      }
    })
  }

  static walletConnectWithSign = (callbackAfterLogin = null, callbackError = null) => {
    return new Promise(async (resolve, reject) => {
      const walletConnect = this.getWalletConnect()
      try {
        const address = walletConnect.address
        const resMessage = await UserService.getMessageHash({ address })
        let signature = await WalletConnectServices.signPersonalMessage(resMessage?.data?.hash, address)
        if (signature) {
          const resUserLogin = (await UserService.signIn(address, signature))?.data
          if (resUserLogin) {
            let newUserLogin = Object.assign(
              {},
              {
                ...resUserLogin,
                isSigned: true,
              }
            )
            ReduxService.updateUserData(newUserLogin)
            callbackAfterLogin && callbackAfterLogin()
            return resolve()
          } else {
            if (window.localStorage.getItem('walletconnect')) {
              WalletConnectServices.killSession()
              showNotificationError('Connect Wallet Error')
            }
            ReduxService.callDispatchAction(setUserData({}))
            callbackError && callbackError()
            return resolve()
          }
        } else {
          if (window.localStorage.getItem('walletconnect')) {
            WalletConnectServices.killSession()
            showNotificationError('Connect Wallet Error')
          }
          ReduxService.callDispatchAction(setUserData({}))
          callbackError && callbackError()
          return resolve()
        }
      } catch (error) {
        console.log(error)
        showNotificationError('Connect Wallet Error')
        callbackError && callbackError()
        reject(error)
      }
    })
  }

  static walletConnectV2WithSign = (callbackAfterLogin = null, callbackError = null) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = ReduxService.getUserData()
        const address = userData?.address
        const resMessage = await UserService.getMessageHash({ address })
        let signature = await WalletConnectV2Services.signPersonalMessage(resMessage?.data?.hash ?? 'SIGN MESSAGE')
        if (signature) {
          const resUserLogin = (await UserService.signIn(address, signature))?.data
          if (resUserLogin) {
            let newUserLogin = Object.assign(
              {},
              {
                ...resUserLogin,
                isSigned: true,
              }
            )
            const usersSign = getDataLocal(USER_SIGN) || []
            const userSign = usersSign.find((ele) => lowerCase(ele?.address) === lowerCase(newUserLogin?.address))
            if (!userSign && newUserLogin?.token) {
              usersSign.push({
                address: lowerCase(newUserLogin?.address),
                token: newUserLogin?.token,
              })
              saveDataLocal(USER_SIGN, usersSign)
            }
            ReduxService.updateUserData(newUserLogin)
            callbackAfterLogin && callbackAfterLogin()
            return resolve()
          } else {
            WalletConnectV2Services.disconnect()
            callbackError && callbackError()
            return resolve()
          }
        } else {
          WalletConnectV2Services.disconnect()
          callbackError && callbackError()
          return resolve()
        }
      } catch (error) {
        showNotificationError('Connect Wallet Error')
        reject(error)
      }
    })
  }

  static checkIsSigned() {
    const { metamaskExtension, walletConnect, userData, connectionMethod, walletConnectV2 } = store.getState()
    let isConnect = false
    if (userData && userData.address) {
      switch (connectionMethod) {
        case CONNECTION_METHOD.METAMASK:
          isConnect = lowerCase(metamaskExtension.address) === lowerCase(userData.address)
          break
        case CONNECTION_METHOD.WALLET_CONNECT:
          isConnect = lowerCase(walletConnect.address) === lowerCase(userData.address)
          break
        case CONNECTION_METHOD.WALLET_CONNECT_V2:
          isConnect = Object.values(walletConnectV2?.addresses || {})
            .map((item) => lowerCase(item))
            .includes(lowerCase(userData.address))
          break
        default:
          isConnect = false
          break
      }
      return process.env.NEXT_PUBLIC_HAS_SIGN ? isConnect && !!userData.isSigned : isConnect
    }
    return false
  }

  static async detectConnectionMethod() {
    const { connectionMethod } = store.getState()
    switch (connectionMethod) {
      case CONNECTION_METHOD.METAMASK:
        return MetamaskServices.refresh()
      case CONNECTION_METHOD.WALLET_CONNECT:
        return WalletConnectServices.refresh()
    }
  }

  static async switchChain(chainId) {
    try {
      let success = false
      if (ReduxService.getConnectionMethod() === CONNECTION_METHOD.METAMASK) {
        success = await MetamaskServices.switchNetworks(chainId)
      } else if (ReduxService.getConnectionMethod() === CONNECTION_METHOD.WALLET_CONNECT && ReduxService.getWalletConnect()?.connector?.connected) {
        success = await WalletConnectServices.switchChain(chainId)
      } else if (ReduxService.getConnectionMethod() === CONNECTION_METHOD.WALLET_CONNECT_V2) {
        const walletConnectV2 = ReduxService.getWalletConnectV2()
        if (walletConnectV2.chainIds.includes(chainId) && walletConnectV2.addresses) {
          const userAddress = lowerCase(walletConnectV2?.addresses?.[chainId])
          let user = { address: userAddress, isSigned: false }
          const usersSign = getDataLocal(USER_SIGN) || []
          const userSign = usersSign.find((ele) => lowerCase(ele?.address) === lowerCase(user.address))
          if (userSign) {
            const resUserLogin = await UserService.getUserByAccessToken(userSign.token)
            if (resUserLogin?.data) {
              user = {
                ...user,
                ...resUserLogin?.data,
                token: userSign?.token,
                isSigned: true,
              }
            }
          }
          ReduxService.updateUserData({
            ...user,
          })
          ReduxService.setChainConnected(chainId)
          return true
        } else {
          ReduxService.resetApp()
          ReduxService.setChainConnected(chainId)
          showNotificationError(`Current connect hasn't includes chain ${CHAIN_DATA[chainId]?.chainName}, please connect again`)
          return true
        }
      } else {
        ReduxService.setChainConnected(chainId)
        return true
      }
      return success
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static logout() {
    if (ReduxService.getConnectionMethod() === CONNECTION_METHOD.WALLET_CONNECT) {
      WalletConnectServices.killSession()
    } else if (ReduxService.getConnectionMethod() === CONNECTION_METHOD.WALLET_CONNECT_V2) {
      WalletConnectV2Services.disconnect()
    } else {
      ReduxService.resetUser()
    }
  }

  static deeplinkOpenApp = () => {
    const walletConnect = ReduxService.getWalletConnect()
    if (isMobile && walletConnect.appConnected) {
      if (walletConnect.appConnected.name.startsWith('KEYRING')) {
        window.open(walletConnect.appConnected.universalLink + '/wc?uri=wc:' + walletConnect.session.handshakeTopic + '@1', '_blank')
      } else {
        window.open(WalletConnectServices.formatIOSMobile(walletConnect.connector.uri, walletConnect.appConnected), '_blank')
      }
    }
  }

  static getLanguage() {
    const { language } = store.getState()
    return language || 'en'
  }

  static getToken(address, chainId) {
    const { tokens } = store.getState()
    let token = tokens?.find((item) => lowerCase(item?.address) === lowerCase(address) && parseInt(item?.chainId) === parseInt(chainId))
    return token
  }

  static async getTokenByAddressAndChainId(address, chainId) {
    const { tokens } = store.getState()
    let token
    if (tokens?.length > 0) {
      token = tokens?.find((item) => lowerCase(item?.address) === lowerCase(address) && parseInt(item?.chainId) === parseInt(chainId))
      if (token) {
        return token
      }
    }
    token = await TokenService.getOne(address, chainId)
    if (token) {
      return token
    }
    return null
  }

  static getCountryBySlug(slug) {
    const { settingRedux } = store.getState()
    return settingRedux?.country?.find((item) => lowerCase(item.slug) === lowerCase(slug)) || null
  }

  static getCategory(uniqueField) {
    const { settingRedux } = store.getState()
    return settingRedux?.category?.find((item) => lowerCase(item.slug) === lowerCase(uniqueField) || item?._id === uniqueField) || null
  }

  static getChain(chainId) {
    const { settingRedux } = store.getState()
    return settingRedux?.chains?.find((item) => parseInt(item?.chainId) === parseInt(chainId)) || null
  }
}
