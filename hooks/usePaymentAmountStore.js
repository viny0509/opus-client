import { convertWeiToBalance } from 'common/function'
import ReduxService from 'common/redux'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import Web3Services from 'services/Web3'
import { useSettingContract, useSettingRedux } from './useRedux'

const getData = async ({ queryKey }) => {
  const result = {}
  const tokenAddress = queryKey[1]
  const nftAddress = queryKey[2]
  const chainId = queryKey[3]
  const token = await ReduxService.getTokenByAddressAndChainId(tokenAddress, chainId)
  const paymentAmountWei = await Web3Services.getPaymentAmountStore(tokenAddress, nftAddress, chainId)
  const paymentAmount = convertWeiToBalance(`${paymentAmountWei || 0}`, token?.decimals)
  result.paymentAmount = paymentAmount || 0
  result.paymentAmountWei = `${paymentAmountWei || 0}`

  return result
}

const usePaymentAmountStore = () => {
  const settingRedux = useSettingRedux()
  const contractSetting = useSettingContract()
  const { data, isLoading } = useQuery(
    [QUERY_KEY.paymentAmountStore, contractSetting?.tokenA, contractSetting?.storeNFT, settingRedux?.mainTokenChainId],
    getData,
    {
      enabled: !!contractSetting?.tokenA && !!settingRedux?.mainTokenChainId && !!contractSetting?.storeNFT,
    }
  )
  return {
    isLoading,
    data: data || {
      paymentAmountWei: '0',
      paymentAmount: 0,
    },
  }
}

export default usePaymentAmountStore
