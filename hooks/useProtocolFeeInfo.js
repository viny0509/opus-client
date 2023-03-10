import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import Web3Services from 'services/Web3'
import { useSettingContract } from './useRedux'

const getData = async ({ queryKey }) => {
  const contractAddress = queryKey[1]
  const res = await Web3Services.getProtocolFee(contractAddress)
  return res
}

const useProtocolFeeInfo = () => {
  const contract = useSettingContract()
  const { data, isLoading } = useQuery([QUERY_KEY.protocolFee, contract?.marketplace], getData, {
    enabled: !!contract?.marketplace,
  })
  return {
    isLoading,
    data: data || null,
  }
}

export default useProtocolFeeInfo
