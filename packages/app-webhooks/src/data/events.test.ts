import { getEventsByResourceType } from './events'
import { webhookEvents, isResourceWithEvent } from '#data/events'

describe('getEventsByResourceType', () => {
  test('Should retrieve a list of events', () => {
    expect(getEventsByResourceType('gift_cards')).toMatchObject([
      'create',
      'purchase',
      'activate',
      'deactivate',
      'redeem',
      'destroy'
    ])
  })

  test('Should retrieve a list of events for all ResourceWithEvent types', () => {
    Object.keys(webhookEvents).forEach((resourceType) => {
      if (!isResourceWithEvent(resourceType)) {
        return false
      }

      expect(getEventsByResourceType(resourceType)).toMatchObject(
        webhookEvents[resourceType]
      )
    })
  })
})
