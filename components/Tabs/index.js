import styled, { css } from 'styled-components'
import PageWrapper from 'components/PageWrapper'
import { useMemo } from 'react'
const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  gap: 20px;
  overflow: scroll;
  height: 40px;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 0px 15px;
  width: 100%;
  @media screen and (min-width: 769px) {
    max-width: 1050px;
    margin: 0 auto;
  }
`

const Label = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #828282;
  white-space: nowrap;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.$active &&
    css`
      font-weight: 600;
      font-size: 14px;
      line-height: 150%;
      color: #000000;
      border-bottom: 3px solid #000000;
    `}
`

const Tabs = ({ items, className = '', $withoutScreen = false, activeKey, onChange, styleLabelContainer = null, ...rest }) => {
  const item = useMemo(() => items.find((i) => i.key === activeKey), [items, activeKey])
  return (
    <Container $withoutScreen={$withoutScreen} className={className} {...rest}>
      <LabelContainer style={styleLabelContainer ?? {}}>
        {items.map((item) => (
          <Label $active={item.key === activeKey} key={item.key} onClick={() => onChange && onChange(item.key)}>
            {item.label}
          </Label>
        ))}
      </LabelContainer>
      {item && (
        <PageWrapper $withoutScreen={$withoutScreen} className='MT10'>
          {item.children}
        </PageWrapper>
      )}
    </Container>
  )
}

export default Tabs
