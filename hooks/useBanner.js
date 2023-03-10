import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import StoreNFTService from 'services/Api/StoreNFT'

const getBanners = async () => {
  const res = await StoreNFTService.getBannerSearch()
  return res?.data?.items || null
}

const useBanners = () => {
  const { data, isLoading } = useQuery([QUERY_KEY.banners], getBanners)
  return {
    isLoading: isLoading,
    data: data || null,
  }
}

export default useBanners
