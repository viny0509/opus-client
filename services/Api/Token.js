import BaseAPI from '.'
import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'

const TokenService = {
  getAll(query) {
    const apiUrl = `/tokens`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getAll.name, cancelTokenHandlerObject, query)
  },
  getOne(address, chainId) {
    const apiUrl = `/tokens/${address}/${chainId}`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getOne.name, cancelTokenHandlerObject)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(TokenService)

export default TokenService
