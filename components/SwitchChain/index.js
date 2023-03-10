import { Popover } from 'antd'
import Image from 'components/Image'
import { CONNECTION_METHOD } from 'constants/web3'
import useChainConnected from 'hooks/useChainConnected'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import images from 'common/images'
import ReduxService from 'common/redux'
import Media from 'react-media'
import './style.scss'
import useAuth from 'hooks/useAuth'
import Responsive from 'components/Responsive'
import useDrawer from 'hooks/useDrawer'
import SwitchChainDrawer from './SwitchChainDrawer'

const Container = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const Content = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SwitchChainOverlayContainer = styled.div`
  min-width: 200px;
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
`

const CustomPopover = styled(Popover)`
  .ant-popover-inner {
    padding: 0px !important;
  }
`

const SwitchChain = () => {
  const { chainId } = useChainConnected()
  const [open, setOpen] = useState(false)
  const { openDrawer } = useDrawer()

  const chain = useMemo(() => {
    return ReduxService.getChain(chainId)
  }, [chainId])

  return (
    <Responsive
      desktop={
        <CustomPopover
          placement='bottom'
          open={open}
          onOpenChange={(v) => setOpen(v)}
          overlayClassName='switch-chain-overlay'
          trigger='click'
          showArrow={false}
          content={<SwitchChainOverlay onClose={() => setOpen(false)} />}
        >
          <Container>
            <Image height={25} width={25} src={chain?.logo} />
            <Media
              queries={{
                large: '(min-width: 769px)',
              }}
            >
              {(matches) => matches.large && <Content>{chain?.name}</Content>}
            </Media>
            <Image width={8} src={images.icDropdownSelectChain} />
          </Container>
        </CustomPopover>
      }
      mobile={
        <Container
          onClick={() =>
            openDrawer({
              content: <SwitchChainDrawer />,
              noPadding: true,
            })
          }
        >
          <Image height={25} width={25} src={chain?.logo} />
          <Media
            queries={{
              large: '(min-width: 769px)',
            }}
          >
            {(matches) => matches.large && <Content>{chain?.name}</Content>}
          </Media>
          <Image width={8} src={images.icDropdownSelectChain} />
        </Container>
      }
    />
  )
}

const SwitchChainOverlay = ({ onClose }) => {
  const { connectionMethod, walletConnectV2, settingRedux } = useSelector((state) => state)
  const { chainId } = useChainConnected()
  const { isSigned } = useAuth()
  const handleClick = async (id) => {
    onClose && onClose()
    await ReduxService.switchChain(id)
  }

  return (
    <SwitchChainOverlayContainer>
      {connectionMethod === CONNECTION_METHOD.WALLET_CONNECT_V2
        ? walletConnectV2.chainIds.map((id) => {
            const chain = ReduxService.getChain(id)
            return (
              <Option key={id} $active={chainId === id} onClick={() => handleClick(id)}>
                <Chain>
                  <Image width={24} height={24} src={chain?.logo} />
                  {chain?.name}
                </Chain>
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
    </SwitchChainOverlayContainer>
  )
}

export default SwitchChain
