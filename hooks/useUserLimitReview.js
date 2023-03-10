import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import UserService from 'services/Api/User'
import useAuth from './useAuth'

const getLimitReview = async () => {
  const res = await UserService.getUserLimitReview()
  return res?.data || null
}

const useUserLimitReview = () => {
  const { isSigned } = useAuth()

  const { data, isLoading } = useQuery([QUERY_KEY.userLimitReview], getLimitReview, {
    enabled: isSigned,
  })

  return {
    isLoading: isLoading,
    data: data || null,
  }
}

export default useUserLimitReview
