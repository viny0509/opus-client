import { REQUEST_TYPE } from 'constants/app'
import { createCancelTokenHandler } from './utils'
import BaseAPI from '.'

const ClaimService = {
  claimToken({ chainId, amountWei, tokenAddress }) {
    const apiUrl = `/claim-tokens`
    return BaseAPI.request(REQUEST_TYPE.POST, apiUrl, this.claimToken.name, cancelTokenHandlerObject, null, {
      chainId,
      amountWei,
      tokenAddress,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(ClaimService)

export default ClaimService
