import useAuth from 'hooks/useAuth'
import styled from 'styled-components'
import { viewAddress } from 'common/function'
import ReduxService from 'common/redux'
import images from 'common/images'
import Image from 'components/Image'
import { copyToClipboard } from 'common/function'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  border-radius: 0px 0px 20px 20px !important;

  @media screen and (min-width: 769px) {
    max-width: 430px;
    border-radius: 20px;
  }
  width: 100%;
  max-width: 100%;
`

const Address = styled.div`
  width: 100%;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
  display: flex;
  gap: 4px;
  align-items: center;
  /* justify-content: space-between; */
  font-weight: 500;
`

const ViewExplorer = styled.div`
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  line-height: 150%;
  color: #f5545e;
  font-weight: 500;
`

const Disconnect = styled.div`
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  line-height: 150%;
  color: #f5545e;
  font-weight: 500;
`

const Icon = styled.div`
  cursor: pointer;

  img {
    cursor: pointer;
  }
`

const TextAddress = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
`

const AccountPopup = ({ onClose }) => {
  const { userAddress } = useAuth()
  return (
    <Container>
      {/* <Title>Your Address</Title> */}
      <Address>
        <TextAddress>{userAddress}</TextAddress>
        <Icon onClick={() => copyToClipboard(userAddress)}>
          <Image src={images.icCopy} />
        </Icon>
      </Address>
      <ViewExplorer
        onClick={() => {
          viewAddress(userAddress)
          onClose && onClose()
        }}
        className='MT10'
      >
        View Explorer
      </ViewExplorer>
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

export default AccountPopup
