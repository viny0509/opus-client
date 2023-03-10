import { Z_INDEX } from 'constants/UI'
import useLockedBody from 'hooks/useLockedBody'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.background || '#ffffff'};
  z-index: ${Z_INDEX.OVERLAY};
  overflow: scroll;
  overflow-y: scroll !important;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

const MyOverlay = ({ className, children, background }) => {
  useLockedBody(true)
  return (
    <Container background={background} className={className}>
      {children}
    </Container>
  )
}

export default MyOverlay
