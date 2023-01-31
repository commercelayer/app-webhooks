import { Webhook } from '@commercelayer/sdk'

declare module 'App' {
  export interface WebhookDetailsContextValue {
    state: WebhookDetailsContextState
    refetch: () => Promise<void>
    deleteWebhook: () => Promise<boolean>
    resetWebhookCircuit: () => Promise<boolean>
  }

  export interface WebhookDetailsContextState {
    data?: Webhook
    isLoading: boolean
    isDeleting: boolean
    isCircuitResetting: boolean
    isPolling: boolean
    isNotFound: boolean
  }

  export type WebhookFormContextValue = Omit<
    WebhookDetailsContextValue,
    'deleteWebhook'
  >

  export type WebhookFormContextState = Omit<
    WebhookDetailsContextState,
    'isCircuitResetting'
  >
}
