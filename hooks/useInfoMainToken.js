import { calculateNumber, convertWeiToBalance } from 'common/function'
import ReduxService from 'common/redux'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import StatisticService from 'services/Api/Statistics'
import Web3Services from 'services/Web3'
import { useBlacklist, useSettingContract, useSettingRedux } from './useRedux'

const getData = async ({ queryKey }) => {
  const tokenAddress = queryKey[1]
  const chainId = queryKey[2]
  const blacklist = queryKey[3]
  let result = {
    address: tokenAddress,
    chainId: chainId,
    totalHolderUnclaimed: 0,
    totalUnclaimed: 0,
    totalUnclaimedInWei: '0',
    totalSupply: 0,
    totalSupplyWei: '0',
    totalAmountBlacklistWei: '0',
    totalAmountBlacklist: 0,
  }
  const token = await ReduxService.getTokenByAddressAndChainId(tokenAddress, chainId)
  if (token) {
    result.name = token?.name
    result.symbol = token?.symbol
    result.chainId = token?.chainId
    result.address = token?.address
    result.decimals = token?.decimals
    result.icon = token?.icon
  }

  const [resStatistics, totalSupplyWei] = (
    await Promise.allSettled([StatisticService.statisticToken(), Web3Services.getTotalSupply(tokenAddress, chainId)])
  ).map((item) => item.value)

  if (resStatistics?.data) {
    result.totalHolderUnclaimed = resStatistics.data?.totalUnclaimedHolder
    result.totalUnclaimed = resStatistics.data?.totalUnclaimed
    result.totalUnclaimedInWei = resStatistics.data?.totalUnclaimedInWei
  }

  if (totalSupplyWei) {
    result.totalSupplyWei = totalSupplyWei
    result.totalSupply = convertWeiToBalance(totalSupplyWei, token?.decimals)
  }

  if (blacklist?.length > 0) {
    // TODO
    console.log('blacklist', blacklist)
    result.totalAmountBlacklistWei = calculateNumber('0', '0', 'plus', 'string')
    result.totalAmountBlacklist = convertWeiToBalance(result.totalAmountBlacklistWei, token?.decimals)
  }

  return result
}

const useInfoMainToken = () => {
  const settingRedux = useSettingRedux()
  const contractSetting = useSettingContract()
  const blacklist = useBlacklist()
  const { data, isLoading } = useQuery(
    [QUERY_KEY.infoMainToken, contractSetting?.tokenA, settingRedux?.mainTokenChainId, blacklist?.mainTokenTotalSupply],
    getData,
    {
      enabled: !!contractSetting?.tokenA && !!settingRedux?.mainTokenChainId,
    }
  )
  return {
    isLoading,
    data: data || {
      address: contractSetting?.tokenA,
      chainId: settingRedux?.mainTokenChainId,
      totalHolderUnclaimed: 0,
      totalUnclaimed: 0,
      totalUnclaimedInWei: '0',
      totalSupply: 0,
      totalSupplyWei: '0',
    },
  }
}

export default useInfoMainToken
