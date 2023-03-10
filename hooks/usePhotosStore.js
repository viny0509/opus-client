import { QUERY_KEY } from 'constants/query-key'
import { useInfiniteQuery } from 'react-query'
import StoreNFTService from 'services/Api/StoreNFT'

const getPhotos = async ({ queryKey, pageParam }) => {
  const storeId = queryKey[1]
  const limit = queryKey[2]
  const page = pageParam
  const res = await StoreNFTService.getPhotosStore(storeId, {
    limit: limit,
    page: page,
  })
  return res?.data || null
}

const usePhotosStore = (storeId, limit = 16) => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery([QUERY_KEY.photosStore, storeId, limit], getPhotos, {
    enabled: !!storeId,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : null),
    refetchOnWindowFocus: false,
  })

  const items = data?.pages.flatMap((page) => page.items)

  return {
    isLoading: isLoading,
    isFetching: isFetching,
    hasNextPage: hasNextPage,
    data: items || null,
    loadMore: fetchNextPage,
    canLoadMore: hasNextPage,
  }
}

export default usePhotosStore
