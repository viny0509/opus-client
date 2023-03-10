import QueryString from 'query-string'
import axiosInstance from './instance'
import { showNotificationError } from 'common/function'
import ReduxServices from 'common/redux'

export default class BaseAPI {
  static async request(method, apiUrl, name, cancelTokenHandlerObject, query, body, token = null, showError = true) {
    const userData = ReduxServices.getUserData()
    const countryCode = ReduxServices.getCountryCode() || null
    const AUTH_TOKEN = token || (userData?.token ? `Bearer ${userData?.token}` : '')
    let url = apiUrl
    if (query) {
      url = url + '?' + QueryString.stringify(query)
    }
    const config = {
      method,
      url,
    }
    if (cancelTokenHandlerObject) {
      config.cancelToken = cancelTokenHandlerObject[name].handleRequestCancellation().token
    }
    if (AUTH_TOKEN) {
      config.headers = {
        Authorization: AUTH_TOKEN,
      }
    }

    if (countryCode) {
      config.headers = {
        ...(config.headers || {}),
        'country-code': countryCode,
      }
    }

    if (body) {
      config.data = body
    }
    return axiosInstance
      .request(config)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        if (error?.response?.status === 403) {
          showError && showNotificationError('Your session has expired. Please sign in again to continue')
          ReduxServices.resetApp()
        } else if (!error?.message?.includes('canceled')) {
          showError && showNotificationError(error?.response?.data?.message || 'API Error')
        }
        return null
      })
  }
}
