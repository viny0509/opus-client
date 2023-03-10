import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'
import BaseAPI from '.'

const ImageService = {
  deleteImage(id) {
    const apiUrl = `/images/${id}`
    return BaseAPI.request(REQUEST_TYPE.DELETE, apiUrl, this.deleteImage.name, cancelTokenHandlerObject)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(ImageService)

export default ImageService
