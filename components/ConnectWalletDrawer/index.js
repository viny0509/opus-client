import { Drawer } from 'antd'
// import ChooseChainWalletV2Modal from 'components/ChooseChainWalletV2Modal'
import { CONNECTION_METHOD, OBSERVER_KEY } from 'constants/web3'
import { useEffect, useState } from 'react'
import WalletConnectServices from 'services/WalletConnect'
import styled from 'styled-components'
import images from 'common/images'
import Observer from 'common/observer'
import ReduxService from 'common/redux'
import Image from '../Image'
import './style.scss'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  color: #061927;
`

const Intro = styled.div`
  padding: 15px 20px;
  background: #f2f2f2;
  border-radius: 10px;
  font-weight: 400;
  font-size: 13px;
  line-height: 150%;
  color: #828282;
  span {
    color: #c6171c;
  }
`

const ListItem = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Item = styled.div`
  padding: 15px 20px;
  background: #f2f2f2;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const Name = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  span {
    font-weight: 400;
    font-size: 13px;
    line-height: 19.5px;
  }
`

const ConnectWalletDrawer = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const openDrawer = () => setOpen(true)
    Observer.on(OBSERVER_KEY.SIGN_IN_DRAWER, openDrawer)
    return () => Observer.removeListener(OBSERVER_KEY.SIGN_IN_DRAWER, openDrawer)
  }, [])

  const onConnectWalletConnect = () => {
    ReduxService.setConnectionMethod(CONNECTION_METHOD.WALLET_CONNECT)
    setOpen(false)
    WalletConnectServices.initialize()
  }

  const onConnectKeyring = async () => {
    ReduxService.setConnectionMethod(CONNECTION_METHOD.WALLET_CONNECT)
    const deeplink = await WalletConnectServices.initializeMobileDeeplink()
    if (deeplink && deeplink.uri) {
      window.location.href = `https://keyring.app/wc?uri=${deeplink.uri}`
    }
    setOpen(false)
  }

  return (
    <Drawer className='drawer-connect' placement='bottom' closable={false} onClose={() => setOpen(false)} open={open}>
      <Container>
        <Header>
          <Title>Connect to a wallet</Title>
          <Image src={images.icClose} onClick={() => setOpen(false)} cursor='pointer' />
        </Header>
        <Intro className='MT15'>
          By connecting a wallet, you agree to {`Star Token`} <span>Terms of Service</span> and consent to its <span>Privacy Policy</span>
        </Intro>
        <ListItem>
          <Item
            onClick={onConnectKeyring}
            // onClick={() => {
            //   setOpen(false)
            //   openModal({
            //     content: <ChooseChainWalletV2Modal />,
            //     header: true,
            //     width: '350px',
            //     radius: '10px',
            //   })
            // }}
          >
            <Name>
              KEYRING PRO
              {/* <span>(WalletConnect V2)</span> */}
            </Name>
            <Image src={images.icKeyring} />
          </Item>
          <Item onClick={onConnectWalletConnect}>
            <Name>WalletConnect</Name>
            <Image src={images.icWallet} />
          </Item>
        </ListItem>
      </Container>
    </Drawer>
  )
}

export default ConnectWalletDrawer
