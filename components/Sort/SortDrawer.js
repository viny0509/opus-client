import images from 'common/images'
import Image from 'components/Image'
import useDrawer from 'hooks/useDrawer'
import useSort from 'hooks/useSort'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`

const Item = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
  padding: 0px 20px;
  &:hover {
    background: #f2f2f2;
  }
  ${(props) =>
    props.$active &&
    css`
      background: #f2f2f2;
    `}
  img {
    height: 30px;
  }
`

const ImageContainer = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
`

const SortDrawer = ({ options = [] }) => {
  const router = useRouter()
  const { sort } = useSort()
  const { closeDrawer } = useDrawer()

  const changeQueryParam = (key, value) => {
    const query = { ...router.query, [key]: value }
    if (!value) {
      delete query[key]
    }
    router.replace({
      query,
    })
  }

  const handleChangeSort = (value) => {
    changeQueryParam('sort', value)
    closeDrawer()
  }
  return (
    <Container className='MT25'>
      {options.length > 0 &&
        options.map((option) => (
          <Item key={option.key} $active={sort === option.key} onClick={() => handleChangeSort(option.key)}>
            <ImageContainer>{option?.icon ? option?.icon : <Image width={30} height={30} src={images.sort[option?.key]} />}</ImageContainer>
            {option.title}
          </Item>
        ))}
    </Container>
  )
}

export default SortDrawer
