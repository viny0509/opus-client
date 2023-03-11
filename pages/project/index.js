import images from 'common/images'
import PageWrapper from 'components/PageWrapper'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #121212;
  height: 100%;
  padding-bottom: 80px;
`

const PageTitle = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: rgba(255, 255, 255, 0.87);
`

const Row = styled.div`
  width: 100%;
  gap: 25px;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
`

const ItemContainer = styled.div`
  width: 100%;
  max-width: ${(props) => props.width || '100%'};
  min-height: ${(props) => props.minHeight || 'unset'};
  background: ${(props) => props.background || '#FFF5BF'};
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 25px;
  padding: 30px;
`

const SubText = styled.div`
  width: 100%;
  text-align: ${(props) => props.align || 'left'};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
`

const Text = styled.div`
  width: 100%;
  text-align: ${(props) => props.align || 'left'};
  font-weight: 600;
  font-size: 40px;
  line-height: 55px;
  color: #000000;
`

const Marketplace = () => {
  return (
    <Container>
      <PageWrapper>
        <PageTitle className='MT40'>Project</PageTitle>
        <Row className='MT40'>
          <ItemContainer width='calc(50% - 25px / 2)'>
            <SubText>Currently avaialbe </SubText>
            <Text>NFT Membership</Text>
            <SubText>
              Have a hotel and resort membership with NFT easy. Take advantage of the membership NFT at a lower price than your existing membership.
            </SubText>
            <img src={images.project.nftMember} />
          </ItemContainer>
          <ItemContainer background='#D0FACC' width='calc(50% - 25px / 2)'>
            <SubText>Currently avaialbe </SubText>
            <Text>Buy with Crypto</Text>
            <SubText>
              With crypto, you can purchase real assets including hotel and resort memberships. Enjoy the amazing scenery and exciting leisure sports in
              Yangyang, Gangwon-do.
            </SubText>
            <img src={images.project.buyWithCrypto} />
          </ItemContainer>
        </Row>
        <Row className='MT25'>
          <ItemContainer background='#CEF6FE'>
            <SubText align='center'>Our Mission</SubText>
            <Text align='center'>The easiest, fastest, and most fun way to trade Real World Asseets with NFTs.</Text>
          </ItemContainer>
        </Row>
        <Row className='MT25'>
          <ItemContainer background='#C1C2F5' width='calc(50% - 25px / 2)'>
            <SubText>Coming Up Next</SubText>
            <Text>NFT Lucky Box</Text>
            <SubText>
              After a purchase, we will provide you with additional benefits through the NFT lucky box that is drawn at random. Like playing a game, it is fun!
            </SubText>
            <img src={images.project.nftMember} />
          </ItemContainer>
          <ItemContainer background='#FFCCEE' width='calc(50% - 25px / 2)'>
            <SubText>Coming Up Next</SubText>
            <Text>NFT Revive</Text>
            <SubText>
              Don’t worry about the NFT that expired. With the NFT revive function, even an old NFT can be revieved once again! Using the revive function, test
              the odds of extending the expiration date.
            </SubText>
            <img src={images.project.buyWithCrypto} />
          </ItemContainer>
        </Row>
      </PageWrapper>
    </Container>
  )
}

export default Marketplace
