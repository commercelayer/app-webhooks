import type {
  ListEventCallbackContextValue,
  ListEventCallbackContextState
} from 'App'

export const initialState: ListEventCallbackContextState = {
  isLoading: true,
  currentPage: 1,
  sort: {
    created_at: 'desc'
  }
}

export const initialValues: ListEventCallbackContextValue = {
  state: initialState,
  changePage: () => undefined
}
