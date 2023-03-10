// import { createCancelTokenHandler } from './utils'
// import APIService from './index'

import { REQUEST_TYPE } from 'constants/app'

const UploadService = {
  async upload(file) {
    const formData = new FormData()
    formData.append('file', file)
    const resData = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/upload/file`, {
      method: REQUEST_TYPE.POST,
      headers: {},
      body: formData,
    })
    const res = await resData.json()
    return res || null
  },
}

// const cancelTokenHandlerObject = createCancelTokenHandler(UploadService)

export default UploadService
