import type { SelectValue } from '@commercelayer/app-elements'
import { ResourceWithEvent } from 'App'

export const webhookEvents: Record<ResourceWithEvent, string[]> = {
  authorizations: ['create'],
  captures: ['create'],
  cleanups: ['create', 'start', 'complete', 'interrupt', 'destroy'],
  customer_addresses: ['create', 'destroy'],
  customer_password_resets: ['create', 'destroy', 'reset_password'],
  customer_subscriptions: ['create', 'destroy'],
  customers: [
    'create',
    'acquired',
    'repeat',
    'create_password',
    'metadata_update',
    'destroy'
  ],
  exports: ['create', 'start', 'complete', 'interrupt', 'destroy'],
  external_promotions: ['create', 'destroy'],
  fixed_amount_promotions: ['create', 'destroy'],
  fixed_price_promotions: ['create', 'destroy'],
  free_gift_promotions: ['create', 'destroy'],
  free_shipping_promotions: ['create', 'destroy'],
  gift_cards: [
    'create',
    'purchase',
    'activate',
    'deactivate',
    'redeem',
    'destroy'
  ],
  imports: ['create', 'start', 'complete', 'interrupt', 'destroy'],
  in_stock_subscriptions: [
    'create',
    'activate',
    'deactivate',
    'notify',
    'destroy'
  ],
  orders: [
    'create',
    'draft',
    'pending',
    'place',
    'approve',
    'cancel',
    'authorize'
  ],
  order_copies: ['create', 'start', 'fail', 'complete', 'destroy'],
  order_subscriptions: [
    'create',
    'destroy',
    'activate',
    'deactivate',
    'cancel'
  ],
  parcels: [
    'create',
    'pre_transit',
    'in_transit',
    'out_for_delivery',
    'delivered',
    'shipped',
    'available_for_pickup',
    'booked',
    'return_to_sender',
    'cancelled',
    'failure',
    'destroy'
  ],
  percentage_discount_promotions: ['create', 'destroy'],
  price_volume_tiers: ['create', 'destroy'],
  refunds: ['create'],
  returns: [
    'create',
    'request',
    'pending',
    'approve',
    'reject',
    'ship',
    'receive',
    'restock',
    'destroy'
  ],
  shipments: [
    'upcoming',
    'cancel',
    'on_hold',
    'picking',
    'packing',
    'ready_to_ship',
    'ship'
  ],
  shipping_weight_tiers: ['create', 'destroy'],
  stock_transfers: [
    'create',
    'upcoming',
    'picking',
    'in_transit',
    'complete',
    'cancel',
    'destroy'
  ],
  voids: ['create']
}

export function getEventsByResourceType(
  resourceType: ResourceWithEvent
): string[] {
  return webhookEvents[resourceType]
}

function getAllFlatEvents(): string[] {
  const allFlatEvents: string[] = []
  Object.keys(webhookEvents).forEach((res) => {
    const relationships = getEventsByResourceType(res as ResourceWithEvent)
    relationships.forEach((rel) => {
      allFlatEvents.push(`${res}.${rel}`)
    })
  })
  return allFlatEvents
}

const allFlatEvents = getAllFlatEvents()
export type ResourceEventKey = (typeof allFlatEvents)[number]

export function getAllEventsForSelect(): SelectValue[] {
  const allEventsForSelect: SelectValue[] = []
  allFlatEvents.forEach((event) => {
    allEventsForSelect.push({
      label: event,
      value: event
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
