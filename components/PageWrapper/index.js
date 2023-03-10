import styled from 'styled-components'

const PageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0px 15px;
  @media screen and (min-width: 1030px) {
    max-width: 1030px;
  }
  @media screen and (max-width: 768px) {
    padding: 0px 15px;
  }
`

export default PageWrapper
