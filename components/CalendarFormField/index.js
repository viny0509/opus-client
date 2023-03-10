import { Form } from 'antd'
import { compareDates, newBeginDate, validateDateFormat } from 'common/day-utils'
import images from 'common/images'
import Image from 'components/Image'
import useCalendarData from 'hooks/useCalendarData'
import { useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const CustomFormItem = styled(Form.Item)`
  margin: 0;
  width: 100%;
`

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CalendarTitleContainer = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 150%;
  color: #000000;
`

const Side = styled.div`
  width: calc(100% / 7);
  display: flex;
  justify-content: center;
`

const DayContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`

const DayTitle = styled.div`
  width: calc(100% / 7);
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 150%;
  color: #828282;
`

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

const DateRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
`

const NullItem = styled.div`
  width: calc(100% / 7);
  aspect-ratio: 1;
  border-radius: 15px;
  ${(props) =>
    props.$inRange &&
    css`
      background: #f2f2f2;
    `}
`

const Date = styled.div`
  width: calc(100% / 7);
  aspect-ratio: 1;
  border-radius: 15px;
  font-weight: 600;
  font-size: 15px;
  line-height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$disabled ? '#828282' : '#000000')};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  ${(props) =>
    props.$inRange &&
    css`
      background: #e0e0e0;
      font-weight: 600;
      font-size: 15px;
      line-height: 150%;
      color: #828282;
    `}
  ${(props) =>
    props.$isStartOrEnd &&
    css`
      font-weight: 600;
      font-size: 15px;
      line-height: 150%;
      color: #000000;
      background: #f2f2f2;
    `}
`

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function formatDay(day) {
  const year = day.getFullYear()
  let month = day.getMonth() + 1
  let date = day.getDate()

  if (month < 10) {
    month = `0${month}`
  }

  if (date < 10) {
    date = `0${date}`
  }

  return `${year}-${month}-${date}`
}

const month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const CalendarInput = ({ onChange, value }) => {
  const currentDate = useMemo(() => {
    return newBeginDate()
  }, [])

  const [selectedMonth, setSelectedMonth] = useState(newBeginDate())
  const { data } = useCalendarData(selectedMonth)
  const [startValue, setStartValue] = useState('')
  const [endValue, setEndValue] = useState('')
  const [chooseMode, setChooseMode] = useState('start')

  const handleNextMonth = () => {
    const date = newBeginDate(selectedMonth)
    date.setMonth(date.getMonth() + 1)
    setSelectedMonth(date)
  }

  const handlePrevMonth = () => {
    const date = newBeginDate(selectedMonth)
    date.setMonth(date.getMonth() - 1)
    setSelectedMonth(date)
  }

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

  const handleClickDate = (value) => {
    // if value less than now return
    if (compareDates(value, formatDay(currentDate)) === -1) {
      return
    }
    if (chooseMode === 'start') {
      setStartValue(value)
      setEndValue('')
      setChooseMode('end')
    } else {
      if (compareDates(value, startValue) === -1) {
        setStartValue(value)
        setEndValue('')
        setChooseMode('end')
      } else {
        setEndValue(value)
        setChooseMode('start')
      }
    }
  }

  return (
    <CalendarContainer>
      <CalendarTitleContainer>
        <Side>
          {(selectedMonth.getMonth() > currentDate.getMonth() || selectedMonth.getFullYear() > currentDate.getFullYear()) && (
            <Image onClick={() => handlePrevMonth()} cursor='pointer' width={15} height={15} src={images.calendarPrev} />
          )}
        </Side>
        <Title>{`${month[selectedMonth.getMonth()]} ${selectedMonth.getFullYear()}`}</Title>
        <Side>
          <Image onClick={() => handleNextMonth()} cursor='pointer' width={15} height={15} src={images.calendarNext} />
        </Side>
      </CalendarTitleContainer>
      <DayContainer className='MT20'>
        {days.map((day) => (
          <DayTitle key={day}>{day}</DayTitle>
        ))}
      </DayContainer>
      <DateContainer className='MT20'>
        {data.map((row, rowIndex) => (
          <DateRow key={`row_${rowIndex}`}>
            {row.map((date, dateIndex) => {
              const value = date ? formatDay(date) : ''
              let inRange = false
              if (date) {
                inRange = compareDates(formatDay(date), startValue) === 1 && compareDates(formatDay(date), endValue) === -1
              } else {
                const start = validateDateFormat(startValue) ? newBeginDate(startValue) : null
                const end = validateDateFormat(endValue) ? newBeginDate(endValue) : null
                if (!start || !end) {
                  inRange = false
                } else if (
                  (selectedMonth.getMonth() < end.getMonth() && selectedMonth.getFullYear() <= end.getFullYear() && rowIndex > 0) ||
                  (selectedMonth.getMonth() <= end.getMonth() &&
                    selectedMonth.getMonth() > start.getMonth() &&
                    selectedMonth.getFullYear() === end.getFullYear() &&
                    rowIndex === 0)
                ) {
                  inRange = true
                }
              }

              if (!date) {
                return <NullItem $inRange={inRange} key={`date_${rowIndex}_${dateIndex}`} />
              }
              return (
                <Date
                  $isStartOrEnd={value === startValue || value === endValue}
                  $inRange={inRange}
                  $disabled={compareDates(value, formatDay(currentDate)) === -1}
                  onClick={() => handleClickDate(value)}
                  key={`date_${rowIndex}_${dateIndex}`}
                >
                  {date.getDate()}
                </Date>
              )
            })}
          </DateRow>
        ))}
      </DateContainer>
    </CalendarContainer>
  )
}

const CalendarFormField = ({ name, className = '' }) => {
  return (
    <Container className={className}>
      <CustomFormItem name={name}>
        <CalendarInput />
      </CustomFormItem>
    </Container>
  )
}

export default CalendarFormField
