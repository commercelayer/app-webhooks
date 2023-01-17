import { WebhookFormContextState, WebhookFormContextValue } from 'App'

export const initialState: WebhookFormContextState = {
  isLoading: true,
  isPolling: false,
  isDeleting: false,
  isNotFound: false
}

export const initialValues: WebhookFormContextValue = {
  state: initialState,
  refetch: async () => undefined
}
