import SaleItemsService from 'services/Api/SaleItems'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'

const getListSale = async ({ queryKey }) => {
  const limit = queryKey[1]
  const page = queryKey[2]
  const res = await SaleItemsService.getCardSale({
    limit: limit,
    page: page,
  })
  return res.data
}

const useSaleItems = (query) => {
  const { data, isLoading } = useQuery([QUERY_KEY, query?.limit, query?.page], getListSale)
  return {
    isLoading: isLoading,
    data: data?.items || null,
  }
}

export default useSaleItems
