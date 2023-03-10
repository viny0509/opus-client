import StatisticService from 'services/Api/Statistics'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'

const getStatisticsTotalStore = async () => {
  const res = await StatisticService.getStatisticsToken()
  return res.data
}

const useStatisticsTotalStore = () => {
  const { data, isLoading } = useQuery([QUERY_KEY.statisticsTotalStore], getStatisticsTotalStore)
  return {
    data: data,
    isLoading,
  }
}

export default useStatisticsTotalStore
