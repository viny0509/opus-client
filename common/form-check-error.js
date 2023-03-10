import { ethers } from 'ethers'
import { isURL, validateEmail } from './function'

export const checkRequire = (name, value) => {
  if (!value || value === '') {
    return `[name] is required`.replace('[name]', `${name}`)
  }
  if (Array.isArray(value) && value.length === 0) {
    return `[name] is required`.replace('[name]', `${name}`)
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return `[name] is required`.replace('[name]', `${name}`)
  }
  return null
}

export const checkNegative = (name, value) => {
  if (Number(value || 0) < 0) {
    return `[name] is negative`.replace('[name]', `${name}`)
  }
  return null
}

export const checkLength = (name, value, max, min) => {
  if (Array.isArray(value)) {
    if (value?.length > max) {
      return `The [name] must be less than or equal to ${max}.`.replace('[name]', `${name}`)
    } else if (value?.length < min) {
      return `The [name] must be greater than or equal to ${min}.`.replace('[name]', `${name}`)
    }
  }
  if (value?.length > max) {
    return `The [name] must be less than or equal to ${max}.`.replace('[name]', `${name}`)
  } else if (value?.length < min) {
    return `The [name] must be greater than or equal to ${min}.`.replace('[name]', `${name}`)
  }
  return null
}

export const checkStoreGenre = (name, value, max, min) => {
  if (Array.isArray(value)) {
    if (value?.length > max) {
      return `The [name] must be less than or equal to ${max}.`.replace('[name]', `${name}`)
    } else if (value?.length < min) {
      return `The [name] must be greater than or equal to ${min}.`.replace('[name]', `${name}`)
    }
  }

  if (Array.isArray(value)) {
    for (const v of value) {
      if (v) return null
    }
  }

  return `[name] is required`.replace('[name]', `${name}`)
}

export const checkEmail = (value) => {
  if (value && validateEmail(value)) {
    return `Email invalid`
  }
  return null
}

export const checkEmailEqual = (value, valueCompare) => {
  if (value && validateEmail(value)) {
    return `Email invalid`
  }
  if (value !== valueCompare) {
    return 'Retype email error'
  }
  return null
}

export const checkAddress = (value) => {
  if (!value || !ethers.utils.isAddress(value)) {
    return `Address invalid`
  }
  return null
}

export const checkUri = (name, value) => {
  if (value && (!isURL(value) || !value.includes('http'))) {
    return `[name] invalid uri`.replace('[name]', `${name}`)
  }
  return null
}
