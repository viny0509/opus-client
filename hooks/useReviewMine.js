import UserService from 'services/Api/User'
import { QUERY_KEY } from 'constants/query-key'
import { useInfiniteQuery } from 'react-query'
import useAuth from './useAuth'

const getReviewMine = async ({ queryKey, pageParam = 1 }) => {
  const storeId = queryKey[1]
  const limit = queryKey[2]
  const page = pageParam
  const res = await UserService.getReviewMine({
    storeId: storeId,
    limit: limit,
    page: page,
  })
  return res?.data || null
}
const useReviewMine = (storeId, limit = 3) => {
  const { isSigned } = useAuth()
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery([QUERY_KEY.reviewMine, storeId, limit], getReviewMine, {
    enabled: isSigned,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : null),
  })
  const items = data?.pages?.flatMap((page) => page.items) || null

  return {
    isLoading: isLoading,
    isFetching: isFetching,
    data: items || null,
    loadMore: fetchNextPage,
    canLoadMore: hasNextPage,
  }
}

export default useReviewMine
