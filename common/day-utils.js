export const validateDateFormat = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  return dateRegex.test(dateString)
}

export const compareDates = (date1, date2) => {
  const date1Array = date1.split('-')
  const date2Array = date2.split('-')

  const year1 = parseInt(date1Array[0])
  const month1 = parseInt(date1Array[1])
  const day1 = parseInt(date1Array[2])

  const year2 = parseInt(date2Array[0])
  const month2 = parseInt(date2Array[1])
  const day2 = parseInt(date2Array[2])

  if (year1 > year2) {
    return 1
  } else if (year1 < year2) {
    return -1
  } else {
    if (month1 > month2) {
      return 1
    } else if (month1 < month2) {
      return -1
    } else {
      if (day1 > day2) {
        return 1
      } else if (day1 < day2) {
        return -1
      } else {
        return 0
      }
    }
  }
}

export const newBeginDate = (value = null) => {
  const date = value ? new Date(value) : new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

export const newFirstDateInMonth = (value = null) => {
  const date = value ? newBeginDate(value) : newBeginDate()
  date.setDate(1)
  return date
}

export const newLastDateInMonth = (value = null) => {
  const date = value ? newFirstDateInMonth(value) : newFirstDateInMonth()
  date.setMonth(date.getMonth() + 1)
  date.setDate(date.getDate() - 1)
  return date
}

export const getMonthData = (value = null) => {
  const date = newBeginDate(value)
  const firstDateInMonth = newFirstDateInMonth(date)
  const lastDateInMonth = newLastDateInMonth(firstDateInMonth)
  return {
    cuurentDate: date,
    firstDateInMonth: firstDateInMonth,
    lastDateInMonth,
  }
}

export const getCalendarData = (currentMonthData) => {
  const dateMonth = []
  const firstIndex = currentMonthData.firstDateInMonth.getDay()
  // const numsRow = Math.ceil((currentMonthData.lastDateInMonth.getDate() + firstIndex) / 7)
  let dateIndex = 0
  let dateInWeek = []
  for (let index = 0; index < currentMonthData.lastDateInMonth.getDate() + firstIndex; index++) {
    if (index < firstIndex) {
      dateInWeek.push(null)
    } else {
      const date = newBeginDate(currentMonthData.firstDateInMonth)
      date.setDate(date.getDate() + dateIndex)
      dateInWeek.push(date)
      dateIndex++
    }
    if (dateInWeek.length === 7) {
      dateMonth.push(dateInWeek)
      dateInWeek = []
    }
  }
  if (dateInWeek.length > 0) {
    while (dateInWeek.length < 7) {
      dateInWeek.push(null)
    }
    dateMonth.push(dateInWeek)
  }
  return dateMonth
}

export function formatDay(day) {
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

export const getCurrent = (value = null) => {
  return value ? new Date(value) : new Date()
}

export const getNextMonth = (value = null) => {
  const date = value ? new Date(value) : new Date()
  date.setMonth(date.getMonth() + 1)
  return date
}
