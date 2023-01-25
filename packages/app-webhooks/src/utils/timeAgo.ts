import formatDistance from 'date-fns/formatDistance'

/**
 * Get the "time ago" style string starting from a requested datetime string.
 * @param dateTime - A string containing a parsable datetime.
 * @returns a string containing a "XXX ago" string (eg. about 1 minute ago, about 1 hour ago).
 */
export function getTimeAgoString(dateTime: string): string {
  const dateTimeToDate = Date.parse(dateTime)
  return `${formatDistance(Date.now(), dateTimeToDate)} ago`
}
