import type { InputSelectValue } from '@commercelayer/app-elements'
import type { ResourceWithEvent } from 'App'

export const webhookEvents: Record<ResourceWithEvent, string[]> = {
  addresses: ['tagged'],
  authorizations: ['create', 'succeeded', 'failed'],
  bundles: ['tagged'],
  buy_x_pay_y_promotions: ['create', 'tagged', 'destroy'],
  captures: ['create', 'succeeded', 'failed'],
  cleanups: ['create', 'start', 'complete', 'interrupt', 'destroy'],
  coupons: ['tagged'],
  customer_addresses: ['create', 'destroy'],
  customer_password_resets: ['create', 'destroy', 'reset_password'],
  customer_subscriptions: ['create', 'destroy'],
  customers: [
    'create',
    'acquired',
    'repeat',
    'create_password',
    'metadata_update',
    'tagged',
    'destroy'
  ],
  exports: ['create', 'start', 'complete', 'interrupt', 'destroy'],
  external_promotions: ['create', 'destroy', 'tagged'],
  fixed_amount_promotions: ['create', 'destroy', 'tagged'],
  fixed_price_promotions: ['create', 'destroy', 'tagged'],
  free_gift_promotions: ['create', 'destroy', 'tagged'],
  free_shipping_promotions: ['create', 'destroy', 'tagged'],
  gift_cards: [
    'create',
    'purchase',
    'activate',
    'deactivate',
    'redeem',
    'use',
    'tagged',
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
  line_items: ['tagged'],
  line_item_options: ['tagged'],
  orders: [
    'create',
    'draft',
    'pending',
    'place',
    'start_editing',
    'stop_editing',
    'approve',
    'cancel',
    'authorize',
    'void',
    'pay',
    'refund',
    'start_fulfilling',
    'cancel_fulfilling',
    'fulfill',
    'rebuild_shipments',
    'create_subscriptions',
    'cancel_subscriptions',
    'tagged',
    'destroy',
    'placing'
  ],
  order_copies: ['create', 'start', 'fail', 'complete', 'destroy'],
  order_subscriptions: [
    'create',
    'destroy',
    'activate',
    'deactivate',
    'cancel',
    'last_run_failed',
    'last_run_succeeded',
    'renewal'
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
  percentage_discount_promotions: ['create', 'destroy', 'tagged'],
  price_frequency_tiers: ['create', 'destroy'],
  price_volume_tiers: ['create', 'destroy'],
  promotions: ['create', 'tagged', 'destroy'],
  recurring_order_copies: ['create', 'destroy', 'start', 'fail', 'complete'],
  refunds: ['create', 'succeeded', 'failed'],
  returns: [
    'create',
    'request',
    'pending',
    'approve',
    'reject',
    'ship',
    'receive',
    'restock',
    'tagged',
    'destroy'
  ],
  shipments: [
    'upcoming',
    'cancel',
    'on_hold',
    'picking',
    'packing',
    'ready_to_ship',
    'ship',
    'tagged'
  ],
  shipping_weight_tiers: ['create', 'destroy'],
  skus: ['tagged'],
  sku_options: ['tagged'],
  stock_transfers: [
    'create',
    'upcoming',
    'picking',
    'in_transit',
    'complete',
    'cancel',
    'on_hold',
    'destroy'
  ],
  transaction: ['create'],
  voids: ['create', 'succeeded', 'failed']
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

export function getAllEventsForSelect(): InputSelectValue[] {
  const allEventsForSelect: InputSelectValue[] = []
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
      getEventsByResourceType(resourceType as ResourceWithEvent).length > 0
    )
  } catch {
    return false
  }
}
