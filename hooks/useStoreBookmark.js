import StoreNFTService from 'services/Api/StoreNFT'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import useAuth from './useAuth'

const getStoreBookmark = async ({ queryKey }) => {
  const key = queryKey[1]
  const sortBy = queryKey[2]
  const res = await StoreNFTService.getStoreNftBookmark({
    key: key,
    sortBy: sortBy,
    sortDirection: 'desc',
  })
  return res?.data || null
}

const useStoreBookmark = (key, mode) => {
  const { isSigned } = useAuth()

  const { data, isLoading } = useQuery([QUERY_KEY.storeBookmark, key, mode], getStoreBookmark, {
    enabled: !!mode && !!isSigned,
  })
  return {
    isLoading: isLoading,
    data: data || null,
  }
}

export default useStoreBookmark
