import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'
import BaseAPI from '.'

const GenreService = {
  getAll(query) {
    const apiUrl = `/genres`
    return BaseAPI.request(REQUEST_TYPE.GET, apiUrl, this.getAll.name, cancelTokenHandlerObject, query)
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(GenreService)

export default GenreService
