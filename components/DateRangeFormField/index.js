import { Form, Input } from 'antd'
import { validateDateFormat } from 'common/day-utils'
import { useEffect, useState } from 'react'
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
  &:disabled {
    background: #fff !important;
    color: #000 !important;
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const DateRangeInput = ({ onChange, value, labelStart, labelEnd, disabled, className = '' }) => {
  const [startValue, setStartValue] = useState('')
  const [endValue, setEndValue] = useState('')

  useEffect(() => {
    const [start = '', end = ''] = (value || '').split('/')
    if (start === '' || validateDateFormat(start)) {
      setStartValue(start)
    }
    if (end === '' || validateDateFormat(end)) {
      setEndValue(end)
    }
  }, [value])

  useEffect(() => {
    onChange && onChange(`${startValue}/${endValue}`)
  }, [startValue, endValue])

  return (
    <Wrapper>
      <Container className={className}>
        {labelStart && <Label>{labelStart}</Label>}
        <DateInput value={startValue} disabled={disabled} onChange={(e) => setStartValue(e.target.value)} type='date' />
      </Container>
      <Container className={className}>
        {labelEnd && <Label>{labelEnd}</Label>}
        <DateInput value={endValue} disabled={disabled} onChange={(e) => setEndValue(e.target.value)} type='date' />
      </Container>
    </Wrapper>
  )
}

const DateRangeFormField = ({ name, labelStart = null, disabled, labelEnd, wrapClassName = '', className = '' }) => {
  return (
    <Wrapper className={wrapClassName}>
      <CustomFormItem name={name}>
        <DateRangeInput className={className} disabled={disabled} labelEnd={labelEnd} labelStart={labelStart} />
      </CustomFormItem>
    </Wrapper>
  )
}

export default DateRangeFormField
