import { Form, Input } from 'antd'
import { useState } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Label = styled.div`
  margin-bottom: 8px;
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

const CustomInput = styled(Input)`
  height: 50px !important;
  padding: 5px 15px;
  border-radius: 25px;
  width: 100%;
  height: 35px;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  border-width: 2px;
  background: ${(props) => props.background || '#ffffff'} !important;
  color: #000000;
  input {
    padding: 0px 10px 0px 20px !important;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: #000000;
  }
  .ant-input-prefix {
    padding: 0px 5px;
  }
  .ant-input-suffix {
    padding: 0px 15px 0px 0px;
  }
  ${(props) =>
    props.$prefixBackground &&
    css`
      .ant-input-prefix {
        background: ${props.$prefixBackground};
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        padding: 10px;
        padding-right: 15px;
        padding-left: 15px;
      }
    `}
  &.ant-input-affix-wrapper {
    padding: 0px !important;
    .ant-input {
      border-radius: 25px !important;
      padding: 5px;
      padding-right: 10px;
      border-width: 2px;
    }
  }
  .ant-input-disabled {
    background: ${(props) => props.background || '#ffffff'} !important;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`

const TextFormField = ({
  name,
  label = null,
  required = false,
  type = 'text',
  disabled,
  error = null,
  className = '',
  prefix,
  min = null,
  $prefixBackground,
  suffix,
  background = '#ffffff',
  placeholder,
  ...rest
}) => {
  const [blur, setBlur] = useState(false)
  return (
    <Container className={className}>
      {label && (
        <Label>
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      <CustomFormItem name={name}>
        <CustomInput
          autoComplete='off'
          pattern={type === 'number' ? '^(0|[1-9][0-9]*)$' : undefined}
          inputMode={type === 'number' ? 'decimal' : undefined}
          prefix={prefix}
          $prefixBackground={$prefixBackground}
          suffix={suffix || <></>}
          min={min || undefined}
          background={background}
          onBlur={() => setBlur(true)}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export const TextInput = CustomInput

export default TextFormField
