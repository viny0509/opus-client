import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import UserService from 'services/Api/User'

const getInfoUser = async ({ queryKey }) => {
  const slug = queryKey[1]
  const res = await UserService.getProfileByAddress({
    userAddress: slug,
  })
  return res?.data || null
}

const useProfileBySlug = (address) => {
  const { data, isLoading } = useQuery([QUERY_KEY.userProfile, address], getInfoUser, {
    enabled: !!address,
  })

  return {
    data: data || null,
    isLoading: isLoading,
  }
}

export default useProfileBySlug
