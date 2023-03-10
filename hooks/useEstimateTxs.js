import { convertWeiToBalance } from 'common/function'
import ReduxService from 'common/redux'
import { ethers } from 'ethers'

const { QUERY_KEY } = require('constants/query-key')
const { useQuery } = require('react-query')
const { default: Web3Services } = require('services/Web3')

const getData = async ({ queryKey }) => {
  const from = queryKey[1]
  const to = queryKey[2]
  const data = queryKey[3]
  const value = queryKey[4]
  const res = await Web3Services.estimateRawTx({
    from,
    to,
    data,
    value: value || undefined,
  })
  const token = ReduxService.getToken(ethers.constants.AddressZero, ReduxService.getChainConnected())
  if (res) {
    return {
      feeWei: res,
      fee: convertWeiToBalance(res, token?.decimals),
      token,
    }
  } else {
    return null
  }
}

const useEstimateTxs = ({ from, to, dataTx, value }, enable = true) => {
  const { data, isLoading } = useQuery([QUERY_KEY.estimateTxs, from, to, dataTx, value], getData, {
    enabled: enable && !!from && !!to && !!dataTx,
  })

  return {
    isLoading: isLoading,
    data: data || null,
  }
}

export default useEstimateTxs
