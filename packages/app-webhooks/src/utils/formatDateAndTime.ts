// import { format } from 'date-fns'
import { formatDate } from '@commercelayer/app-elements'

/**
 * Get the "time ago" style string starting from a requested datetime string.
 * @param dateTime - A string containing a parsable datetime.
 * @returns a string containing a "XXX ago" string (eg. about 1 minute ago, about 1 hour ago).
 */
export function formatDateAndTime(
  dateTime: string,
  timezone?: string
): {
  date: string
  time: string
} {
  const formattedDate = formatDate({
    isoDate: dateTime,
    timezone,
    format: 'custom',
    customTemplate: 'PP'
  })
  const formattedTime = formatDate({
    isoDate: dateTime,
    timezone,
    format: 'custom',
    customTemplate: 'pp'
  })

  const today = formatDate({
    isoDate: new Date().toISOString(),
    timezone: 'Europe/Rome',
    format: 'noTime'
  })
  const date = formatDate({
    isoDate: dateTime,
    timezone: 'Europe/Rome',
    format: 'noTime'
  })

  if (today === date) {
    return {
      date: 'Today',
      time: formattedTime
    }
  }

  const todayYear = formatDate({
    isoDate: new Date().toISOString(),
    timezone: 'Europe/Rome',
    format: 'custom',
    customTemplate: 'uuuu'
  })
  const dateYear = formatDate({
    isoDate: dateTime,
    timezone: 'Europe/Rome',
    format: 'custom',
    customTemplate: 'uuuu'
  })

  if (todayYear === dateYear) {
    const formattedDateWithoutYear = formatDate({
      isoDate: dateTime,
      timezone,
      format: 'custom',
      customTemplate: `LLL d`
    })
    return {
      date: formattedDateWithoutYear,
      time: formattedTime
    }
  }

  return {
    date: formattedDate,
    time: formattedTime
  }
}
