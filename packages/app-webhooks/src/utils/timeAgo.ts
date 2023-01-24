import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

/**
 * Get the "time ago" style string comparing actual datetime to the one requested.
 * @param dateTime - A string containing a datetime (typically in format 0000-00-00T00:00:00).
 * @returns a string containing the wanted "time ago" string (eg. Just now, 1 minute, 1 hour ago).
 */
export function getTimeAgoString(dateTime: string): string {
  const timeAgo = new TimeAgo('en-US')
  const dateTimeToDate = Date.parse(dateTime)
  const diffMilliseconds = Date.now() - dateTimeToDate
  return timeAgo.format(Date.now() - diffMilliseconds)
}
