import { Form } from 'antd'
import Loading from 'components/Loading'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import TextFormField from 'components/TextFormField'

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

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`

const InputItem = styled.div`
  height: 50px;
  width: 100%;
  max-width: calc(50% - 7.5px);
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
  display: flex;
  align-items: center;
  ${(props) =>
    props.$active &&
    css`
      background: #f2f2f2;
    `}
`
//  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
//  padding: 0px 20px;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const MultipleInput = ({ disabled, max = 0, loading, options = [], onBlur, onChange, value }) => {
  const [data, setData] = useState(value || Array(max).fill(''))

  useEffect(() => {
    setData(value?.length ? value : Array(max).fill(''))
  }, [value])

  useEffect(() => {
    onChange && onChange(data)
    onBlur && onBlur()
  }, [data])

  const handleChange = (e, index) => {
    if (!disabled) {
      const newData = [...data]
      newData[index] = e.target.value
      setData(newData)
    }
  }

  return (
    <InputContainer>
      {loading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        options?.map((option, index) => (
          <InputItem disabled={disabled} $active={data?.includes(option.value)} key={option.key}>
            <TextFormField placeholder={option.placeholder} suffix={undefined} onChange={(e) => handleChange(e, index)} />
          </InputItem>
        ))
      )}
    </InputContainer>
  )
}

const MultipleInputFormField = ({
  name,
  label = null,
  subLabel = null,
  loading = false,
  required = false,
  options = [],
  disabled,
  max = null,
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
        <MultipleInput max={max} loading={loading} onBlur={() => setBlur(true)} options={options} disabled={disabled} background={background} {...rest} />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export default MultipleInputFormField
