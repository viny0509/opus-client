import useTranslate from 'hooks/useTranslate'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Text = styled.div`
  overflow: hidden;
  height: ${(props) => (props.full ? 'auto' : 'fit-content')};
  max-height: ${(props) => (props.full ? 'unset' : props.height || '70px')};
  text-overflow: ellipsis;
  font-weight: 500;
  font-size: ${(props) => props.fontSize || '15px'};
  line-height: 150%;
  color: #000000;
  @media screen and (max-width: 768px) {
    height: auto;
  }
`

const MoreButton = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 150%;
  color: #f5545e;
  cursor: pointer;
`

const TextMore = ({ children, fontSize = '15px', height = '70px' }) => {
  const textRef = useRef()
  const [moreButton, setMoreButton] = useState(false)
  const [moreText, setMoreText] = useState(false)
  const { translate } = useTranslate()

  useEffect(() => {
    const detectButton = () => {
      if (!textRef.current || textRef.current.scrollHeight <= textRef.current.offsetHeight) {
        setMoreButton(false)
      } else {
        setMoreButton(true)
      }
    }

    detectButton()
  }, [])

  return (
    <div>
      <Text
        fontSize={fontSize}
        full={moreText}
        ref={textRef}
        height={height}
        dangerouslySetInnerHTML={{
          __html: `${children}`,
        }}
      />
      {moreButton && !moreText && <MoreButton onClick={() => setMoreText(true)}>{translate('more')}</MoreButton>}
    </div>
  )
}

export default TextMore
