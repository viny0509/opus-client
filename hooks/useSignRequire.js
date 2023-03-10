import VerifyAddressModal from 'components/VerifyAddressModal'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ReduxService from 'common/redux'
import useModal from './useModal'

const useSignRequire = () => {
  const { openModal } = useModal()
  const { walletConnect, userData, metamaskExtension, modal, connectionMethod } = useSelector((state) => state)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_HAS_SIGN && !ReduxService.checkIsSigned() && userData && !modal && connectionMethod !== '') {
      setTimeout(
        () =>
          openModal({
            width: '500px',
            radius: '10px',
            content: <VerifyAddressModal />,
          }),
        200
      )
    }
  }, [userData, walletConnect, metamaskExtension, modal])
}

export default useSignRequire
