import { Webhook } from '@commercelayer/sdk'

declare module 'App' {
  export interface WebhookDetailsContextValue {
    state: WebhookDetailsContextState
    refetch: () => Promise<void>
    deleteWebhook: () => Promise<boolean>
  }

  export interface WebhookDetailsContextState {
    data?: Webhook
    isLoading: boolean
    isDeleting: boolean
    isPolling: boolean
    isNotFound: boolean
  }

  export interface WebhookFormContextValue {
    state: WebhookFormContextState
    refetch: () => Promise<void>
  }

  export interface WebhookFormContextState {
    data?: Webhook
    isLoading: boolean
    isDeleting: boolean
    isPolling: boolean
    isNotFound: boolean
  }
}
