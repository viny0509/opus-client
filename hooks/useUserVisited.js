import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import UserService from 'services/Api/User'

const getHelpful = async ({ queryKey }) => {
  const address = queryKey[1]
  const res = await UserService.getProfileReviewStoreVisited({
    userAddress: address,
  })
  return res?.data || null
}

const useUserVisited = (address) => {
  const { data, isLoading } = useQuery([QUERY_KEY.storeVisited, address], getHelpful, {
    enabled: !!address,
  })

  return {
    isLoading: isLoading,
    data: data || null,
  }
}
export default useUserVisited
