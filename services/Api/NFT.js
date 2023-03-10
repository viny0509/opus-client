import BaseAPI from '.'
import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'

const NFTService = {
  getList(query) {
    const apiUrl = '/nfts'
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getList.name, cancelTokenHandlerObject, query)
  },
  getNFT(chainId, nftAddress, nftId) {
    const apiUrl = `/nfts/${chainId}/${nftAddress}/${nftId}`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getNFT.name, cancelTokenHandlerObject)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(NFTService)

export default NFTService
