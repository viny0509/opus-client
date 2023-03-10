/* eslint-disable no-undef */
import MetaMaskOnboarding from '@metamask/onboarding'
import { CHAIN_DATA } from 'constants/chain'
import { isMobile } from 'react-device-detect'
import { setConnectedChain } from 'redux/slices/connectedChainSlice'
import { convertToHex, showNotificationError } from 'common/function'
import ReduxService from 'common/redux'
import { ethers } from 'ethers'

let onboarding
export default class MetamaskServices {
  static async initialize() {
    try {
      if (!onboarding) {
        onboarding = new MetaMaskOnboarding()
      }

      if (!MetaMaskOnboarding.isMetaMaskInstalled() && !isMobile) {
        onboarding.startOnboarding()
      } else {
        onboarding.stopOnboarding()
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (accounts.length > 0) {
          this.onConnect(accounts)
          this.subscribeToEvents()
        }
      }
    } catch (error) {
      console.log('metamask => initialize', error)
    }
  }

  static async refresh() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accountsWeb3 = await provider.send('eth_accounts')
        if (accountsWeb3?.length > 0) {
          // Metamask is unlocked
          this.handleNewAccounts(accountsWeb3)
          this.subscribeToEvents()
          await this.checkChainId()
          return true
        }
        // Metamask is locked
        showNotificationError('Please unlock your metamask wallet')
        const requestAccounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (requestAccounts?.length > 0) {
          return MetamaskServices.refresh()
        }
        console.log('metamask refresh eth_requestAccounts empty')
        return false
      }
      console.log('metamask refresh provider not available')
      return false
    } catch (error) {
      console.log('metamask refresh', error)
      return false
    }
  }

  static subscribeToEvents() {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.on('networkChanged', async (chainId) => {
        await MetamaskServices.updateWeb3Chain()
        await this.checkChainId(chainId)
      })
      window.ethereum.on('accountsChanged', this.handleNewAccounts)
    }
  }

  static async checkChainId() {
    try {
      const networkId = await window.ethereum.request({
        method: 'net_version',
      })
      const chainId = ReduxService.getChainConnected()
      if (Number(networkId) !== chainId) {
        if (await MetamaskServices.switchNetworks(chainId)) {
          MetamaskServices.handleNewChain(chainId)
          await MetamaskServices.updateWeb3Chain()
        } else {
          ReduxService.resetApp()
          return false
        }
      } else {
        MetamaskServices.handleNewChain(chainId)
        await MetamaskServices.updateWeb3Chain()
      }
      return true
    } catch (error) {
      console.log('metamask checkChainId', error)
    }
  }

  static handleNewChain(chainId) {
    ReduxService.updateMetamask({
      chainId: Number(chainId),
    })
  }

  static async updateWeb3Chain() {
    const networkId = await window.ethereum.request({
      method: 'net_version',
    })
    ReduxService.updateMetamask({
      web3ChainId: Number(networkId),
    })
  }

  static handleNewAccounts(accounts) {
    const address = accounts[0]
    ReduxService.updateMetamask({
      accounts,
      address,
    })
  }

  static async addNewChain(chainId) {
    let chainData = CHAIN_DATA[parseInt(chainId)]
    if (chainData && MetaMaskOnboarding.isMetaMaskInstalled()) {
      return new Promise((resolve, reject) => {
        window.ethereum
          .request({ method: 'wallet_addEthereumChain', params: [chainData] })
          .then((result) => {
            return resolve(result)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    } else {
      return null
    }
  }

  static signPersonalMessage(address, message) {
    const msgParams = [convertToHex(message), address]
    if (window.ethereum) {
      return new Promise((resolve, reject) => {
        window.ethereum
          .request({ method: 'personal_sign', params: msgParams })
          .then((result) => {
            return resolve(result)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    } else {
      return null
    }
  }

  static async onConnect(accounts) {
    const address = accounts[0]
    if (await this.checkChainId()) {
      await ReduxService.updateMetamask({
        accounts,
        address,
      })
      ReduxService.loginMetamask(null, null)
    }
  }

  static async switchNetworks(chainId) {
    const chain = CHAIN_DATA[chainId]
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chain.chainId }],
      })
      ReduxService.callDispatchAction(setConnectedChain(chainId))
      return true
    } catch (error) {
      console.log('metamask - switch network', error)
      if (error.code === 4902 && chainId !== undefined) {
        if (await this.addNewChain(chainId)) {
          return true
        }
        return false
      }
      if (error.code === -32002) {
        showNotificationError('Check metamask request pending')
        console.log('metamask--error', error)
        return true
      }
      return false
    }
  }
}
