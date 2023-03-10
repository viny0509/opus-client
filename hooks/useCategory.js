import ReduxService from 'common/redux'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'

const getData = async ({ queryKey }) => {
  const uniqueField = queryKey[1]
  const category = await ReduxService.getCategory(uniqueField)
  return category
}

const useCategory = ({ slugOrId }) => {
  const { data, isLoading } = useQuery([QUERY_KEY.category, slugOrId], getData, {
    enabled: !!slugOrId,
  })
  return {
    isLoading,
    data: data || null,
  }
}

export default useCategory
