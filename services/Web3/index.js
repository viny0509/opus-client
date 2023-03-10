/* eslint-disable no-async-promise-executor */
import { CHAIN_DATA } from 'constants/chain'
import { CONNECTION_METHOD, EXTRA_RATE_GAS } from 'constants/web3'
import { Contract, ethers } from 'ethers'
import { calculateNumber, convertBalanceToWei, convertWeiToBalance, randomNumber, roundingNumber } from 'common/function'
import ReduxService from 'common/redux'
import converter from 'hex2dec'
import ABI from './ABI'
import WalletConnectServices from 'services/WalletConnect'
import WalletConnectV2Services from 'services/WalletConnectV2'

export default class Web3Services {
  static createWeb3Provider(chainId = null) {
    let provider
    let walletConnect = ReduxService.getWalletConnect()
    const connectionMethod = ReduxService.getConnectionMethod()
    if (chainId) {
      provider = new ethers.providers.JsonRpcProvider(
        CHAIN_DATA?.[parseInt(chainId)]?.rpcUrls[randomNumber(0, CHAIN_DATA?.[parseInt(chainId)]?.rpcUrls?.length)]
      )
    } else {
      if (connectionMethod === CONNECTION_METHOD.METAMASK && window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum)
      } else if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT && walletConnect && walletConnect.chainId !== 0) {
        provider = new ethers.providers.JsonRpcProvider(
          CHAIN_DATA?.[walletConnect.chainId]?.rpcUrls[randomNumber(0, CHAIN_DATA?.[walletConnect.chainId]?.rpcUrls?.length)]
        )
      } else {
        provider = new ethers.providers.JsonRpcProvider(
          CHAIN_DATA?.[ReduxService.getChainConnected()]?.rpcUrls[randomNumber(0, CHAIN_DATA?.[ReduxService.getChainConnected()]?.rpcUrls?.length)]
        )
      }
    }
    return provider
  }

  static getSigner() {
    const provider = Web3Services.createWeb3Provider()
    return provider.getSigner()
  }

  static encodeABI(abi, method, param) {
    const iface = new ethers.utils.Interface(abi)
    const result = iface.encodeFunctionData(method, param)
    return result
  }

  static async fetchData({
    chainId = null,
    retry = null,
    delay = 1000,
    contractAddress = null,
    abi = null,
    nameFunction = null,
    params = [],
    providerMethod = null,
  }) {
    return new Promise(async (resolve) => {
      const query = { chainId, retry, contractAddress, abi, nameFunction, params, providerMethod }
      try {
        const provider = Web3Services.createWeb3Provider(chainId)
        if (providerMethod) {
          const result = await provider[providerMethod](...params)
          resolve(result)
        } else if (contractAddress && abi && nameFunction) {
          const contract = new Contract(contractAddress, abi, provider)
          const result = await contract[nameFunction](...params)
          resolve(result)
        } else {
          resolve(null)
        }
      } catch (error) {
        console.error({ name: 'error fetch data', query, error, retry })
        if (retry && retry > 0) {
          setTimeout(
            () =>
              resolve(
                Web3Services.fetchData({
                  ...query,
                  retry: retry - 1,
                })
              ),
            delay
          )
        } else {
          resolve(null)
        }
      }
    })
  }

  static async permitToken({ userAddress, contractAddress, spenderAddress, amountWei, deadline, callbackError, name }) {
    return new Promise(async (resolve) => {
      const provider = Web3Services.createWeb3Provider()
      const tokenContract = new Contract(contractAddress, ABI.token, provider)
      const [nonce, version] = (await Promise.allSettled([tokenContract.nonces(userAddress), '1'])).map((item) => item.value)
      const chainId = ReduxService.getChainConnected()
      const connectionMethod = ReduxService.getConnectionMethod()
      const signer = provider.getSigner()
      switch (connectionMethod) {
        case CONNECTION_METHOD.METAMASK:
          signer
            ._signTypedData(
              {
                name,
                version,
                chainId,
                verifyingContract: contractAddress,
              },
              {
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
              {
                owner: userAddress,
                spender: spenderAddress,
                value: amountWei.toString(),
                nonce: nonce.toString(),
                deadline,
              }
            )
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              callbackError && callbackError(err)
              resolve(null)
            })
          break
        case CONNECTION_METHOD.WALLET_CONNECT:
          WalletConnectServices.permitToken(
            userAddress,
            spenderAddress,
            name,
            version,
            chainId,
            contractAddress,
            amountWei.toString(),
            nonce.toString(),
            deadline
          )
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              callbackError && callbackError(err)
              resolve(null)
            })
          break
        case CONNECTION_METHOD.WALLET_CONNECT_V2:
          WalletConnectV2Services.permitToken(
            userAddress,
            spenderAddress,
            name,
            version,
            chainId,
            contractAddress,
            amountWei.toString(),
            nonce.toString(),
            deadline
          )
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              callbackError && callbackError(err)
              resolve(null)
            })
          break
        default:
          resolve(null)
          break
      }
    })
  }

  static async permitNFT({ contractAddress, spenderAddress, tokenId, deadline, callbackError, name }) {
    return new Promise(async (resolve) => {
      const provider = Web3Services.createWeb3Provider()
      const nftContract = new Contract(contractAddress, ABI.nft, provider)
      const [nonce, version] = (await Promise.allSettled([nftContract.nonces(tokenId), '1'])).map((item) => item.value)
      const chainId = ReduxService.getChainConnected()
      const connectionMethod = ReduxService.getConnectionMethod()
      const signer = provider.getSigner()
      console.log({ contractAddress, spenderAddress, tokenId, deadline, callbackError, name, nonce })
      switch (connectionMethod) {
        case CONNECTION_METHOD.METAMASK:
          signer
            ._signTypedData(
              {
                name,
                version,
                chainId,
                verifyingContract: contractAddress,
              },
              {
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
              {
                spender: spenderAddress,
                tokenId: `${tokenId}`,
                nonce: `${nonce}`,
                deadline,
              }
            )
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              callbackError && callbackError(err)
              resolve(null)
            })
          break
        case CONNECTION_METHOD.WALLET_CONNECT:
          WalletConnectServices.permitNFT(spenderAddress, name, version, chainId, contractAddress, tokenId?.toString(), nonce?.toString(), deadline)
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              callbackError && callbackError(err)
              resolve(null)
            })
          break
        case CONNECTION_METHOD.WALLET_CONNECT_V2:
          WalletConnectV2Services.permitNFT(spenderAddress, name, version, chainId, contractAddress, tokenId.toString(), nonce.toString(), deadline)
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              callbackError && callbackError(err)
              resolve(null)
            })
          break
        default:
          resolve(null)
          break
      }
    })
  }

  static async signTypedData({ domain, types, value, callbackError, primaryType = undefined }) {
    return new Promise(async (resolve) => {
      const provider = Web3Services.createWeb3Provider()
      const connectionMethod = ReduxService.getConnectionMethod()
      const signer = provider.getSigner()
      switch (connectionMethod) {
        case CONNECTION_METHOD.METAMASK:
          signer
            ._signTypedData(domain, types, value)
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              callbackError && callbackError(err)
              resolve(null)
            })
          break
        case CONNECTION_METHOD.WALLET_CONNECT:
          WalletConnectServices.signTypedData({
            domain,
            types,
            value,
            primaryType,
          })
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              callbackError && callbackError(err)
              resolve(null)
            })
          break
        case CONNECTION_METHOD.WALLET_CONNECT_V2:
          WalletConnectV2Services.signTypedData({
            domain,
            types,
            value,
            primaryType,
          })
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              callbackError && callbackError(err)
              resolve(null)
            })
          break
        default:
          resolve(null)
          break
      }
    })
  }

  static async getTokenDecimals(contractAddress) {
    const result = await Web3Services.fetchData({
      contractAddress,
      abi: ABI.token,
      params: [],
      nameFunction: 'decimals',
      chainId: ReduxService.getChainConnected(),
      retry: 10,
    })
    return Number(`${result}`.toString())
  }

  static async getNonce(address) {
    const proviver = Web3Services.createWeb3Provider()
    return await proviver.getTransactionCount(address)
  }

  static async getGasPrice() {
    const provider = Web3Services.createWeb3Provider()
    const gasPrice = await provider.getGasPrice()
    return gasPrice
  }

  static async estimateGas(rawTransaction) {
    const provider = Web3Services.createWeb3Provider()
    const result = await provider.estimateGas(rawTransaction)
    return result
  }

  static async trackingTxs(hash, callbackSuccess, receipt) {
    if (receipt === undefined || receipt === null || receipt.blockNumber === null || receipt.blockNumber === undefined) {
      const provider = Web3Services.createWeb3Provider()
      const res = await provider.getTransactionReceipt(hash)
      if (!res) {
        setTimeout(() => Web3Services.trackingTxs(hash, callbackSuccess, res), 500)
      } else {
        callbackSuccess && callbackSuccess(res)
      }
    }
  }

  static async estimateRawTx({ from, to, data, value }) {
    try {
      const gasPrice = await Web3Services.getGasPrice()
      const tx = {
        from,
        to,
        value,
        gasPrice: ethers.utils.hexlify(gasPrice),
        data,
      }
      const provider = Web3Services.createWeb3Provider()
      const [gasLimit, priorityFee, baseFee] = await Promise.all([provider.estimateGas(tx), provider.getGasPrice(), provider.getFeeData()])
      const maxPriorityFeePerGas = priorityFee.div(2)
      const maxFeePerGas = baseFee.maxFeePerGas.add(maxPriorityFeePerGas)
      const gasFee = maxFeePerGas.mul(gasLimit)
      const priorityFeeValue = maxPriorityFeePerGas.mul(gasLimit)
      return gasFee.add(priorityFeeValue).toString()
    } catch (error) {
      return null
    }
  }

  static async sendTransaction(fromAddress, transactionRequest, callbackError, callbackBeforeDone, callbackAfterDone) {
    try {
      console.info('sendTransaction', fromAddress, transactionRequest)
      const nonce = await Web3Services.getNonce(fromAddress)
      const gasPrice = await Web3Services.getGasPrice()
      let rawTransaction = {
        from: transactionRequest.from,
        to: transactionRequest.to,
        data: transactionRequest.data,
        nonce: ethers.utils.hexlify(nonce),
        gasPrice: ethers.utils.hexlify(gasPrice),
      }
      if (transactionRequest.value && transactionRequest.value > 0) {
        rawTransaction.value = converter.decToHex(`${transactionRequest.value}`)
      }
      const gas = await Web3Services.estimateGas(rawTransaction)
      const gasFinal = converter.decToHex(`${roundingNumber(gas * EXTRA_RATE_GAS, 0)}`) || gas
      rawTransaction.gasLimit = gasFinal
      const connectionMethod = ReduxService.getConnectionMethod()
      if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT) {
        console.log(rawTransaction)
        const res = await WalletConnectServices.sendTransaction(rawTransaction)
        if (res) {
          if (callbackBeforeDone) {
            callbackBeforeDone(res)
          }
          if (callbackAfterDone) {
            const callbackSuccess = (receipt) => {
              if (receipt && receipt.status && (receipt.status === true || receipt.status === 1)) {
                callbackAfterDone && callbackAfterDone(res)
              } else {
                callbackError && callbackError()
              }
            }
            Web3Services.trackingTxs(res, callbackSuccess)
          }
        }
      } else if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT_V2) {
        const res = await WalletConnectV2Services.sendTransaction(rawTransaction)
        if (res) {
          callbackBeforeDone && callbackBeforeDone(res)
        }
        if (callbackAfterDone) {
          const callbackSuccess = (receipt) => {
            if (receipt && receipt.status && (receipt.status === true || receipt.status === 1)) {
              callbackAfterDone(res)
            } else {
              callbackError && callbackError()
            }
          }
          Web3Services.trackingTxs(res, callbackSuccess)
        }
      } else {
        const signer = Web3Services.getSigner()
        const tx = await signer.sendTransaction(rawTransaction)
        callbackBeforeDone && callbackBeforeDone(tx.hash)
        const txSuccess = await tx.wait()
        callbackAfterDone && callbackAfterDone(txSuccess.transactionHash)
        return txSuccess
      }
    } catch (error) {
      console.log('sendTransaction -> error', error)
      callbackError && callbackError(error)
    }
  }

  static async getTokenBalance(userAddress, tokenAddress, chainId, decimals) {
    let result
    if (tokenAddress === ethers.constants.AddressZero) {
      result = await Web3Services.fetchData({
        params: [userAddress],
        providerMethod: 'getBalance',
        chainId: chainId || ReduxService.getChainConnected(),
        retry: 10,
      })
    } else {
      result = await Web3Services.fetchData({
        contractAddress: tokenAddress,
        abi: ABI.token,
        params: [userAddress],
        nameFunction: 'balanceOf',
        chainId: chainId || ReduxService.getChainConnected(),
        retry: 10,
      })
    }
    return decimals ? convertWeiToBalance(result || 0, decimals) : result || '0'
  }

  static async needApprove(userAddress, spenderAddress, tokenAddress, amount, tokenDecimals = 18) {
    if (tokenAddress === ethers.constants.AddressZero) return false
    const provider = Web3Services.createWeb3Provider()
    const contract = new Contract(tokenAddress, ABI.token, provider)
    const allowanceWei = await contract.allowance(userAddress, spenderAddress)
    const allowance = convertWeiToBalance(allowanceWei?.toString(), Number(tokenDecimals))
    return Number(allowance) < Number(amount)
  }

  static async checkAllowance(userAddress, spenderAddress, tokenAddress, tokenDecimals = 18) {
    const provider = Web3Services.createWeb3Provider()
    const contract = new Contract(tokenAddress, ABI.token, provider)
    const result = await contract.allowance(userAddress, spenderAddress)
    if (result) {
      return convertWeiToBalance(result, tokenDecimals)
    } else {
      return 0
    }
  }

  static async approveTokenAmount(
    fromAddress,
    tokenAddress,
    spender,
    amount,
    tokenDecimals = 18,
    isApproveMax,
    callbackError,
    callbackBeforeDone,
    callbackAfterDone
  ) {
    try {
      const data = Web3Services.encodeABI(ABI.token, 'approve', [
        spender,
        isApproveMax ? '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' : convertBalanceToWei(amount, tokenDecimals),
      ])
      const transactionRequest = {
        from: fromAddress,
        to: tokenAddress,
        data,
      }
      return await Web3Services.sendTransaction(fromAddress, transactionRequest, callbackError, callbackBeforeDone, callbackAfterDone)
    } catch (error) {
      console.log(error)
      callbackError && callbackError(error)
      return null
    }
  }

  static async createStore(
    fromAddress,
    contractAddress,
    store_,
    paymentToken_,
    deadline_,
    permitSign_,
    sign_,
    callbackError,
    callbackBeforeDone,
    callbackAfterDone
  ) {
    try {
      const data = Web3Services.encodeABI(ABI.nft, 'createStore', [store_, paymentToken_, deadline_, permitSign_, sign_])
      const transactionRequest = {
        from: fromAddress,
        to: contractAddress,
        data,
      }
      return await Web3Services.sendTransaction(fromAddress, transactionRequest, callbackError, callbackBeforeDone, callbackAfterDone)
    } catch (error) {
      console.log(error)
      callbackError && callbackError(error)
      return null
    }
  }

  static async buy(
    fromAddress,
    contractAddress,
    { signer, collection, price, tokenId, currency, nonce, startTime, endTime, permit, v, r, s },
    amountWei,
    callbackError,
    callbackBeforeDone,
    callbackAfterDone
  ) {
    try {
      const data = Web3Services.encodeABI(ABI.marketplace, 'buy', [
        { signer, collection, price, tokenId, currency, nonce, startTime, endTime, permit, v, r, s },
      ])
      const transactionRequest = {
        from: fromAddress,
        to: contractAddress,
        data,
        value: amountWei,
      }
      return await Web3Services.sendTransaction(fromAddress, transactionRequest, callbackError, callbackBeforeDone, callbackAfterDone)
    } catch (error) {
      console.log(error)
      callbackError && callbackError(error)
      return null
    }
  }

  static async cancelListing(fromAddress, contractAddress, nonces, callbackError, callbackBeforeDone, callbackAfterDone) {
    try {
      const data = Web3Services.encodeABI(ABI.marketplace, 'cancelSellOrders', [nonces])
      const transactionRequest = {
        from: fromAddress,
        to: contractAddress,
        data,
      }
      return await Web3Services.sendTransaction(fromAddress, transactionRequest, callbackError, callbackBeforeDone, callbackAfterDone)
    } catch (error) {
      console.log(error)
      callbackError && callbackError(error)
      return null
    }
  }

  static async claimToken(fromAddress, contractAddress, claim, sign, callbackError, callbackBeforeDone, callbackAfterDone) {
    try {
      const data = Web3Services.encodeABI(ABI.claim, 'claim', [claim, sign])
      const transactionRequest = {
        from: fromAddress,
        to: contractAddress,
        data,
      }
      return await Web3Services.sendTransaction(fromAddress, transactionRequest, callbackError, callbackBeforeDone, callbackAfterDone)
    } catch (error) {
      console.log(error)
      callbackError && callbackError(error)
      return null
    }
  }

  static getDataEncode({ abi, method, param }) {
    try {
      return Web3Services.encodeABI(typeof abi === 'string' ? ABI[abi] : abi, method, param)
    } catch (error) {
      return null
    }
  }

  static async getTotalSupply(tokenAddress, chainId) {
    const result = await Web3Services.fetchData({
      contractAddress: tokenAddress,
      abi: ABI.token,
      params: [],
      nameFunction: 'totalSupply',
      chainId: chainId || ReduxService.getChainConnected(),
      retry: 10,
    })
    return result ? `${result}` : null
  }

  static async getPaymentAmountStore(tokenAddress, contractAddress, chainId) {
    const result = await Web3Services.fetchData({
      contractAddress,
      abi: ABI.nft,
      params: [tokenAddress],
      nameFunction: 'paymentAmount',
      chainId: chainId || ReduxService.getChainConnected(),
      retry: 10,
    })
    return result ? `${result}` : null
  }

  static async getProtocolFee(contractAddress, chainId) {
    const result = await Web3Services.fetchData({
      contractAddress,
      abi: ABI.marketplace,
      params: [],
      nameFunction: 'viewProtocolFeeInfo',
      chainId: chainId || ReduxService.getChainConnected(),
      retry: 10,
    })
    if (result) {
      return calculateNumber(`${result[1]}`, '10000', 'div', 'number')
    }
    return 0
  }
}
