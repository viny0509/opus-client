import ChooseChainWalletV2Modal from 'components/ChooseChainWalletV2Modal'
import Image from 'components/Image'
import PrimaryButton from 'components/PrimaryButton'
import { CONNECTION_METHOD } from 'constants/web3'
import useModal from 'hooks/useModal'
import { useDispatch } from 'react-redux'
import { setConnectionMethod } from 'redux/slices/connectionMethodSlice'
import MetamaskServices from 'services/MetaMask'
import WalletConnectServices from 'services/WalletConnect'
import styled from 'styled-components'
import images from 'common/images'

const WalletConnectModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 15px;
`

const Title = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  text-align: center;
  color: #000000;
`

const Line = styled.div`
  width: 100%;
  border: 1px solid rgba(6, 25, 39, 0.1);
`

const Metamask = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 150px;
`

const WalletConnect = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 150px;
`

const SubTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: rgba(6, 25, 39, 0.5);
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

const WalletConnectModal = () => {
  const dispatch = useDispatch()
  const { closeModal, openModal } = useModal()
  const onConnectMetamask = () => {
    dispatch(setConnectionMethod(CONNECTION_METHOD.METAMASK))
    closeModal()
    MetamaskServices.initialize()
  }

  const onConnectWalletConnect = () => {
    dispatch(setConnectionMethod(CONNECTION_METHOD.WALLET_CONNECT))
    closeModal()
    WalletConnectServices.initialize()
  }

  return (
    <WalletConnectModalContainer>
      <Metamask onClick={onConnectMetamask}>
        <Image width={70} height={70} cursor='pointer' radius='unset' src={images.wallet.metamask} />
        <Title>Metamask</Title>
      </Metamask>
      <Line />
      <WalletConnect>
        <Image width={70} height={70} radius='unset' src={images.wallet.walletConnect} />
        <Title>Wallet connect</Title>
        <SubTitle>Select version to connect</SubTitle>
        <ButtonContainer>
          <PrimaryButton onClick={onConnectWalletConnect} width='75px'>
            V1
          </PrimaryButton>
          <PrimaryButton
            onClick={() =>
              openModal({
                content: <ChooseChainWalletV2Modal />,
                header: true,
                width: '350px',
                radius: '10px',
              })
            }
            width='75px'
          >
            V2
          </PrimaryButton>
        </ButtonContainer>
      </WalletConnect>
    </WalletConnectModalContainer>
  )
}

export default WalletConnectModal
