import StoreNFTService from 'services/Api/StoreNFT'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'

const getStoreByKey = async ({ queryKey }) => {
  const key = queryKey[1]
  const sortBy = queryKey[2]

  const queryParams = {
    key: key ?? '',
    sortBy: sortBy,
    sortDirection: 'desc',
  }
  if (queryKey[3] !== null) {
    queryParams.hasCryptoPayment = queryKey[3]
  }
  if (queryKey[4] !== null) {
    queryParams.category = queryKey[4]?._id
  }
  const res = await StoreNFTService.getStoreNft(queryParams)
  return res?.data || null
}

const useStoreSearch = (key, mode, cryptoPayment, category) => {
  const { data, isLoading } = useQuery([QUERY_KEY.searchStore, key, mode, cryptoPayment, category], getStoreByKey, {
    enabled: !!mode,
  })
  return {
    isLoading: isLoading,
    data: data || null,
  }
}

export default useStoreSearch
