import { formatDate } from '@commercelayer/app-elements'

/**
 * Get the "time ago" style string starting from a requested datetime string and an optional timezone.
 * @param dateTime - A string containing a parsable datetime.
 * @param timezone - A string containing a specific timezone. When not passed it will be used 'UTC', as it is the default value defined in `app-elements`.
 * @returns a string containing a "XXX ago" string (eg. about 1 minute ago, about 1 hour ago).
 */
export function formatDistanceInWords(
  dateTime: string,
  timezone?: string
): string {
  return formatDate({
    isoDate: dateTime,
    timezone,
    format: 'distanceToNow'
  })
}
