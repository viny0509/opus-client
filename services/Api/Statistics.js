import { createCancelTokenHandler } from './utils'
import BaseAPI from '.'
import { REQUEST_TYPE } from 'constants/app'

const StatisticService = {
  statisticToken() {
    const apiUrl = `/statistics/token`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.statisticToken.name, cancelTokenHandlerObject)
  },
  statisticMarketplace() {
    const apiUrl = `/statistics/marketplace`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.statisticMarketplace.name, cancelTokenHandlerObject)
  },

  getStatisticsToken() {
    const apiUrl = '/statistics/total-store'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getStatisticsToken.name, cancelTokenHandlerObject)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(StatisticService)

export default StatisticService
