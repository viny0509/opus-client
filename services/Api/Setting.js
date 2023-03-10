import { createCancelTokenHandler } from './utils'
import BaseAPI from '.'
import { REQUEST_TYPE } from 'constants/app'

const SettingService = {
  getSetting(key = 'main') {
    const apiUrl = `/app/config/${key}`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getSetting.name)
  },
  getTemplate() {
    const apiUrl = `/app/template`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getTemplate.name, cancelTokenHandlerObject)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(SettingService)

export default SettingService
