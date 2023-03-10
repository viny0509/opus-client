import BaseAPI from '.'
import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'

const MarketplaceService = {
  getNonce(chainId) {
    const apiUrl = '/marketplace/nonce'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getNonce.name, cancelTokenHandlerObject, { chainId })
  },
  sell(body) {
    const apiUrl = '/marketplace/sell'
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.sell.name, cancelTokenHandlerObject, null, body)
  },
  buy(body) {
    const apiUrl = '/marketplace/buy'
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.buy.name, cancelTokenHandlerObject, null, body)
  },
  cancel(body) {
    const apiUrl = '/marketplace/cancel'
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.cancel.name, cancelTokenHandlerObject, null, body)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(MarketplaceService)

export default MarketplaceService
