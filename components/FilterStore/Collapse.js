import images from 'common/images'
import Image from 'components/Image'
import { useState } from 'react'
import styled from 'styled-components'

const CollapseContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CollapseTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

const CollapseTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #828282;
`

const CollapseButton = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Collapse = ({ title, children, defaultOpen = false, ...rest }) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <CollapseContainer {...rest}>
      <CollapseTitleWrapper onClick={() => setOpen(!open)}>
        <CollapseTitle>{title}</CollapseTitle>
        <CollapseButton>
          <Image width={10} height={10} src={open ? images.icUp : images.icDropdown} />
        </CollapseButton>
      </CollapseTitleWrapper>
      {open && children}
    </CollapseContainer>
  )
}

export default Collapse
