/* eslint-disable no-irregular-whitespace */
import images from 'common/images'
import PageWrapper from 'components/PageWrapper'
import PrimaryButton from 'components/PrimaryButton'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #121212;
  height: 100%;
`

const PageTitle = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: rgba(255, 255, 255, 0.87);
`

const NFTInfoContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 50px;
`

const NFTImageContainer = styled.div`
  width: 100%;
  max-width: 40%;
  display: flex;
  justify-content: center;
`

const NFTImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 40px;
`

const NFTInfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const SubText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.87);
`

const Text = styled.div`
  font-weight: 600;
  font-size: 40px;
  line-height: 55px;
  color: #ffffff;
`

const PriceContainer = styled.div`
  background: #212121;
  border: 1px solid #ff571f;
  background: #212121;
  border-radius: 25px;
  padding: 30px;
`

const PriceTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
`

const Price = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  font-weight: 600;
  font-size: 36px;
  line-height: 49px;
  color: #ff571f;
  span {
    font-size: 28px;
    line-height: 40px;
  }
`

const PriceKRW = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.6);
`

const NFT = () => {
  return (
    <Container>
      <PageWrapper>
        <PageTitle>NFT</PageTitle>
        <NFTInfoContainer className='MT40'>
          <NFTImageContainer>
            <NFTImage src={images.nftImage} />
          </NFTImageContainer>
          <NFTInfoWrapper>
            <SubText>Membership</SubText>
            <Text>
              The N Resort <br /> Exclusive Membership <br /> (2023)
            </Text>
            <PriceContainer className='MT30'>
              <PriceTitle>NFT Price</PriceTitle>
              <Price>
                7.00 <span className='ML5'>AVAX</span> <PriceKRW className='MB5 ML20'>(=134,259.58 KRW)</PriceKRW>
              </Price>
            </PriceContainer>
            <PrimaryButton className='MT20' fullWidth size='large'>
              Buy now
            </PrimaryButton>
          </NFTInfoWrapper>
        </NFTInfoContainer>
      </PageWrapper>
    </Container>
  )
}

export default NFT
