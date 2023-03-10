import ReduxService from 'common/redux'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'

const getData = async ({ queryKey }) => {
  const tokenAddress = queryKey[1]
  const chainId = queryKey[2]
  const token = await ReduxService.getTokenByAddressAndChainId(tokenAddress, chainId)
  return token
}

const useToken = ({ address, chainId }) => {
  const { data, isLoading } = useQuery([QUERY_KEY.token, address, chainId], getData, {
    enabled: !!address && !!chainId,
  })
  return {
    isLoading,
    data: data || null,
  }
}

export default useToken
