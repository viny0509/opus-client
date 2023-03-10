import { QUERY_KEY } from 'constants/query-key'
import { useInfiniteQuery } from 'react-query'
import ReviewService from 'services/Api/Review'

const getReview = async ({ queryKey, pageParam = 1 }) => {
  console.log('queryKey', queryKey)
  const storeId = queryKey[1]
  const limit = queryKey[2]
  const userId = queryKey[3]
  const onlyList = queryKey[4]
  const page = pageParam

  const payLoad = {
    limit: limit,
    page: page,
  }

  if (storeId) {
    payLoad.storeId = storeId
  }

  if (userId) {
    payLoad.userId = userId
  }
  if (onlyList) {
    payLoad.onlyList = true
  }
  console.log('Payload', payLoad)

  const res = await ReviewService.getListReview(payLoad)

  return res?.data || null
}

const useStoreReviewList = (storeId, userId, onlyList, limit = 3) => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery([QUERY_KEY.listReview, storeId, limit, userId, onlyList], getReview, {
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : null),
  })

  const items = data?.pages.flatMap((page) => page.items)

  return {
    isLoading: isLoading,
    isFetching: isFetching,
    data: items || null,
    loadMore: fetchNextPage,
    canLoadMore: hasNextPage,
  }
}

export default useStoreReviewList
