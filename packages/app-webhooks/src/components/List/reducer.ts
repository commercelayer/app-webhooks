import { Webhook } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import { ListWebhookContextState } from 'App'

type Action =
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setList'; payload: ListResponse<Webhook> }
  | { type: 'changePage'; payload: number }
  | { type: 'togglePolling'; payload: boolean }
  | { type: 'sort'; payload: 'asc' | 'desc' }

export const reducer = (
  state: ListWebhookContextState,
  action: Action
): ListWebhookContextState => {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'setList':
      return {
        ...state,
        list: action.payload
      }
    case 'changePage':
      return {
        ...state,
        currentPage: action.payload
      }
    case 'togglePolling':
      return {
        ...state,
        isPolling: action.payload
      }
    case 'sort':
      return {
        ...state,
        sort: {
          created_at: action.payload
        }
      }
    default:
      return state
  }
}
