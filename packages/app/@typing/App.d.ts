declare module 'App' {
  export interface WebhookDetailsContextValue {
    state: WebhookDetailsContextState
    refetch: () => Promise<void>
  }

  export interface WebhookDetailsContextState {
    data?: Webhook
    isLoading: boolean
    isNotFound: boolean
  }

  export interface WebhookDeleteContextValue
    extends Omit<WebhookDetailsContextValue, 'state'> {
    state: WebhookFormContextState
    deleteWebhook: () => Promise<boolean>
  }

  export interface WebhookDeleteContextState
    extends WebhookDetailsContextState {
    isDeleting: boolean
  }

  export interface WebhookFormContextValue
    extends Omit<WebhookDetailsContextValue, 'state'> {
    state: WebhookFormContextState
  }

  export interface WebhookFormContextState extends WebhookDetailsContextState {}
}
