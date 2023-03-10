import { getCalendarData, getMonthData } from 'common/day-utils'
import { useMemo } from 'react'

const useCalendarData = (month) => {
  const data = useMemo(() => {
    return getCalendarData(getMonthData(month))
  }, [month])

  return {
    data,
  }
}

export default useCalendarData
