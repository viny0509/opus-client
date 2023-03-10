import BaseAPI from '.'
import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'

const ReviewService = {
  postReview(payload) {
    const apiUrl = '/reviews'
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.postReview.name, cancelTokenHandlerObject, null, payload)
  },

  getTagsReview(query) {
    const apiUrl = '/reviews/tags'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getTagsReview.name, cancelTokenHandlerObject, query)
  },

  putTagReview(id, payload) {
    const apiUrl = `/reviews/${id}/take-reward`
    return BaseAPI.request(REQUEST_TYPE.PUT, apiUrl, this.putTagReview.name, cancelTokenHandlerObject, null, payload)
  },

  getListReview(query) {
    const apiUrl = `/reviews`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getListReview.name, cancelTokenHandlerObject, query)
  },

  getListReviewProfile(query) {
    const apiUrl = `/reviews/list`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getListReviewProfile.name, cancelTokenHandlerObject, query)
  },

  postReviewComment(id, payload) {
    const apiUrl = `/reviews/${id}/comments`
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.postReviewComment.name, cancelTokenHandlerObject, null, payload)
  },

  postReviewReport(id, payload) {
    const apiUrl = `/reviews/${id}/reports`
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.postReviewComment.name, cancelTokenHandlerObject, null, payload)
  },

  postReviewLike(id, payload) {
    const apiUrl = `/reviews/${id}/like`
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.postReviewLike.name, cancelTokenHandlerObject, null, payload)
  },

  getReviewComment(id, query) {
    const apiUrl = `/reviews/${id}/comments`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.postReviewLike.name, null, query)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(ReviewService)

export default ReviewService
