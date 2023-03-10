import { Form, Select as SelectAntd } from 'antd'
import images from 'common/images'
import Image from 'components/Image'
import { useState } from 'react'
import styled from 'styled-components'
import './style.scss'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  margin-bottom: ${(props) => (props.hasSub ? '0px' : '8px')};
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #828282;
  span {
    color: red;
  }
`
const Error = styled.div`
  color: red;
`

const CustomFormItem = styled(Form.Item)`
  margin: 0;
  width: 100%;
`

const CustomSelect = styled(SelectAntd)`
  background: #ffffff;
  border-radius: 25px;
  height: 50px;
  .ant-select-selector {
    background: #ffffff;
    border-radius: 25px;
    height: 50px !important;
    padding: 0px 20px;
    display: flex;
    align-items: center;
  }
  .ant-select-selection-item {
    padding: 0px 10px !important;
    &::after {
      display: none !important;
    }
  }
  .ant-select-arrow {
    margin-right: 10px;
  }
`

export const SelectInput = ({ disabled, options = [], onBlur, ...rest }) => {
  return (
    <CustomSelect
      onBlur={() => onBlur && onBlur()}
      disabled={disabled}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      popupClassName='select-input-custom-popup'
      suffixIcon={disabled ? <></> : <Image src={images.icDropdown} width={10} />}
      {...rest}
    >
      {options.map((option) => (
        <SelectAntd.Option key={option.value} value={option.value}>
          {option.component}
        </SelectAntd.Option>
      ))}
    </CustomSelect>
  )
}

const SelectFormField = ({
  name,
  label = null,
  subLabel = null,
  required = false,
  options = [],
  disabled,
  error = null,
  className = '',
  background = '#f2f2f2',
  ...rest
}) => {
  const [blur, setBlur] = useState(false)
  return (
    <Container className={className}>
      {label && (
        <Label hasSub={!!subLabel}>
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      {subLabel && <Label>{subLabel}</Label>}
      <CustomFormItem name={name}>
        <SelectInput onBlur={() => setBlur(true)} options={options} disabled={disabled} background={background} {...rest} />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export default SelectFormField
