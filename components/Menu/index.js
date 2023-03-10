import StoreImage from 'components/StoreImage'
import TextMore from 'components/TextMore'
import { STORE_IMAGE_SIZE } from 'constants/UI'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  gap: 20px;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Price = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  line-height: 150%;
  color: #000000;
  text-align: center;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 150%;
  align-items: center;
  color: #000000;
`

const Menu = () => {
  return (
    <Container>
      <ImageContainer>
        <StoreImage width={`${STORE_IMAGE_SIZE}px`} />
        <Price>100 USD</Price>
      </ImageContainer>
      <TitleContainer>
        <Title>Special Choice Tajima</Title>
        <TextMore fontSize='13px' height='100px'>
          Amuse Assorted seared Tajima Beef Oxtail Soup Special Choice Tajima Beef Steak Grilled vegetables Season Salad se Assorted seared Tajima Beef Oxtail
          Soup Special Choice Tajima Beef Steak Grilled vegetables Season Salad ef Oxtail Soup Special Choice Tajima Beef Steak Grilled vegetables Season Salad
          se Assorted seared Tajima Beef Oxtail Soup Special Choice Tajima Beef Steak Grilled vegetables Season Salad eak Grilled vegetables Season Salad ef
          Oxtail Soup Special Choice Tajima Beef Steak Grilled vegetables Season Salad se Assorted seared Tajima Beef Oxtail Soup Special Choice Tajima Beef
          Steak Grilled vegetables Season Salad
        </TextMore>
      </TitleContainer>
    </Container>
  )
}

export default Menu
