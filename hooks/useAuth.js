/* eslint-disable no-unused-vars */
import { CONNECTION_METHOD } from 'constants/web3'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import ReduxService from 'common/redux'

const useAuth = () => {
  const { userData, metamaskExtension, walletConnect, walletConnectV2, connectionMethod, chainConnected } = useSelector((state) => state)

  const isSignedWithoutCheckChainId = useMemo(
    () => ReduxService.checkIsSigned(),
    [connectionMethod, metamaskExtension, walletConnect, walletConnectV2, userData]
  )
  const isSigned = useMemo(() => {
    if (connectionMethod === CONNECTION_METHOD.METAMASK) {
      return isSignedWithoutCheckChainId && metamaskExtension?.web3ChainId === parseInt(chainConnected)
    }
    return isSignedWithoutCheckChainId
  }, [connectionMethod, metamaskExtension, isSignedWithoutCheckChainId, walletConnect, walletConnectV2, userData])

  return {
    isSigned,
    isSignedWithoutCheckChainId,
    userAddress: isSignedWithoutCheckChainId ? userData?.address : null,
    token: isSignedWithoutCheckChainId ? userData?.token : null,
    role: isSignedWithoutCheckChainId ? userData?.role : null,
    idSigned: isSignedWithoutCheckChainId ? userData?._id : null,
  }
}

export default useAuth
