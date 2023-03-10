import React, { useState, useEffect } from 'react'
import { Affix } from 'antd'
import styled from 'styled-components'

const CustomAffix = styled(Affix)`
  transition: all 0.3s ease-in-out;
`

const Wrapper = styled.div`
  position: relative;
  background: ${(props) => (props.affixVisible ? '#fff' : 'transparent')};
  height: 34px;
  padding-top: 7px;
`

const AffixTabs = ({ children }) => {
  const [affixVisible, setAffixVisible] = useState(false)

  const handleScroll = () => {}

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [affixVisible])

  return (
    <CustomAffix offsetTop={0} onChange={(affixed) => setAffixVisible(affixed)}>
      <Wrapper affixVisible={affixVisible}>{children}</Wrapper>
    </CustomAffix>
  )
}

export default AffixTabs
