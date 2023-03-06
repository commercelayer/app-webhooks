import { Webhook } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import { ListWebhookContextState } from 'App'

type Action =
  | { type: 'loadData'; payload: ListResponse<Webhook> }
  | { type: 'changePage'; payload: number }
  | { type: 'sort'; payload: 'asc' | 'desc' }

export const reducer = (
  state: ListWebhookContextState,
  action: Action
): ListWebhookContextState => {
  switch (action.type) {
    case 'loadData':
      return {
        ...state,
        list: action.payload,
        isLoading: false
      }
    case 'changePage':
      return {
        ...state,
        currentPage: action.payload,
        isLoading: true
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
