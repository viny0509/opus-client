import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import ReviewService from 'services/Api/Review'

const getTags = async ({ queryKey }) => {
  const typeReview = queryKey[1]
  const res = await ReviewService.getTagsReview({
    type: typeReview,
  })
  return res?.data || null
}

const useTagsReview = (type) => {
  const { data, isLoading } = useQuery([QUERY_KEY.tagsReview, type], getTags)
  return {
    isLoading: isLoading,
    data: data || null,
  }
}

export default useTagsReview
