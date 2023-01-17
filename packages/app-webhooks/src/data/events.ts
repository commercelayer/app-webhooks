import type { SelectValue } from '@commercelayer/core-app-elements'
import { ResourceWithEvent } from 'App'

export const webhookEvents: Record<ResourceWithEvent, string[]> = {
  customers: ['acquired', 'create', 'create_password', 'destroy']
}

export function getEventsByResourceType(
  resourceType: ResourceWithEvent
): string[] {
  return webhookEvents[resourceType]
}

export function getAllEventsForSelect(): SelectValue[] {
  const allEventsForSelect: SelectValue[] = []
  Object.keys(webhookEvents).forEach((r) => {
    const events = getEventsByResourceType(r as ResourceWithEvent)
    events.forEach((e) => {
      allEventsForSelect.push({
        label: `${r}.${e}`,
        value: `${r}.${e}`
      })
    })
  })
  return allEventsForSelect
}

export function isResourceWithEvent(
  resourceType: any
): resourceType is ResourceWithEvent {
  try {
    return (
      resourceType in webhookEvents &&
      getEventsByResourceType(resourceType).length > 0
    )
  } catch {
    return false
  }
}
