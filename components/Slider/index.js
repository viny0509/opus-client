import useRealtimeValue from '@dapp-builder/use-realtime-value'
import images from 'common/images'
import Image from 'components/Image'
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 80% !important;
  height: ${(props) => props.rangeSize};
  margin: 0 auto;
  max-width: 500px;
  display: flex;
  align-items: center;
  background: #fefbff;
`

const Range = styled.div`
  position: absolute;
  height: ${(props) => props.rangeSize};
  background: #fefbff;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: #f5545e;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Thumb = styled.div`
  position: absolute;
  width: ${(props) => props.thumbSize};
  height: ${(props) => props.thumbSize};
  border-radius: 50%;
  background: linear-gradient(180deg, #fefefe 0%, #f4f4f4 100%);
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const CustomIcon = styled(Image)`
  user-select: none;
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

const Slider = forwardRef(({ from = 0, to = 100, defaultValue = 0, onChange, thumbSize = '70px', rangeSize = '45px' }, ref) => {
  const range = useMemo(() => {
    return [from, to]
  }, [from, to])
  const [data, setData] = useState(defaultValue)
  const dataInstance = useRealtimeValue(data)

  useImperativeHandle(
    ref,
    () => {
      return {
        resetValue: () => {
          setData(from)
          onChange && onChange(from)
        },
      }
    },
    []
  )

  const [dragging, setDragging] = useState(false)
  const sliderRef = useRef()

  function handleMouseMove(event) {
    if (dragging) {
      const slider = sliderRef.current
      const rect = slider.getBoundingClientRect()
      const offsetX = event.clientX - rect.left
      const percentage = (offsetX / slider.offsetWidth) * 100
      let result = 0
      if (percentage < range[0]) {
        result = range[0]
      } else if (percentage > range[1]) {
        result = range[1]
      } else {
        result = percentage
      }
      setData(result)
      onChange && onChange(result)
    }
  }

  function handleTouchMove(event) {
    if (dragging) {
      const slider = event.currentTarget
      const rect = slider.getBoundingClientRect()
      const touchX = event.touches[0].clientX - rect.left
      const percentage = (touchX / slider.offsetWidth) * 100
      let result = 0
      if (percentage < range[0]) {
        result = range[0]
      } else if (percentage > range[1]) {
        result = range[1]
      } else {
        result = percentage
      }
      setData(result)
      onChange && onChange(result)
    }
  }

  useEffect(() => {
    const onEnd = () => {
      onChange && onChange(dataInstance.getValue())
      setDragging(false)
    }

    document.addEventListener('mouseup', onEnd)
    document.addEventListener('touchend', onEnd)
    return () => {
      document.removeEventListener('mouseup', onEnd)
      document.removeEventListener('touchend', onEnd)
    }
  }, [])

  return (
    <Container rangeSize={rangeSize} ref={sliderRef}>
      <Range rangeSize={rangeSize} style={{ left: `${range[0]}%`, width: `${range[1] - range[0]}%` }}>
        Drag this slider to the right
      </Range>
      <Thumb
        thumbSize={thumbSize}
        onMouseDown={() => setDragging(true)}
        onMouseLeave={() => setDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{ left: `${data}%` }}
      >
        <CustomIcon width={30} height={26} cursor='pointer' src={images.icSlider} />
      </Thumb>
    </Container>
  )
})

export default Slider
