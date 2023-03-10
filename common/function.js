/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
import validator from 'validator'
import crypto from 'crypto-js'
import {
  DEFAULT_COSMOS_EVENTS,
  DEFAULT_COSMOS_METHODS,
  DEFAULT_EIP155_METHODS,
  DEFAULT_EIP_155_EVENTS,
  DEFAULT_ELROND_EVENTS,
  DEFAULT_ELROND_METHODS,
  DEFAULT_NEAR_EVENTS,
  DEFAULT_NEAR_METHODS,
  DEFAULT_POLKADOT_EVENTS,
  DEFAULT_POLKADOT_METHODS,
  DEFAULT_SOLANA_EVENTS,
  DEFAULT_SOLANA_METHODS,
} from 'constants/web3'
import { CHAIN_DATA } from 'constants/chain'
import ReduxService from 'common/redux'
// import { toast } from 'react-toastify'
import utf8 from 'utf8'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { message } from 'antd'
import styled from 'styled-components'
import Image from 'components/Image'
import images from './images'
import { translateFunction } from 'hooks/useTranslate'
import dayjs from 'dayjs'

export const saveDataLocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getDataLocal = (key) => {
  try {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(key))
    } else {
      return false
    }
  } catch (error) {
    return null
  }
}

export const removeDataLocal = (key) => {
  localStorage.removeItem(key)
}

export const removeAllDataLocal = () => {
  localStorage.clear()
}

export const prepareDataForWalletConnect = (requestData, additionalData) => {
  const finalData = '--' + JSON.stringify(additionalData) + '--' + requestData
  return finalData
}

export const encryptBackupFileContent = (value, pass) => {
  try {
    return crypto.AES.encrypt(value.toString(), pass.toString()).toString()
  } catch (error) {
    return ''
  }
}

export const decryptBackupFileContent = (value, pass) => {
  try {
    return crypto.AES.decrypt(value.toString(), pass.toString()).toString(crypto.enc.Utf8)
  } catch (error) {
    return ''
  }
}

export const convertObjectToArray = (objConvert) => {
  return Object.keys(objConvert).map((i) => objConvert[i])
}

export const lowerCase = (value) => {
  return typeof value === 'string' ? value.toLowerCase() : value
}

export const upperCase = (value) => {
  return typeof value === 'string' ? value.toUpperCase() : value
}

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !re.test(String(email).toLowerCase())
}

export const roundingNumber = (number, rounding = 7) => {
  const powNumber = Math.pow(10, parseInt(rounding))
  return Math.floor(number * powNumber) / powNumber
}

export const isURL = (str) => {
  return validator.isURL(str)
}

export const isValidJSONString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const scientificToDecimal = (num) => {
  const sign = Math.sign(num)
  // if the number is in scientific notation remove it
  if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
    const zero = '0'
    const parts = String(num).toLowerCase().split('e') // split into coeff and exponent
    const e = parts.pop() // store the exponential part
    let l = Math.abs(e) // get the number of zeros
    const direction = e / l // use to determine the zeroes on the left or right
    const coeffArray = parts[0].split('.')

    if (direction === -1) {
      coeffArray[0] = Math.abs(coeffArray[0])
      num = zero + '.' + new Array(l).join(zero) + coeffArray.join('')
    } else {
      const dec = coeffArray[1]
      if (dec) l = l - dec.length
      num = coeffArray.join('') + new Array(l + 1).join(zero)
    }
  }

  if (sign < 0) {
    num = -num
  }

  return num
}

export const getCurrentBrowserLanguage = () => {
  let language = navigator.language.toLowerCase()
  switch (language) {
    case 'en-us':
    case 'en':
      language = 'en'
      break
    case 'ja-jp':
    case 'ja':
    case 'jp':
      language = 'ja'
      break
    case 'zh-cn':
    case 'zh':
    case 'cn':
      language = 'cn'
      break
    case 'vi-vn':
    case 'vi':
      language = 'vi'
      break
    default:
      language = 'en'
  }
  return language
}

export const validateAddress = (strAddress) => {
  return ethers.utils.isAddress(strAddress)
}

