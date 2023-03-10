import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import UserService from 'services/Api/User'
import useAuth from './useAuth'

const useHistorySearched = () => {
  const { isSigned } = useAuth()
  const getHistorySearched = async () => {
    const res = await UserService.getUserSearched()
    return res?.data || null
  }

  const { data, isLoading } = useQuery([QUERY_KEY.historySearched], getHistorySearched, {
    enabled: isSigned,
  })

  return {
    isLoading: isLoading,
    data: data || null,
  }
}

export default useHistorySearched
