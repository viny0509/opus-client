import BaseAPI from '.'
import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'

const UserService = {
  getMessageHash(query) {
    const apiUrl = '/authentication/hash'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getMessageHash.name, cancelTokenHandlerObject, query)
  },
  signIn(address, signature) {
    const apiUrl = '/authentication/sign'
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.signIn.name, cancelTokenHandlerObject, null, {
      signature,
      address,
    })
  },
  edit(payload) {
    const apiUrl = '/user/profile'
    return BaseAPI.request(REQUEST_TYPE.PUT, apiUrl, this.edit.name, cancelTokenHandlerObject, null, payload)
  },
  getUserByAccessToken(accessToken) {
    const apiUrl = '/user/profile'
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.getUserByAccessToken.name, cancelTokenHandlerObject, null, { accessToken })
  },
  getUser() {
    const apiUrl = '/user/profile'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getUser.name, cancelTokenHandlerObject)
  },

  getUserSearched(accessToken) {
    const apiUrl = '/user/searched-keyword'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getUserSearched.name, cancelTokenHandlerObject, null, { accessToken })
  },

  postUserSearched(payload) {
    const apiUrl = '/user/searched-keyword'
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.postUserSearched.name, cancelTokenHandlerObject, null, payload)
  },

  getBrowsingHistory(accessToken) {
    const apiUrl = '/user/browsing-history'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getBrowsingHistory.name, cancelTokenHandlerObject, null, { accessToken })
  },

  getUserLimitReview(accessToken) {
    const apiUrl = 'user/reviews/check-limit'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getUserLimitReview.name, cancelTokenHandlerObject, null, { accessToken })
  },

  getReviewMine(query, accessToken) {
    const apiUrl = `/user/reviews/mine`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getReviewMine.name, cancelTokenHandlerObject, query, { accessToken })
  },

  getProfileByAddress(query) {
    const apiUrl = `/user/profile/`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getProfileByAddress.name, cancelTokenHandlerObject, query)
  },

  getProfileReviewStoreVisited(query) {
    const apiUrl = `/user/reviews/store-visited`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getProfileReviewStoreVisited.name, cancelTokenHandlerObject, query)
  },

  getProfileCommentHelpful(query) {
    const apiUrl = `/user/reviews/comment-helpful`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getProfileCommentHelpful.name, cancelTokenHandlerObject, query)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(UserService)

export default UserService
