import { convertWeiToBalance } from 'common/function'
import ReduxService from 'common/redux'
import { QUERY_KEY } from 'constants/query-key'
import { useQuery } from 'react-query'
import Web3Services from 'services/Web3'

const getData = async ({ queryKey }) => {
  const tokenAddress = queryKey[1]
  const chainId = parseInt(queryKey[2])
  const userAddress = queryKey[3]
  const token = await ReduxService.getTokenByAddressAndChainId(tokenAddress, chainId)
  const balanceWei = await Web3Services.getTokenBalance(userAddress, tokenAddress, chainId)
  return {
    userAddress,
    ...(token || {}),
    address: tokenAddress,
    balanceWei: `${balanceWei}`,
    chainId,
    balance: convertWeiToBalance(`${balanceWei}`, token?.decimals),
  }
}

const useTokenBalance = ({ address, chainId, userAddress }) => {
  const { data, isLoading } = useQuery([QUERY_KEY.tokenBalance, address, chainId, userAddress], getData, {
    enabled: !!address && !!userAddress && !!chainId,
  })
  return {
    isLoading,
    data: data || {
      userAddress,
      address: address,
      chainId: chainId,
      balance: 0,
      balanceWei: '0',
    },
  }
}

export default useTokenBalance
