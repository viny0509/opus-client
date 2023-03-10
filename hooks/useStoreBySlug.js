import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import StoreNFTService from 'services/Api/StoreNFT'

const getData = async ({ queryKey }) => {
  const slug = queryKey[1]
  const res = await StoreNFTService.findBySlug(slug)
  return res?.data || null
}

const useStoreBySlug = (slug) => {
  const { data, isLoading } = useQuery([QUERY_KEY.storeBySlug, slug], getData, {
    enabled: !!slug,
  })
  return {
    isLoading,
    data: data || null,
  }
}

export default useStoreBySlug
