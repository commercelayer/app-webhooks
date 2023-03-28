import { formatDate } from '@commercelayer/app-elements'

/**
 * Get separate formatted date and time starting from a requested datetime string and an optional timezone.
 * @param dateTime - A string containing a parsable datetime.
 * @param timezone - A string containing a specific timezone. When not passed it will be used 'UTC', as it is the default value defined in `app-elements`.
 * @returns an object containing "date" and "time" props.
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
