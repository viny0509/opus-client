import images from 'common/images'
import PageWrapper from 'components/PageWrapper'
import PrimaryButton from 'components/PrimaryButton'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ListItem = styled.div`
  width: 100%;
  gap: 25px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const ItemContainer = styled.div`
  width: calc(50% - 25px / 2);
  height: 250px;
  position: relative;
`

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  background: #cef6fe;
  border-radius: 40px;
  display: flex;
  justify-content: space-between;
  ${(props) =>
    props.$commingSoon &&
    css`
      filter: blur(4px);
    `}
`

const SubText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
`

const Text = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 44px;
  color: #000000;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const CommingSoon = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 48px;
  line-height: 65px;
  color: rgba(255, 255, 255, 0.6);
`

const CommingSoonContainer = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 40px;
`

const Marketplace = () => {
  const router = useRouter()
  return (
    <Container>
      <PageWrapper>
        <PageTitle className='MT40'>Marketplace</PageTitle>
        <ListItem className='MT40'>
          <ItemContainer>
            <ItemWrapper>
              <LeftContainer>
                <TopLeftContainer>
                  <SubText>Membership</SubText>
                  <Text>The N Resort</Text>
                </TopLeftContainer>
                <PrimaryButton onClick={() => router.push(`/marketplace/1`)}>Get NFTs →</PrimaryButton>
              </LeftContainer>
              <img src={images.nftSample} />
            </ItemWrapper>
          </ItemContainer>
          <ItemContainer>
            <ItemWrapper $commingSoon>
              <LeftContainer>
                <TopLeftContainer>
                  <SubText>Membership</SubText>
                  <Text>The N Resort</Text>
                </TopLeftContainer>
                <PrimaryButton>Get NFTs →</PrimaryButton>
              </LeftContainer>
              <img src={images.nftSample} />
              <CommingSoonContainer />
            </ItemWrapper>
            <CommingSoon>COMING SOON</CommingSoon>
          </ItemContainer>
          <ItemContainer>
            <ItemWrapper $commingSoon>
              <LeftContainer>
                <TopLeftContainer>
                  <SubText>Membership</SubText>
                  <Text>The N Resort</Text>
                </TopLeftContainer>
                <PrimaryButton>Get NFTs →</PrimaryButton>
              </LeftContainer>
              <img src={images.nftSample} />
              <CommingSoonContainer />
            </ItemWrapper>
            <CommingSoon>COMING SOON</CommingSoon>
          </ItemContainer>
          <ItemContainer>
            <ItemWrapper $commingSoon>
              <LeftContainer>
                <TopLeftContainer>
                  <SubText>Membership</SubText>
                  <Text>The N Resort</Text>
                </TopLeftContainer>
                <PrimaryButton>Get NFTs →</PrimaryButton>
              </LeftContainer>
              <img src={images.nftSample} />
              <CommingSoonContainer />
            </ItemWrapper>
            <CommingSoon>COMING SOON</CommingSoon>
          </ItemContainer>
        </ListItem>
      </PageWrapper>
    </Container>
  )
}

export default Marketplace