export const scrollTop = () => {
  if (window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/**
 * NAME: countDots
 * PARAMS: strString, strLetter
 * Count dots in string receive from user input
 */
export const countDots = (strString, strLetter) => {
  const string = strString.toString()
  return (string.match(RegExp(strLetter, 'g')) || []).length
}

export const numberWithCommas = (num, rounding = null, defaultValue = '-') => {
  if (num !== null && num !== undefined) {
    let newNum = num
    if (Number.isInteger(rounding)) {
      newNum = Number(num).toFixed(rounding)
    }
    const parts = newNum.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  } else {
    return defaultValue
  }
}

export const copyToClipboard = (text) => {
  const tmp = document.createElement('input')
  tmp.value = text
  document.body.appendChild(tmp)
  tmp.select()
  document.execCommand('copy')
  tmp.remove()
  showNotificationSuccess('Copied')
}

export const viewExternal = (url) => {
  window.open(url, '_blank')
}

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export const isObject = (data, checkEmpty = false) => {
  const isObj = data && typeof data === 'object'
  return checkEmpty ? isObj && Object.keys(data).length > 0 : isObj
}

export const isEmptyObject = (data) => {
  const isObj = data && typeof data === 'object'
  return isObj && Object.keys(data).length > 0
}

// params chains: array
export const getNamespacesFromChains = (chains = []) => {
  const supportedNamespaces = []
  chains.forEach((chainId) => {
    const [namespace] = chainId.split(':')
    if (!supportedNamespaces.includes(namespace)) {
      supportedNamespaces.push(namespace)
    }
  })

  return supportedNamespaces
}

export const getRequiredNamespaces = (chains) => {
  const selectedNamespaces = getNamespacesFromChains(chains)

  return Object.fromEntries(
    selectedNamespaces.map((namespace) => [
      namespace,
      {
        methods: getSupportedMethodsByNamespace(namespace),
        chains: chains.filter((chain) => chain.startsWith(namespace)),
        events: getSupportedEventsByNamespace(namespace),
      },
    ])
  )
}

export const getSupportedMethodsByNamespace = (namespace) => {
  switch (namespace) {
    case 'eip155':
      return Object.values(DEFAULT_EIP155_METHODS)
    case 'cosmos':
      return Object.values(DEFAULT_COSMOS_METHODS)
    case 'solana':
      return Object.values(DEFAULT_SOLANA_METHODS)
    case 'polkadot':
      return Object.values(DEFAULT_POLKADOT_METHODS)
    case 'near':
      return Object.values(DEFAULT_NEAR_METHODS)
    case 'elrond':
      return Object.values(DEFAULT_ELROND_METHODS)
    default:
      throw new Error(`No default methods for namespace: ${namespace}`)
  }
}

export const getSupportedEventsByNamespace = (namespace) => {
  switch (namespace) {
    case 'eip155':
      return Object.values(DEFAULT_EIP_155_EVENTS)
    case 'cosmos':
      return Object.values(DEFAULT_COSMOS_EVENTS)
    case 'solana':
      return Object.values(DEFAULT_SOLANA_EVENTS)
    case 'polkadot':
      return Object.values(DEFAULT_POLKADOT_EVENTS)
    case 'near':
      return Object.values(DEFAULT_NEAR_EVENTS)
    case 'elrond':
      return Object.values(DEFAULT_ELROND_EVENTS)
    default:
      throw new Error(`No default events for namespace: ${namespace}`)
  }
}

export const convertToHex = (str) => {
  str = utf8.encode(str)
  var hex = ''

  // remove \u0000 padding from either side
  str = str.replace(/^(?:\u0000)*/, '')
  str = str.split('').reverse().join('')
  str = str.replace(/^(?:\u0000)*/, '')
  str = str.split('').reverse().join('')

  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i)
    // if (code !== 0) {
    var n = code.toString(16)
    hex += n.length < 2 ? '0' + n : n
    // }
  }

  return '0x' + hex
}

export const getAccountObjectFromAccounts = (accounts = []) => {
  const result = {}

  accounts.forEach((account) => {
    result[Number(account.split(':')[1])] = account.split(':')[2]
  })
  return result
}

export const getChainIdsFromAccounts = (accounts = []) => {
  return accounts.map((account) => Number(account.split(':')[1]))
}

export const mapChainWithNamespace = (chainIds = []) => {
  return chainIds.map((chainId) => `eip155:${chainId}`)
}

export const ellipsisAddress = (address, prefixLength = 13, suffixLength = 4) => {
  address = address || ''
  return `${address.substr(0, prefixLength)}...${address.substr(address.length - suffixLength, suffixLength)}`
}

export const viewAddress = (address, chainId = null) => {
  window.open(`${CHAIN_DATA[parseInt(chainId || ReduxService.getChainConnected())]?.blockExplorerUrls?.[0]}/address/` + address, '_blank')
}

export const viewTransaction = (tx, chainId = null) => {
  window.open(`${CHAIN_DATA[parseInt(chainId || ReduxService.getChainConnected())]?.blockExplorerUrls?.[0]}/tx/` + tx, '_blank')
}

const CustomMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Text = styled.div`
  flex: 1;
  gap: 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
`

export const showNotificationError = (errorMessage = '') => {
  const id = `${randomNumber(0, 1000)}`
  message.error({
    icon: <></>,
    key: id,
    content: (
      <CustomMessage>
        <Image width={18} height={18} src={images.noticeError} />
        <Text>{errorMessage}</Text>
        <Image width={12} height={12} cursor='pointer' onClick={() => message.destroy(id)} src={images.icClose} />
      </CustomMessage>
    ),
  })
  // toast.error(errorMessage, {
  //   position: 'bottom-right',
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  // })
}

export const showNotificationSuccess = (content = '') => {
  const id = `${randomNumber(0, 1000)}`
  message.success({
    icon: <></>,
    key: id,
    content: (
      <CustomMessage>
        <Image width={18} height={18} src={images.noticeSuccess} />
        {content}
        <Image width={12} height={12} cursor='pointer' onClick={() => message.destroy(id)} src={images.icClose} />
      </CustomMessage>
    ),
  })
  // toast.success(message, {
  //   position: 'bottom-right',
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  // })
}

