import { useQuery } from 'react-query'
import { QUERY_KEY } from 'constants/query-key'
import StoreNFTService from 'services/Api/StoreNFT'

const getTags = async ({ queryKey }) => {
  const typeReport = queryKey[1]
  const res = await StoreNFTService.getTagReport({
    type: typeReport,
  })
  return res?.data || null
}

const useTagsReport = (type) => {
  const { data, isLoading } = useQuery([QUERY_KEY.tagsReport, type], getTags)
  return {
    isLoading: isLoading,
    data: data || null,
  }
}

export default useTagsReport
