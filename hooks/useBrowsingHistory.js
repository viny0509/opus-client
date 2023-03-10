import { useQuery } from 'react-query'
import UserService from 'services/Api/User'
import useAuth from './useAuth'
import { QUERY_KEY } from 'constants/query-key'

const getBrowsingHistory = async () => {
  const res = await UserService.getBrowsingHistory()
  return res.data
}

const useBrowsingHistory = () => {
  const { isSigned } = useAuth()
  const { data, isLoading } = useQuery([QUERY_KEY.browsingHistory], getBrowsingHistory, {
    enabled: isSigned,
  })
  return {
    isLoading: isLoading,
    data: data?.items || null,
  }
}

export default useBrowsingHistory
