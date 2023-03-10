import { useInfiniteQuery } from 'react-query'
import ReviewService from 'services/Api/Review'
import { QUERY_KEY } from 'constants/query-key'

const getReviewComments = async ({ queryKey, pageParam = 1 }) => {
  const reviewId = queryKey[1]
  const limit = queryKey[2]
  const page = pageParam

  const res = await ReviewService.getReviewComment(reviewId, {
    page: page,
    limit: limit,
  })
  return res?.data || null
}

const useReviewCommentsList = (reviewId, limit = 3) => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery([QUERY_KEY.listReview, reviewId, limit], getReviewComments, {
    getNextPageParam: (lastPage) => (lastPage?.page < lastPage?.totalPages ? lastPage?.page + 1 : null),
  })

  const comments = data?.pages?.flatMap((page) => page?.items) || []
  let res
  if ((comments?.length === 1 && comments[0] === undefined) || comments?.length === 0) {
    res === null
  } else {
    res = comments
  }

  return {
    isLoading: isLoading,
    isFetching: isFetching,
    data: res,
    loadMore: fetchNextPage,
    canLoadMore: hasNextPage,
  }
}

export default useReviewCommentsList
