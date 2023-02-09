import { ListWebhookContextValue, ListWebhookContextState } from 'App'

export const initialState: ListWebhookContextState = {
  isLoading: true,
  isPolling: false,
  currentPage: 1,
  sort: {
    created_at: 'desc'
  }
}

export const initialValues: ListWebhookContextValue = {
  state: initialState,
  changePage: () => undefined
}
