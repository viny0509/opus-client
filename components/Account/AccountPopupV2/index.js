import Image from 'components/Image'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import images from 'common/images'
import ReduxService from 'common/redux'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  @media screen and (min-width: 769px) {
    min-width: 430px;
  }
  width: 100%;
  max-width: 100%;
`

const Title = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  text-transform: uppercase;
  color: #828282;
  padding: 0px 30px;
  margin-bottom: 15px;
`

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  cursor: pointer;
`

const Address = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Disconnect = styled.div`
  width: 100%;
  padding: 0px 30px;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #eb5757;
`

const Line = styled.div`
  width: 100%;
  border: 1px solid rgba(130, 130, 130, 0.1);
`

const AccountPopupV2 = ({ onClose }) => {
  const { walletConnectV2, chainConnected } = useSelector((state) => state)
  return (
    <Container>
      <Title>Your Address</Title>
      <Line />
      {walletConnectV2?.chainIds?.map((chainId) => {
        const chain = ReduxService.getChain(chainId)
        return (
          <Fragment key={chainId}>
            <AddressContainer
              onClick={async () => {
                await ReduxService.switchChain(chainId)
                onClose && onClose()
              }}
            >
              <Image cursor='pointer' src={chainId === chainConnected ? images.icCheckActive : images.icCheck} />
              <Image width={25} height={25} src={chain?.logo} />
              <Address>{walletConnectV2?.addresses?.[chainId]}</Address>
            </AddressContainer>
            <Line />
          </Fragment>
        )
      })}
      <Disconnect
        onClick={() => {
          ReduxService.logout()
          onClose && onClose()
        }}
        className='MT10'
      >
        Disconnect
      </Disconnect>
    </Container>
  )
}

export default AccountPopupV2
