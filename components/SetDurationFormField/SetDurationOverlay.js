import { Form } from 'antd'
import { compareDates, formatDay, getCurrent, getNextMonth, newBeginDate, validateDateFormat } from 'common/day-utils'
import { calculateNumber } from 'common/function'
import images from 'common/images'
import CalendarFormField from 'components/CalendarFormField'
import DateRangeFormField from 'components/DateRangeFormField'
import Image from 'components/Image'
import PrimaryButton from 'components/PrimaryButton'
import TimeRangePickerFormField from 'components/TimeRangePickerFormField'
import { Z_INDEX } from 'constants/UI'
import useOverlay from 'hooks/useOverlay'
import useTranslate from 'hooks/useTranslate'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled(Form)`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 0px 15px;
  padding-bottom: 20px;
`

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleContainerMargin = styled.div`
  height: 40px;
`

const TitleContainer = styled.div`
  background: #ffffff;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: ${Z_INDEX.OVERLAY};
  padding: 0px 20px;
  gap: 10px;
`

const Side = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
`

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const getFormInput = (value) => {
  if (value?.startTime && value?.endTime) {
    const startTime = new Date(value.startTime * 1000)
    const endTime = new Date(value.endTime * 1000)
    const timeRange = {
      openAt: calculateNumber(calculateNumber(startTime.getHours(), 60, 'times', 'number'), startTime.getMinutes(), 'plus', 'number'),
      closeAt: calculateNumber(calculateNumber(endTime.getHours(), 60, 'times', 'number'), endTime.getMinutes(), 'plus', 'number'),
    }
    const dateRange = `${formatDay(startTime)}/${formatDay(endTime)}`
    const newData = { timeRange, dateRange }
    return newData
  } else {
    return null
  }
}

const getMinute = (value = null) => {
  const date = new Date(value)
  return date.getMinutes() + date.getHours() * 60
}

const getValue = ({ dateRange, timeRange }) => {
  const [start = '', end = ''] = dateRange.split('/')
  if (start !== '' && end !== '') {
    const startDate = newBeginDate(start)
    startDate.setMinutes(timeRange.openAt)
    const endDate = newBeginDate(end)
    endDate.setMinutes(timeRange.closeAt)
    return { startTime: Math.round(startDate.getTime() / 1000), endTime: Math.round(endDate.getTime() / 1000) }
  }
  return null
}

const now = getCurrent()
const nextMonth = getNextMonth(now)

const SetDurationOverLay = ({ value, onChange }) => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState(
    getFormInput(value) || {
      dateRange: `${formatDay(now)}/${formatDay(nextMonth)}`,
      timeRange: {
        openAt: 0,
        closeAt: 0,
      },
    }
  )
  const { translate } = useTranslate()
  const { closeOverlay } = useOverlay()

  useEffect(() => {
    if (value?.startTime && value?.endTime) {
      const newData = getFormInput(value)
      setFormData(newData)
      form.setFieldsValue(newData)
    }
  }, [value?.startTime, value?.endTime])

  const handleChangeDateRange = ({ dateRange = null }) => {
    if (dateRange) {
      const now = getCurrent()
      const [start = '', end = ''] = dateRange.split('/')
      if (
        validateDateFormat(start) &&
        validateDateFormat(end) &&
        compareDates(formatDay(now), start) === 0 &&
        (formData.timeRange?.openAt || 0) < getMinute(now)
      ) {
        const timeRange = {
          openAt: getMinute(now),
          closeAt: getMinute(now),
        }
        const newData = {
          ...formData,
          timeRange,
        }
        setFormData(newData)
        form.setFieldsValue(newData)
      }
    }
  }

  const onSubmit = (values) => {
    const { dateRange = '', timeRange } = values
    onChange && onChange(getValue({ dateRange, timeRange }))
    closeOverlay()
  }
  console.log(getValue(formData))
  return (
    <Container
      onFinish={onSubmit}
      form={form}
      initialValues={formData}
      onValuesChange={(change, v) => {
        setFormData(v)
        handleChangeDateRange(change)
      }}
    >
      <TopContainer>
        <TitleContainerMargin />
        <TitleContainer>
          <Side />
          <Title>{translate('nfts.sell.setDuration')}</Title>
          <Side>
            <Image width={18} height={18} onClick={() => closeOverlay()} src={images.icClose} />
          </Side>
        </TitleContainer>
        <DateRangeFormField disabled className='MT20' name='dateRange' labelStart={translate('nfts.sell.starting')} labelEnd={translate('nfts.sell.ending')} />
        <CalendarFormField className='MT20' name='dateRange' />
        <TimeRangePickerFormField
          className='MT15'
          label={translate('nfts.sell.timeRange')}
          name='timeRange'
          $withOpen24h={false}
          disabledTimeStart={(date) => {
            const start = formData.dateRange.split('/')[0] || ''
            if (start !== '' && compareDates(formatDay(date.toDate()), start) === 0) {
              let currentHour = date.get('hours')
              return {
                disabledHours: () => {
                  const result = []
                  let currentH = currentHour
                  while (currentH > 0) {
                    result.push(--currentH)
                  }
                  return result
                },
                disabledMinutes: (selectedHour) => {
                  const result = []
                  let currentMinute = date.get('minutes')
                  if (currentHour === selectedHour) {
                    while (currentMinute > 0) {
                      result.push(--currentMinute)
                    }
                    return result
                  }
                },
              }
            } else {
              return {
                disabledHours: () => [],
              }
            }
          }}
          disabledTimeEnd={(date) => {
            const end = formData.dateRange.split('/')[1] || ''
            if (end !== '' && compareDates(formatDay(date.toDate()), end) === 0) {
              let currentHour = date.get('hours')
              return {
                disabledHours: () => {
                  const result = []
                  let currentH = currentHour
                  while (currentH > 0) {
                    result.push(--currentH)
                  }
                  return result
                },
                disabledMinutes: (selectedHour) => {
                  const result = []
                  let currentMinute = date.get('minutes')
                  if (currentHour === selectedHour) {
                    while (currentMinute > 0) {
                      result.push(--currentMinute)
                    }
                  }
                  return result
                },
              }
            } else {
              return {
                disabledHours: () => [],
              }
            }
          }}
        />
      </TopContainer>
      <ActionContainer>
        <PrimaryButton onClick={() => closeOverlay()} background='#ffffff' textColor='#000000' border='1px solid #e0e0e0' fullWidth>
          {translate('cancel')}
        </PrimaryButton>
        <PrimaryButton
          disabled={
            !getValue(formData) || getValue(formData).startTime === getValue(formData).endTime || getValue(formData).endTime < Math.round(Date.now() / 1000)
          }
          fullWidth
        >
          {translate('save')}
        </PrimaryButton>
      </ActionContainer>
    </Container>
  )
}

export default SetDurationOverLay
