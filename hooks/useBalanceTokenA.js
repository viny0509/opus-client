import { calculateNumber, convertWeiToBalance } from 'common/function'
import ReduxService from 'common/redux'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import UserBalanceService from 'services/Api/UserBalance'
import Web3Services from 'services/Web3'
import useAuth from './useAuth'
import { useSettingContract, useSettingRedux } from './useRedux'

const getData = async ({ queryKey }) => {
  const tokenAddress = queryKey[1]
  const chainId = queryKey[2]
  const isSigned = queryKey[3]
  if (isSigned) {
    const resUserPoint = await UserBalanceService.getBalance({ tokenAddress, chainId: parseInt(chainId) })
    const userPoint = resUserPoint?.data
    if (userPoint) {
      const resWeb3BalanceWei = await Web3Services.getTokenBalance(userPoint?.userAddress, userPoint?.address, userPoint?.chainId)
      const web3BalanceWei = resWeb3BalanceWei ? resWeb3BalanceWei.toString() : '0'
      const web3Balance = convertWeiToBalance(web3BalanceWei, userPoint.decimals)
      return {
        name: userPoint.name,
        symbol: userPoint.symbol,
        chainId: userPoint.chainId,
        address: userPoint.address,
        decimals: userPoint.decimals,
        icon: userPoint.icon,
        web3BalanceWei,
        web3Balance,
        balancePoint: userPoint.balance,
        balancePointWei: userPoint.balanceWei,
        balance: calculateNumber(web3Balance, userPoint?.balance, 'plus', 'number'),
        balanceWei: calculateNumber(web3BalanceWei, userPoint?.balanceWei, 'plus', 'string'),
      }
    }
  }
  const token = await ReduxService.getTokenByAddressAndChainId(tokenAddress, chainId)
  return {
    name: token?.name,
    symbol: token?.symbol,
    chainId: token?.chainId,
    address: token?.address,
    decimals: token?.decimals,
    icon: token?.icon,
    balanceWei: '0',
    web3BalanceWei: '0',
    balancePointWei: '0',
    balance: 0,
    web3Balance: 0,
    balancePoint: 0,
  }
}

const useBalanceTokenA = () => {
  const { isSignedWithoutCheckChainId } = useAuth()
  const settingRedux = useSettingRedux()
  const contractSetting = useSettingContract()
  const { data, isLoading } = useQuery(
    [QUERY_KEY.balanceTokenA, contractSetting?.tokenA, settingRedux?.mainTokenChainId, isSignedWithoutCheckChainId],
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
      balanceWei: '0',
      web3BalanceWei: '0',
      balancePointWei: '0',
      balance: 0,
      web3Balance: 0,
      balancePoint: 0,
    },
  }
}

export default useBalanceTokenA
