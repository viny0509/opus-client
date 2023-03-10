import styled from 'styled-components'

const TitleContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`

const LeftSide = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-start;
`
const Content = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const RightSide = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-end;
`

const PageTitle = ({ left = null, right = null, title = '', ...rest }) => {
  return (
    <TitleContainer {...rest}>
      <LeftSide>{left}</LeftSide>
      <Content>{title}</Content>
      <RightSide>{right}</RightSide>
    </TitleContainer>
  )
}

export default PageTitle
