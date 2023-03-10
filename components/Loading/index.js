import Lottie from 'react-lottie'
import styled from 'styled-components'
import json from './../../static/lottie/loading.json'

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loading = ({ width = 150, height = 150, $withContainer = false }) => {
  if ($withContainer) {
    return (
      <LoadingContainer>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: json,
          }}
          width={width}
          height={height}
        />
      </LoadingContainer>
    )
  }

  return (
    <div>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: json,
        }}
        width={width}
        height={height}
      />
    </div>
  )
}

export default Loading
