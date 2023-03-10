import ReduxService from 'common/redux'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import NFTService from 'services/Api/NFT'

const getData = async ({ queryKey }) => {
  const chainId = queryKey[1]
  const address = queryKey[2]
  const id = queryKey[3]
  const res = await NFTService.getNFT(chainId, address, id)
  if (typeof res?.data?.category === 'string') {
    res.data.category = ReduxService.getCategory(res?.data?.category)
  }
  if (typeof res?.data?.chainId === 'number') {
    res.data.chain = ReduxService.getChain(res?.data?.chainId)
  }
  return res?.data || null
}

const useNFT = ({ chainId, address, id }) => {
  const { data, isLoading } = useQuery([QUERY_KEY.nft, chainId, address, id], getData, {
    enabled: !!chainId && !!address && !!id,
  })
  return {
    isLoading,
    data: data || null,
  }
}

export default useNFT
