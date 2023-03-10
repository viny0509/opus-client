import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import UserService from 'services/Api/User'

const getHelpful = async ({ queryKey }) => {
  const address = queryKey[1]
  const res = await UserService.getProfileCommentHelpful({
    userAddress: address,
  })

  console.log('res', res)

  return res?.data || null
}

const useHelpful = (address) => {
  const { data, isLoading } = useQuery([QUERY_KEY.helpFul, address], getHelpful)
  return {
    isLoading: isLoading,
    data: data || null,
  }
}
export default useHelpful
