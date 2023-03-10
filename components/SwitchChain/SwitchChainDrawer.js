import images from 'common/images'
import ReduxService from 'common/redux'
import Image from 'components/Image'
import { CONNECTION_METHOD } from 'constants/web3'
import useAuth from 'hooks/useAuth'
import useChainConnected from 'hooks/useChainConnected'
import useDrawer from 'hooks/useDrawer'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  padding: 0px 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
  gap: 10px;
  cursor: pointer;
  &:first-child {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  &:last-child {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  &:hover {
    background: #fefbff;
  }
`

const Chain = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  gap: 10px;
  font-family: 'Poppins', sans-serif !important;
`

const SwitchChainDrawer = () => {
  const { connectionMethod, walletConnectV2, settingRedux } = useSelector((state) => state)
  const { chainId } = useChainConnected()
  const { isSigned } = useAuth()
  const { closeDrawer } = useDrawer()

  const handleClick = async (id) => {
    closeDrawer()
    await ReduxService.switchChain(id)
  }
  return (
    <Container className='MT25'>
      {connectionMethod === CONNECTION_METHOD.WALLET_CONNECT_V2
        ? walletConnectV2.chainIds.map((id) => {
            const chain = ReduxService.getChain(id)
            return (
              <Option key={id} $active={chainId === id} onClick={() => handleClick(id)}>
                <Chain>
                  <Image width={24} height={24} src={chain?.logo} />
                  {chain?.name}
                </Chain>
                {chainId === chain?.chainId && <Image width={10} ratio={1} src={isSigned ? images.icDotActive : images.icDot} />}
              </Option>
            )
          })
        : settingRedux?.chains.map((chain) => {
            return (
              <Option key={chain?.chainId} onClick={() => handleClick(chain?.chainId)}>
                <Chain>
                  <Image width={24} height={24} src={chain?.logo} />
                  {chain?.name}
                </Chain>
                {chainId === chain?.chainId && <Image width={10} ratio={1} src={isSigned ? images.icDotActive : images.icDot} />}
              </Option>
            )
          })}
    </Container>
  )
}

export default SwitchChainDrawer
