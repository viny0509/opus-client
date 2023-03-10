import Account from 'components/Account'
import ClientRender from 'components/ClientRender'
import Image from 'components/Image'
import PrimaryButton from 'components/PrimaryButton'
import WalletConnectModal from 'components/WalletConnectModal'
import { CONNECTION_METHOD, OBSERVER_KEY } from 'constants/web3'
import useAuth from 'hooks/useAuth'
import useModal from 'hooks/useModal'
import { isMobile } from 'react-device-detect'
import Media from 'react-media'
import { useDispatch } from 'react-redux'
import { setConnectionMethod } from 'redux/slices/connectionMethodSlice'
import MetamaskServices from 'services/MetaMask'
import styled, { css } from 'styled-components'
import images from 'common/images'
import Observer from 'common/observer'
import { ellipsisAddress } from 'common/function'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useTranslate from 'hooks/useTranslate'
import PageWrapper from 'components/PageWrapper'
import ActiveLink from 'components/ActiveLink'

export const HeaderContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: #121212;
  @media screen and (min-width: 769px) {
    height: 60px;
  }
  ${(props) =>
    !props.$show &&
    css`
      display: none;
    `}
`

const LogoText = styled.div`
  font-weight: 900;
  font-size: 24px;
  line-height: 33px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  color: #ff571f;
`

export const HeaderWrapper = styled(PageWrapper)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  @media screen and (min-width: 769px) {
    justify-content: space-between;
  }
`

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const Menu = styled.div`
  cursor: pointer;
  width: 30px;
  height: 17px;
`

const ContentAccount = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #ff571f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const LinkContainer = styled.div`
  height: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
`

const Header = ({ mobile = true, desktop = true }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { translate } = useTranslate()
  const { isSignedWithoutCheckChainId, userAddress } = useAuth()
  const { openModal } = useModal()
  const onConnect = () => {
    if (isMobile) {
      Observer.emit(OBSERVER_KEY.SIGN_IN_DRAWER)
    } else {
      openModal({
        content: <WalletConnectModal />,
        header: true,
        width: '600px',
        radius: '10px',
      })
    }
  }

  const handleConnect = () => {
    if (isSignedWithoutCheckChainId) {
      MetamaskServices.checkChainId()
    } else {
      if (isMobile && window.ethereum) {
        dispatch(setConnectionMethod(CONNECTION_METHOD.METAMASK))
        MetamaskServices.initialize()
      } else {
        onConnect()
      }
    }
  }

  useEffect(() => {
    Observer.on(OBSERVER_KEY.SIGN_IN, handleConnect)
    return () => Observer.removeListener(OBSERVER_KEY.SIGN_IN, handleConnect)
  }, [])

  return (
    <ClientRender>
      <Media
        queries={{
          small: '(max-width: 768px)',
          large: '(min-width: 769px)',
        }}
      >
        {(matches) => (
          <>
            {matches.small && <HeaderContainer $show={mobile}>Header Mobile</HeaderContainer>}
            {matches.large && (
              <>
                <HeaderContainer $show={desktop}>
                  <HeaderWrapper>
                    <LeftSide>
                      <LogoText onClick={() => router.push('/')}>OPUS NFT</LogoText>
                    </LeftSide>
                    <RightSide>
                      <LinkContainer>
                        <ActiveLink href='/marketplace'>Marketplace</ActiveLink>
                        <ActiveLink href='/project'>Project</ActiveLink>
                        <ActiveLink href='/service'>Service</ActiveLink>
                      </LinkContainer>
                      {!isSignedWithoutCheckChainId ? (
                        <PrimaryButton onClick={() => handleConnect()} size='medium'>
                          {translate('connect.connectWallet')}
                        </PrimaryButton>
                      ) : (
                        <Account customContent={<ContentAccount>{ellipsisAddress(userAddress, 6, 3)}</ContentAccount>} />
                      )}
                    </RightSide>
                  </HeaderWrapper>
                </HeaderContainer>
              </>
            )}
          </>
        )}
      </Media>
    </ClientRender>
  )
}
export default Header
