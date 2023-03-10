import { Form, Input } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

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

const DateInput = styled(Input)`
  width: 100%;
  height: 50px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  padding: 0px 10px !important;
  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &[type='date']::-webkit-input-placeholder {
    visibility: hidden !important;
  }
`

const DateFormField = ({ name, label = null, required = false, error = null, className = '' }) => {
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
        <DateInput onBlur={() => setBlur(true)} type='date' />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export default DateFormField
