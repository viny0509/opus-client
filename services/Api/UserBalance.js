import BaseAPI from '.'
import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'

const UserBalanceService = {
  getBalance(query) {
    const apiUrl = '/user/balance'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getBalance.name, cancelTokenHandlerObject, query)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(UserBalanceService)

export default UserBalanceService
