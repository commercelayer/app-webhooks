import { WebhookDetailsContextState, WebhookDetailsContextValue } from 'App'

export const initialState: WebhookDetailsContextState = {
  isLoading: true,
  isPolling: false,
  isDeleting: false,
  isNotFound: false
}

export const initialValues: WebhookDetailsContextValue = {
  state: initialState,
  refetch: async () => undefined,
  deleteWebhook: async () => false
}
