import { WebhookDetailsContextState, WebhookDetailsContextValue } from 'App'

export const initialState: WebhookDetailsContextState = {
  isLoading: true,
  isNotFound: false
}

export const initialValues: WebhookDetailsContextValue = {
  state: initialState,
  refetch: async () => undefined,
  resetWebhookCircuit: async () => {}
}
