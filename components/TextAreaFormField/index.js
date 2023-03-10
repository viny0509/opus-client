import { Form, Input } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

const { TextArea } = Input

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

const CustomInput = styled(TextArea)`
  border-radius: 25px;
  width: 100%;
  height: 35px;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;

  background: ${(props) => props.background || '#ffffff'} !important;
  color: #000000;

  textarea {
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: #000000;
    padding: 12px 16px 16px;
  }

  .ant-input-textarea-show-count::after {
    color: #828282 !important;
    font-weight: 500 !important;
    font-size: 13px !important;
    margin-top: 2px !important;
  }
  .ant-input-prefix {
    background: #f2f2f2;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    padding: 10px;
    padding-right: 15px;
    padding-left: 15px;
  }
  &.ant-input-affix-wrapper {
    padding: 0px !important;
    .ant-input {
      border-radius: 25px !important;
      padding: 5px;
      padding-right: 15px;
    }
  }
  .ant-input-disabled {
    background: ${(props) => props.background || '#ffffff'} !important;
  }
  .ant-input {
    border-radius: 20px;
  }
`

const TextAreaFormField = ({
  name,
  label = null,
  required = false,
  type = 'text',
  disabled,
  error = null,
  className = '',
  prefix,
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
        <CustomInput prefix={prefix} background={background} onBlur={() => setBlur(true)} disabled={disabled} type={type} placeholder={placeholder} {...rest} />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export const TextInput = CustomInput

export default TextAreaFormField
