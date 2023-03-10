import { Popover } from 'antd'
import Image from 'components/Image'
import { CONNECTION_METHOD } from 'constants/web3'
import useAuth from 'hooks/useAuth'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { ellipsisAddress } from 'common/function'
import AccountPopup from './AccountPopup'
import AccountPopupV2 from './AccountPopupV2'
import './style.scss'
import ReduxService from 'common/redux'
const Container = styled.div`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const Content = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Images = styled.div`
  display: flex;
  align-items: center;
`

const CustomImage = styled(Image)`
  &:not(:first-child) {
    margin-left: -8px;
  }
`

const Account = ({ customContent = null, ...rest }) => {
  const connectionMethod = useSelector((state) => state.connectionMethod)

  if (connectionMethod === CONNECTION_METHOD.WALLET_CONNECT_V2) {
    return <AccountWalletV2 customContent={customContent} {...rest} />
  }

  return <AccountNormal customContent={customContent} {...rest} />
}

const AccountNormal = ({ customContent }) => {
  const [open, setOpen] = useState(false)
  const { userAddress } = useAuth()
  return (
    <Popover
      placement='bottomRight'
      open={open}
      onOpenChange={(v) => setOpen(v)}
      overlayClassName='account-overlay'
      trigger='click'
      showArrow={false}
      content={<AccountPopup onClose={() => setOpen(false)} />}
    >
      <Container>{customContent ? customContent : <Content>{ellipsisAddress(userAddress, 4, 4)}</Content>}</Container>
    </Popover>
  )
}

const AccountWalletV2 = ({ customContent }) => {
  const { userAddress } = useAuth()
  const { chainConnected } = useSelector((state) => state)
  const [open, setOpen] = useState(false)
  const chain = useMemo(() => {
    return ReduxService.getChain(chainConnected)
  }, [chainConnected])
  return (
    <Popover
      placement='bottomRight'
      open={open}
      onOpenChange={(v) => setOpen(v)}
      overlayClassName='account-overlay'
      trigger='click'
      showArrow={false}
      content={<AccountPopupV2 onClose={() => setOpen(false)} />}
    >
      <Container>
        {customContent ? (
          customContent
        ) : (
          <>
            <Images>
              <CustomImage src={chain?.logo} />
            </Images>
            <Content>{ellipsisAddress(userAddress, 4, 4)}</Content>
          </>
        )}
      </Container>
    </Popover>
  )
}

export default Account
