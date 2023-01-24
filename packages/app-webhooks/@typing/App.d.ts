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

  export type WebhookFormContextValue = Omit<
    WebhookDetailsContextValue,
    'deleteWebhook'
  >

  export interface WebhookFormContextState extends WebhookDetailsContextState {}
}
