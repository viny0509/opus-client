import useTranslate from 'hooks/useTranslate'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #828282;
`

const NoData = () => {
  const { translate } = useTranslate()

  return <Container>{translate('noData')}</Container>
}

export default NoData
