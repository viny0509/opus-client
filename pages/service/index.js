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

const StepByStep = styled.img`
  width: 100%;
`

const InfoBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Content = styled.ul`
  margin: 0px;
  padding-left: 30px;
`

const SubText = styled.li`
  width: 100%;
  text-align: ${(props) => props.align || 'left'};
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
`

const Text = styled.div`
  width: 100%;
  text-align: ${(props) => props.align || 'left'};
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #ffffff;
`

const Marketplace = () => {
  return (
    <Container>
      <PageWrapper>
        <PageTitle className='MT40'>Service</PageTitle>
        <StepByStep className='MT40' src={images.service.stepByStep} />
        <InfoBlock className='MT40'>
          <Text>How to connect your wallet?</Text>
          <Content>
            <SubText>You can set your wallet by clicking the button, connect wallet, located on top right corner of web page. </SubText>
            <SubText>Currently, only Metamask wallet is available at OPUS NFT </SubText>
            <SubText>We will provide more various wallet services in future.</SubText>
          </Content>
        </InfoBlock>
        <InfoBlock className='MT40'>
          <Text>How to purchase NFT?</Text>
          <Content>
            <SubText>You can set your wallet by clicking the button, connect wallet, located on top right corner of web page. </SubText>
            <SubText>Currently, only Metamask wallet is available at OPUS NFT </SubText>
            <SubText>We will provide more various wallet services in future.</SubText>
          </Content>
        </InfoBlock>
        <InfoBlock className='MT40'>
          <Text>How to apply for benefits?</Text>
          <Content>
            <SubText>You can set your wallet by clicking the button, connect wallet, located on top right corner of web page. </SubText>
            <SubText>Currently, only Metamask wallet is available at OPUS NFT </SubText>
            <SubText>We will provide more various wallet services in future.</SubText>
          </Content>
        </InfoBlock>
        <InfoBlock className='MT40'>
          <Text>Notice</Text>
          <Content>
            <SubText>You can set your wallet by clicking the button, connect wallet, located on top right corner of web page. </SubText>
            <SubText>Currently, only Metamask wallet is available at OPUS NFT </SubText>
            <SubText>We will provide more various wallet services in future.</SubText>
          </Content>
        </InfoBlock>
      </PageWrapper>
    </Container>
  )
}

export default Marketplace
