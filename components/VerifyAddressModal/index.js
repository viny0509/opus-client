import Image from 'components/Image'
import PrimaryButton from 'components/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton'
import { CONNECTION_METHOD } from 'constants/web3'
import useModal from 'hooks/useModal'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import images from 'common/images'
import ReduxService from 'common/redux'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const Title = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  color: #061927;
`

const SubTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #828282;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const VerifyAddressModal = () => {
  const [loading, setLoading] = useState(false)
  const { connectionMethod } = useSelector((state) => state)
  const { closeModal } = useModal()
  const onReject = () => {
    ReduxService.resetApp()
    closeModal()
  }
  const onConfirm = () => {
    const callback = () => {
      setLoading(false)
      setTimeout(() => closeModal(), 100)
    }
    setLoading(true)
    if (connectionMethod === CONNECTION_METHOD.METAMASK) {
      ReduxService.connectMetamaskWithSign(callback, callback)
    }
    if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT) {
      ReduxService.walletConnectWithSign(callback, callback)
    }
    if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT_V2) {
      ReduxService.walletConnectV2WithSign(callback, callback)
    }
  }

  return (
    <Container>
      <Header>
        <Image cursor='pointer' onClick={() => onReject()} src={images.icClose} />
      </Header>
      <Wrapper>
        <Title>Verify Address</Title>
        <SubTitle>You will be asked to sign a message so that we can verify you as the owner of the address. </SubTitle>
        <ButtonContainer>
          <SecondaryButton onClick={() => onReject()} fullWidth>
            Reject
          </SecondaryButton>
          <PrimaryButton loading={loading} onClick={() => onConfirm()} fullWidth>
            Confirm
          </PrimaryButton>
        </ButtonContainer>
      </Wrapper>
    </Container>
  )
}

export default VerifyAddressModal
