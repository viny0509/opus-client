import { Select as SelectAntd } from 'antd'
import images from 'common/images'
import Image from 'components/Image'
import useTranslate from 'hooks/useTranslate'
import styled from 'styled-components'
import './style.scss'

const CustomSelect = styled(SelectAntd)`
  height: 70px;
  background: #ffffff;
  border-radius: 15px;
  .ant-select-selector {
    height: 70px !important;
    background: #ffffff;
    border-radius: 15px;
  }
`

const ItemContainer = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 150%;
  color: #000000;
`

const Count = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
  color: #828282;
`

const TabFilter = () => {
  const { translate } = useTranslate()
  return (
    <CustomSelect suffixIcon={<Image src={images.icDropdown} width={10} />} defaultValue='all' popupClassName='tab-filter-dropdown'>
      <CustomSelect.Option value='all'>
        <ItemContainer>
          <Image src={images.icAll} />
          <Item>
            <Title>{translate('filter.allCategory')}</Title>
            <Count>{translate('filter.countItems', { count: 1 })}</Count>
          </Item>
        </ItemContainer>
      </CustomSelect.Option>
      <CustomSelect.Option value='1'>
        <ItemContainer>
          <Image src={images.icAll} />
          <Item>
            <Title>{translate('filter.allCategory')}</Title>
            <Count>{translate('filter.countItems', { count: 1 })}</Count>
          </Item>
        </ItemContainer>
      </CustomSelect.Option>
      <CustomSelect.Option value='2'>
        <ItemContainer>
          <Image src={images.icAll} />
          <Item>
            <Title>{translate('filter.allCategory')}</Title>
            <Count>{translate('filter.countItems', { count: 1 })}</Count>
          </Item>
        </ItemContainer>
      </CustomSelect.Option>
    </CustomSelect>
  )
}

export default TabFilter

// import { Select as SelectAntd } from 'antd'
// import images from 'common/images'
// import Image from 'components/Image'
// import styled from 'styled-components'
// import './style.scss'

// const CustomSelect = styled(SelectAntd)`
//   height: 70px;
//   background: #ffffff;
//   border-radius: 15px;
//   border: none;
//   .ant-select-selector {
//     height: 70px !important;
//     background: #ffffff;
//     border-radius: 15px;
//     border: none !important;
//   }
// `

// const ItemContainer = styled.div`
//   height: 70px;
//   display: flex;
//   align-items: center;
//   gap: 20px;
//   padding: 20px;
// `

// const Item = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
// `

// const Title = styled.div`
//   font-weight: 600;
//   font-size: 15px;
//   line-height: 150%;
//   color: #000000;
// `

// const Count = styled.div`
//   font-weight: 500;
//   font-size: 13px;
//   line-height: 150%;
//   color: #828282;
// `

// const TabFilter = ({ value, options = [], onChange }) => {
//   return (
//     <CustomSelect
//       onChange={(v) => onChange && onChange(v)}
//       suffixIcon={<Image src={images.icDropdown} width={10} />}
//       value={value}
//       popupClassName='tab-filter-dropdown'
//     >
//       {options.map((option) => (
//         <CustomSelect.Option key={option.value} value={option.value}>
//           <ItemContainer>
//             {option.icon && <Image width={22} height={22} src={option.icon} />}
//             <Item>
//               <Title>{option.title}</Title>
//               {option.count && <Count>{option.count}</Count>}
//             </Item>
//           </ItemContainer>
//         </CustomSelect.Option>
//       ))}
//     </CustomSelect>
//   )
// }

// export default TabFilter
