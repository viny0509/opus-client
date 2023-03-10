import { Select } from 'antd'
import images from 'common/images'
import Image from 'components/Image'
import Responsive from 'components/Responsive'
import useDrawer from 'hooks/useDrawer'
import useSort from 'hooks/useSort'
import useTranslate from 'hooks/useTranslate'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import SortDrawer from './SortDrawer'
import './style.scss'

const Container = styled.div`
  width: 100%;
  height: 40px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
  gap: 10px;
`

const CustomSelect = styled(Select)`
  width: 100%;
  height: 40px;
  background: #ffffff;
  .ant-select-selector {
    height: 40px !important;
    padding: 0px 15px !important;
    border-radius: 25px;
  }
  .ant-select-selection-item {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }
  .ant-select-arrow {
    margin-right: 5px;
  }
`

const CustomOption = styled(Select.Option)``

/**
 *
 * @param {{ options: { key: string, title?: string, icon?: string }[] }} props
 * @returns
 */
const Sort = ({ options = [] }) => {
  const { openDrawer } = useDrawer()
  const { name, sort } = useSort()
  const { translate } = useTranslate()
  const router = useRouter()

  const changeQueryParam = (key, value) => {
    const query = { ...router.query, [key]: value }
    if (!value) {
      delete query[key]
    }
    router.replace({
      query,
    })
  }

  return (
    <Responsive
      mobile={
        <Container
          onClick={() =>
            openDrawer({
              content: <SortDrawer options={options} />,
              noPadding: true,
            })
          }
        >
          {translate(name)}
          <Image src={images.icDropdown} width={10} height={10} />
        </Container>
      }
      desktop={
        <CustomSelect
          value={sort}
          onChange={(v) => changeQueryParam('sort', v)}
          popupClassName='sort-select-dropdown'
          suffixIcon={<Image src={images.icDropdown} width={10} />}
        >
          {options.map((item) => (
            <CustomOption key={item?.key}>{item?.title}</CustomOption>
          ))}
        </CustomSelect>
      }
    />
  )
}

export default Sort
