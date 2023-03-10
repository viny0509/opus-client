import { Form, TimePicker } from 'antd'
import { calculateNumber } from 'common/function'
import images from 'common/images'
import Image from 'components/Image'
import dayjs from 'dayjs'
import useTranslate from 'hooks/useTranslate'
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
const Error = styled.div`
  color: red;
`

const CustomFormItem = styled(Form.Item)`
  margin: 0;
  width: 100%;
`

const CustomTime = styled(TimePicker)`
  height: 50px;
  width: 100%;
  background: #ffffff;
  border-radius: 25px;
`

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: #000000;
`

const TimeRangeInput = ({ value, onChange, onBlur, $withOpen24h, disabledTimeStart = null, disabledTimeEnd = null }) => {
  const [openAt, setOpenAt] = useState(value?.openAt)
  const [closeAt, setCloseAt] = useState(value?.closeAt)
  const [open24h, setOpen24h] = useState(value?.openAt === value?.closeAt && value?.openAt === 0 && $withOpen24h)
  const { translate } = useTranslate()
  useEffect(() => {
    setOpenAt(value?.openAt || 0)
    setCloseAt(value?.closeAt || 0)
  }, [value])

  useEffect(() => {
    const newValue = {
      openAt: openAt,
      closeAt: closeAt,
    }
    if (open24h && $withOpen24h) {
      newValue.openAt = 0
      newValue.closeAt = 0
    }
    onChange && onChange(newValue)
  }, [openAt, closeAt, open24h])

  const handleChangeTimeStart = (dayjsValue) => {
    if (dayjsValue) {
      setOpenAt(calculateNumber(calculateNumber(dayjsValue.get('hour'), 60, 'times', 'number'), dayjsValue.get('minute'), 'plus', 'number'))
    } else {
      setOpenAt(0)
    }
  }

  const handleChangeTimeEnd = (dayjsValue) => {
    if (dayjsValue) {
      setCloseAt(calculateNumber(calculateNumber(dayjsValue.get('hour'), 60, 'times', 'number'), dayjsValue.get('minute'), 'plus', 'number'))
    } else {
      setCloseAt(0)
    }
  }

  return (
    <InputContainer>
      {!(open24h && $withOpen24h) && (
        <TimeContainer>
          <CustomTime
            value={dayjs(`${Math.floor(openAt / 60)}:${openAt % 60}`, 'HH:mm')}
            onBlur={() => onBlur && onBlur()}
            disabledTime={disabledTimeStart}
            onChange={handleChangeTimeStart}
            format='HH:mm'
          />
          <Image src={images.icTimeBreak} width={10} />
          <CustomTime
            value={dayjs(`${Math.floor(closeAt / 60)}:${closeAt % 60}`, 'HH:mm')}
            onBlur={() => onBlur && onBlur()}
            disabledTime={disabledTimeEnd}
            onChange={handleChangeTimeEnd}
            format='HH:mm'
          />
        </TimeContainer>
      )}
      {$withOpen24h && (
        <CheckboxContainer className={!open24h && 'MT5'}>
          <Image onClick={() => setOpen24h(!open24h)} src={open24h ? images.icCheckboxActive : images.icCheckbox} width={15} height={15} />
          {translate('nfts.mint.open24Hours')}
        </CheckboxContainer>
      )}
    </InputContainer>
  )
}
/**
 *
 * @typedef {(now: dayjs.Dayjs) => { disabledHours?: () => number[], disabledMinutes?: (selectedHour: number) => number[], disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[] }} DisabledTimes
 * @param {{ className: string, label: string, required: boolean, name: string, error: string, $withOpen24h: boolean, disabledTimeStart: (date: dayjs.Dayjs) => DisabledTimes, disabledTimeEnd: (date: dayjs.Dayjs) => DisabledTimes }} props
 * @returns
 */
const TimeRangePickerFormField = ({ className, label, required, name, error, $withOpen24h = true, disabledTimeStart = null, disabledTimeEnd = null }) => {
  return (
    <Container className={className}>
      {label && (
        <Label>
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      <CustomFormItem name={name}>
        <TimeRangeInput $withOpen24h={$withOpen24h} disabledTimeStart={disabledTimeStart} disabledTimeEnd={disabledTimeEnd} />
      </CustomFormItem>
      {error && blur && <Error>{error}</Error>}
    </Container>
  )
}

export default TimeRangePickerFormField
