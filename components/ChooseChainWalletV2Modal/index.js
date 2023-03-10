import useModal from 'hooks/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { setConnectedChain } from 'redux/slices/connectedChainSlice'
import { setWalletConnectV2 } from 'redux/slices/walletConnectV2Slice'
import WalletConnectV2Services from 'services/WalletConnectV2'
import styled, { css } from 'styled-components'
import images from 'common/images'
import ReduxService from 'common/redux'
import Image from '../Image'
import PrimaryButton from '../PrimaryButton'
import { useSettingRedux } from 'hooks/useRedux'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 15px 25px 15px;
`

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

const Title = styled.div`
  margin-top: 4px;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  color: #00a3ff;
`

const SubTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #000000;
`

const SelectChainTitle = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  text-transform: uppercase;
  color: #828282;
`

const ChainOptions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ChainOption = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  gap: 10px;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  border-radius: 10px;
  color: #000000;

  border: 1px solid rgba(20, 22, 60, 0.1);

  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      color: #00cdff;
      background: linear-gradient(90deg, rgba(43, 229, 224, 0.1) 0%, rgba(88, 124, 221, 0.1) 100%);
      border: 1px solid #00cdff;
    `}
  @media screen and (min-width: 769px) {
    &:hover {
      color: #00cdff;
      background: linear-gradient(90deg, rgba(43, 229, 224, 0.1) 0%, rgba(88, 124, 221, 0.1) 100%);
      border: 1px solid #00cdff;
    }
  }
`

const ButtonContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
`

const ChooseChainWalletV2Modal = () => {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const chainList = useSelector((state) => state.walletConnectV2.chainListWillConnect) || []
  const settingRedux = useSettingRedux()
  const handleClick = (chainId) => {
    let chainListClone = [...chainList]
    const indexOf = chainListClone.indexOf(chainId)
    if (indexOf > -1) {
      chainListClone.splice(indexOf, 1)
    } else {
      chainListClone = [...chainListClone, chainId]
    }
    dispatch(
      setWalletConnectV2({
        chainListWillConnect: chainListClone,
      })
    )
    if (chainListClone.length > 0 && !chainListClone.includes(ReduxService.getChainConnected())) {
      dispatch(setConnectedChain(chainListClone[0]))
    }
  }

  return (
    <Container>
      <TitleContainer>
        <Image width='30px' height='20px' src={images.icWallet} />
        <Title>WalletConnect</Title>
      </TitleContainer>
      <SubTitle className='MT10'>Using v2.0.0</SubTitle>
      <SelectChainTitle className='MT20'>SELECT CHAINS</SelectChainTitle>
      <ChainOptions className='MT10'>
        {settingRedux?.chains?.map((item) => (
          <ChainOption onClick={() => handleClick(item?.chainId)} active={chainList.includes(item?.chainId)} key={item?.chainId}>
            <Image width='30px' height='30px' radius='50%' src={item?.logo} />
            {item?.name}
          </ChainOption>
        ))}
      </ChainOptions>
      <ButtonContainer>
        <PrimaryButton
          disabled={chainList?.length === 0}
          onClick={() => {
            closeModal()
            WalletConnectV2Services.connect()
          }}
          fullWidth
        >
          Connect
        </PrimaryButton>
      </ButtonContainer>
    </Container>
  )
}

export default ChooseChainWalletV2Modal
