import PrimaryButton from 'components/PrimaryButton'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('/banner.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
`

const SubText = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  user-select: none;
  color: #ff571f;
`

const Text = styled.div`
  margin-top: 20px;
  font-weight: 700;
  font-size: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  user-select: none;
  gap: 20px;
`

const TextWithBackground = styled.div`
  font-weight: 700;
  font-size: 40px;
  line-height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  height: 60px;
  padding: 0px 30px;
  color: #000000;
  background: #ff571f;
  border: 2px solid #ff571f;
  border-radius: 40px;
`

const TextWithOutline = styled.div`
  font-weight: 700;
  font-size: 40px;
  line-height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  height: 60px;
  padding: 0px 30px;
  color: #ffffff;
  border: 2px solid #ff571f;
  border-radius: 40px;
`

const Home = () => {
  return (
    <Container>
      <SubText>South Korea’s first membership NFT fractional investment market </SubText>
      <Text className='MT40'>
        OPUS NFT marketplace is a <TextWithBackground>CRYPTO</TextWithBackground>
      </Text>
      <Text> fintech project that connects valuable</Text>
      <Text>
        tangible and intangible <TextWithOutline>real assets </TextWithOutline>
      </Text>
      <Text>
        with <TextWithBackground>non-fungible tokens</TextWithBackground>
        <TextWithOutline>(NFT).</TextWithOutline>
      </Text>
      <PrimaryButton className='MT40' size='large'>
        Explore →
      </PrimaryButton>
    </Container>
  )
}

export default Home
