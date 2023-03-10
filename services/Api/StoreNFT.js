import BaseAPI from '.'
import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'

const StoreNFTService = {
  postStoreNFt(payload) {
    const apiUrl = '/store-nfts'
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.postStoreNFt.name, cancelTokenHandlerObject, null, payload)
  },

  getStoreNft(query) {
    const apiUrl = '/store-nfts'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getStoreNft.name, cancelTokenHandlerObject, query)
  },

  findBySlug(slug) {
    const apiUrl = `/store-nfts/${slug}`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.findBySlug.name, cancelTokenHandlerObject)
  },

  findFirst(query) {
    const apiUrl = `/store-nfts/find-one`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.findFirst.name, cancelTokenHandlerObject, query)
  },

  getStoreNftBookmark(query) {
    const apiUrl = '/store-nfts/bookmark'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getStoreNftBookmark.name, cancelTokenHandlerObject, query)
  },

  getBannerSearch() {
    const apiUrl = '/banners'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getBannerSearch.name, cancelTokenHandlerObject)
  },

  postExchangeNft(payload) {
    const apiUrl = '/store-nfts/exchange-mint-code'
    return BaseAPI.request(REQUEST_TYPE.PUT, apiUrl, this.postExchangeNft.name, cancelTokenHandlerObject, null, payload)
  },

  getMenuStore(id) {
    const apiUrl = `/store-nfts/menu-items/${id}`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getMenuStore.name, cancelTokenHandlerObject)
  },

  postBookmark(payload) {
    const apiUrl = `/store-nfts/bookmark`
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.postBookmark.name, cancelTokenHandlerObject, null, payload)
  },

  deleteBookmark(id) {
    const apiUrl = `/store-nfts/bookmark/${id}`
    return BaseAPI.request(REQUEST_TYPE.DELETE, apiUrl, this.deleteBookmark.name, cancelTokenHandlerObject)
  },

  getPhotosStore(id, query) {
    const apiUrl = `/store-nfts/${id}/photo`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getPhotosStore.name, cancelTokenHandlerObject, query)
  },

  getTagReport(payload) {
    const apiUrl = `/store-nfts/tags`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getTagReport.name, cancelTokenHandlerObject, payload)
  },

  postReportStore(id, payload) {
    const apiUrl = `/store-nfts/${id}/reports`
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.getTagReport.name, cancelTokenHandlerObject, null, payload)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(StoreNFTService)

export default StoreNFTService