export const isNotEnoughGas = (err = null) => {
  err = isObject(err) ? err : { message: err.toString() }
  const outOfGasMsg = 'gas required exceeds allowance'
  return (err.message && err.message.includes(outOfGasMsg)) || (err.stack && err.stack.includes(outOfGasMsg))
}

export const isUserDeniedTransaction = (err = null) => {
  console.log(err)
  err = isObject(err) ? err : { message: err ? err.toString() : '' }
  const deninedMsg = 'User denied transaction signature'
  const userRejectMsg = 'User rejected methods'
  const rejectReq = 'Failed or Rejected Request'
  return (
    (err.message && err.message.includes(deninedMsg)) ||
    (err.message && (err.message.includes(rejectReq) || err.message.includes(userRejectMsg))) ||
    (err.stack && err.stack.includes(deninedMsg))
  )
}

export const detectErrorMessage = (err = null) => {
  if (err && err?.reason && typeof err?.reason === 'string') {
    return err.reason.split('execution reverted: ').join('')
  } else {
    return `Something went wrong !!`
  }
}

export const callBackErrorTransaction = (error) => {
  if (isNotEnoughGas(error)) {
    showNotificationError(`You don't have enough gas`)
  } else if (isUserDeniedTransaction(error)) {
    showNotificationError(`Error: User denied process`)
  } else {
    showNotificationError(detectErrorMessage(error))
  }
}

export const renderUsername = (username) => {
  return ethers.utils.isAddress(username) ? ellipsisAddress(username, 4, 4) : username
}

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * max) + min
}

/**
 *
 * @param {string | number | BigNumber} number1
 * @param {string | number | BigNumber} number2
 * @param {'plus' | 'times' | 'minus' | 'div' | 'pow'} method
 * @param {'string' | 'number'} resultType
 * @returns
 */
export const calculateNumber = (number1, number2, method, resultType = 'string') => {
  const BN1 = BigNumber(number1)
  const BN2 = BigNumber(number2)
  if (method === 'div' && BN2.isLessThan(0)) {
    throw new Error('Supper math error div by zero')
  }
  if (resultType === 'number') {
    return BN1[method](BN2).toNumber()
  }
  return BN1[method](BN2).toFixed()
}

/**
 *
 * @param {number | string} balance
 * @param {number} decimals
 * @returns
 */
export const convertBalanceToWei = (balance, decimals = 18) => {
  return calculateNumber(balance, calculateNumber(10, decimals, 'pow', 'string'), 'times', 'string').split('.')[0]
}

/**
 *
 * @param {string} balanceWei
 * @param {number} decimals
 * @returns
 */
export const convertWeiToBalance = (balanceWei, decimals = 18) => {
  return calculateNumber(balanceWei, calculateNumber(10, decimals, 'pow', 'string'), 'div', 'number')
}

export const renderTokenAmount = (amount, decimals = 4) => {
  return numberWithCommas(scientificToDecimal(roundingNumber(amount, decimals)))
}

export const renderUSDAmount = (amount) => {
  return renderTokenAmount(amount, 2)
}

export const viewMap = (address) => {
  // 167/22 DBT => 167
  let encodedAddress = encodeURIComponent(address)
  viewExternal(`https://www.google.com/maps/place/${encodedAddress}`)
}

const checkBooleanString = (value) => {
  if (typeof value === 'string') {
    if (value === 'true') {
      return true
    } else if (value === 'false') {
      return false
    } else {
      return value
    }
  }
}

export const parseQueryParams = (query = {}) => {
  const result = {}
  Object.keys(query).forEach((key) => {
    if (typeof query?.[key] === 'string') {
      result[key] = checkBooleanString(query?.[key])
    } else if (Array.isArray(query?.[key])) {
      result[key] = query[key].map((item) => checkBooleanString(item))
    }
  })
  return result
}

export const formatHours = (time) => {
  const h = `${Math.floor(time / 60)}`.padStart(2, '0')
  const m = `${time % 60}`.padStart(2, '0')
  return `${h}:${m}`
}

export const renderOpeningHours = (openingHours) => {
  const time = `${formatHours(openingHours?.openAt)}-${formatHours(openingHours?.closeAt)}`
  return time === '00:00-00:00' ? translateFunction('store.open24h') : time
}

export const numberWithAbbreviator = (number, decPlaces = 4) => {
  decPlaces = Math.pow(10, decPlaces)

  let abbrev = ['K', 'M', 'B', 'T']
  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3)
    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces
      number = numberWithCommas(number) + abbrev[i]
      break
    }
  }

  return number
}

export const formattedDate = (time) => {
  return dayjs(time).locale('en').format('YYYY/MM/DD HH:mm')
}

export const validateUrl = (_, value) => {
  const httpRegex = /^http:\/\//
  const httpsRegex = /^https:\/\//
  return new Promise((resolve, reject) => {
    if (httpRegex.test(value) || httpsRegex.test(value)) {
      reject('You can’t input domain here')
    } else {
      resolve()
    }
  })
}

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
