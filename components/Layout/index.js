import ConnectWalletDrawer from 'components/ConnectWalletDrawer'
import { useMemo } from 'react'
import styled from 'styled-components'
import Header from './Components/Header'

const MainLayoutContainer = styled.div`
  min-height: ${(props) => props.height};
  min-width: 100vw;
  display: flex;
  background: #121212;
  background-size: cover;
`

const Wrapper = styled.div`
  min-height: ${(props) => props.height};
  flex: 1;
  max-width: ${(props) => (props.sidebar ? 'calc(100vw - 250px)' : '100vw')};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Body = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow-y: scroll !important;
  &::-webkit-scrollbar {
    display: none;
  }
  box-sizing: border-box;
  -ms-overflow-style: none;
  scrollbar-width: none;
  min-height: ${(props) => props.minDesktop || 'calc(100vh - 70px)'};
  @media screen and (max-width: 768px) {
    min-height: ${(props) => props.minMobile || 'calc(100vh - 120px)'};
  }
`

const Layout = ({ children, headerMobile = true, headerDesktop = true, footerMobile = true, footerDesktop = true }) => {
  const minHeightBodyDesktop = useMemo(() => {
    let total = 0
    if (headerDesktop) {
      total += 60
    }
    if (footerDesktop) {
      total += 0
    }

    return `calc(100vh - ${total}px)`
  }, [headerDesktop, footerDesktop])

  const minHeightBodyMobile = useMemo(() => {
    let total = 0
    if (headerMobile) {
      total += 60
    }
    if (footerMobile) {
      total += 0
    }

    return `${window.innerHeight - total}px`
  }, [headerMobile, footerMobile])

  return (
    <MainLayoutContainer height={`${window.innerHeight}px`}>
      <Wrapper>
        <Header mobile={headerMobile} desktop={headerDesktop} />
        <Body minDesktop={minHeightBodyDesktop} minMobile={minHeightBodyMobile}>
          {children}
        </Body>
      </Wrapper>
      <ConnectWalletDrawer />
    </MainLayoutContainer>
  )
}

export default Layout
