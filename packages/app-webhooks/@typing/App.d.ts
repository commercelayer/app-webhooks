import { Webhook } from '@commercelayer/sdk'

declare module 'App' {
  export interface WebhookDetailsContextValue {
    state: WebhookDetailsContextState
    refetch: () => Promise<void>
    deleteWebhook: () => Promise<boolean>
    resetWebhookCircuit: () => Promise<void>
  }

  export interface WebhookDetailsContextState {
    data?: Webhook
    isLoading: boolean
    isDeleting: boolean
    isCircuitResetting: boolean
    isPolling: boolean
    isNotFound: boolean
  }

  export interface WebhookFormContextValue
    extends Omit<
      WebhookDetailsContextValue,
      'deleteWebhook' | 'resetWebhookCircuit' | 'state'
    > {
    state: WebhookFormContextState
  }

  export type WebhookFormContextState = Omit<
    WebhookDetailsContextState,
    'isCircuitResetting'
  >
}
