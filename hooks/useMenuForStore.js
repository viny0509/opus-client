import { useQuery } from 'react-query'
import StoreNFTService from 'services/Api/StoreNFT'
import { QUERY_KEY } from 'constants/query-key'

const getMenu = async ({ queryKey }) => {
  const storeId = queryKey[1]
  const res = await StoreNFTService.getMenuStore(storeId)
  return res?.data || null
}

const useMenuForStore = (id) => {
  const { data, isLoading } = useQuery([QUERY_KEY.getMenuStore, id], getMenu, {
    enabled: !!id,
  })

  return {
    data: data || null,
    isLoading: isLoading,
  }
}

export default useMenuForStore
