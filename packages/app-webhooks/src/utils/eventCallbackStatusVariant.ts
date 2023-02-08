import { EventCallback } from '@commercelayer/sdk'

export function eventCallbackStatusVariant(
  eventCallback: EventCallback | undefined
): 'success' | 'danger' {
  return eventCallback?.response_code !== '200' ? 'danger' : 'success'
}
