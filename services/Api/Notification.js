import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'
import BaseAPI from '.'

const Notification = {
  getAll(query) {
    const apiUrl = `/app-notifications`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getAll.name, cancelTokenHandlerObject, query)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(Notification)

export default Notification
