import { StatusUI } from '@commercelayer/core-app-elements/dist/ui/atoms/StatusIcon'

/**
 * Get the relative status Union Type from the api status {@link https://docs.commercelayer.io/core/v/api-reference/webhooks/object}
 * @param circuitState - The webhook circuit state. One of 'closed' (default), 'open'.
 * @returns a valid StatusUI to be used in the StatusIcon component.
 */
export function getUiStatus(circuitState?: string): StatusUI {
  if (circuitState === 'open') {
    return 'danger'
  }

  if (circuitState === 'closed') {
    return 'success'
  }

  return 'success'
}
