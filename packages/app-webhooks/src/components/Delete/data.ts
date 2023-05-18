import type { WebhookDeleteContextState, WebhookDeleteContextValue } from 'App'

export const initialState: WebhookDeleteContextState = {
  isLoading: true,
  isDeleting: false,
  isNotFound: false
}

export const initialValues: WebhookDeleteContextValue = {
  state: initialState,
  refetch: async () => undefined,
  deleteWebhook: async () => false
}
