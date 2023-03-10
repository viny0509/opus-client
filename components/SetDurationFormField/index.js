import { Form } from 'antd'
import images from 'common/images'
import Image from 'components/Image'
import dayjs from 'dayjs'
import useOverlay from 'hooks/useOverlay'
import useTranslate from 'hooks/useTranslate'
import { useState } from 'react'
import styled from 'styled-components'
import SetDurationOverLay from './SetDurationOverlay'

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

const InputContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
`

const Content = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #000000;
`

const SetDurationInput = ({ onBlur, onChange, value }) => {
  const { openOverlay } = useOverlay()
  const { translate } = useTranslate()
  console.log(value)
  return (
    <InputContainer
      onClick={() =>
        openOverlay({
          content: <SetDurationOverLay value={value} onChange={onChange} />,
          afterClose: () => onBlur && onBlur(),
        })
      }
    >
      <Content>
        <Image src={images.calendar} />
        {value?.endTime && translate('nfts.sell.sellEnd', { end: `${dayjs(value?.endTime * 1000).format('YYYY/MM/DD HH:mm')}` })}
      </Content>
      <Image src={images.icDropdown} width={10} />
    </InputContainer>
  )
}

const SetDurationFormField = ({ name, label = null, required = false, error = null, className = '', ...rest }) => {
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
        <SetDurationInput onBlur={() => setBlur(true)} {...rest} />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export default SetDurationFormField
