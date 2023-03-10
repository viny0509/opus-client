import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  /* margin-top: 4px; */
`

const ButtonShow = styled.div`
  color: #f5545e;
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
  margin-left: 4px;
  cursor: pointer;
`

const Text = styled.div`
  font-size: 14px;
  display: inline;
  transition: all 0.3s ease-in-out;
  font-weight: ${(props) => (props.weight ? '500' : 'normal')};
`

function truncateText(text, limitText) {
  if (text.length <= limitText) {
    return text
  }
  return text.substr(0, limitText) + '...'
}
const TextWidthToggle = ({ text, limit, weight }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const textTruncate = truncateText(text, limit)

  return (
    <Container>
      <Text weight={weight}>{isExpanded ? text : textTruncate}</Text>
      {text?.length > limit && <ButtonShow onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? `Less` : `More`}</ButtonShow>}
    </Container>
  )
}

export default TextWidthToggle
