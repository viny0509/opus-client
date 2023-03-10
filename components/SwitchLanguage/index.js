import { Popover } from 'antd'
import images from 'common/images'
import Image from 'components/Image'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from 'redux/slices/languageSlice'
import styled, { css } from 'styled-components'
import './style.scss'

const Container = styled.div`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const SwitchLanguageOverlayContainer = styled.div`
  min-width: 150px;
  display: flex;
  flex-direction: column;
`

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  gap: 12px;
  cursor: pointer;
  &:hover {
    background: rgba(6, 25, 39, 0.05);
  }
  ${(props) =>
    props.$active &&
    css`
      background: rgba(6, 25, 39, 0.05);
    `}
`

const SwitchLanguage = ({ ...rest }) => {
  const [open, setOpen] = useState(false)
  const { language } = useSelector((state) => state)
  const settingLanguage = useSelector((state) => state.settingRedux.language)
  return (
    <Popover
      placement={isMobile ? 'topRight' : 'bottomRight'}
      open={open}
      onOpenChange={(v) => setOpen(v)}
      overlayClassName='switch-language-overlay'
      trigger='click'
      showArrow={false}
      content={<SwitchLanguageOverlay onClose={() => setOpen(false)} />}
      {...rest}
    >
      <Container>
        <Image height={25} width={25} src={settingLanguage[language]?.icon} />
        <Image width={8} src={images.icUpArrow} />
      </Container>
    </Popover>
  )
}

const SwitchLanguageOverlay = ({ onClose }) => {
  const dispatch = useDispatch()
  const { language } = useSelector((state) => state)
  const settingLanguage = useSelector((state) => state.settingRedux.language)
  const handleClick = async (key) => {
    onClose && onClose()
    dispatch(setLanguage(key))
  }

  return (
    <SwitchLanguageOverlayContainer>
      {Object.keys(settingLanguage).map((key) => (
        <Option key={key} $active={key === language} onClick={() => handleClick(key)}>
          <Image src={settingLanguage[key]?.icon} width={25} height={25} />
          {settingLanguage[key]?.name}
        </Option>
      ))}
    </SwitchLanguageOverlayContainer>
  )
}

export default SwitchLanguage
