import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import StatisticService from 'services/Api/Statistics'

const getData = async () => {
  const res = await StatisticService.statisticMarketplace()
  return res?.data || null
}

const useStatisticMarketplace = () => {
  const { data, isLoading } = useQuery([QUERY_KEY.statisticsMarketplace], getData, {
    enabled: true,
  })
  return {
    isLoading,
    data: data || null,
  }
}

export default useStatisticMarketplace
