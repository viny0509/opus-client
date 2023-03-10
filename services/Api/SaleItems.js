import BaseAPI from '.'
import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'

const SaleItems = {
  getCardSale(query) {
    const apiUrl = '/sale-items/public'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getCardSale.name, cancelTokenHandlerObject, query)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(SaleItems)

export default SaleItems
