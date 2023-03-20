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
    customTemplate: 'p'
  })

  return {
    date: formattedDate,
    time: formattedTime
  }
}
