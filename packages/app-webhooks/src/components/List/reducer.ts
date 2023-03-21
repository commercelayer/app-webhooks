import { Webhook } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import { ListWebhookContextState } from 'App'

type Action =
  | { type: 'webhooks/loaded'; payload: ListResponse<Webhook> }
  | { type: 'webhooks/changePage'; payload: number }
  | { type: 'webhooks/changeSort'; payload: 'asc' | 'desc' }

export const reducer = (
  state: ListWebhookContextState,
  action: Action
): ListWebhookContextState => {
  switch (action.type) {
    case 'webhooks/loaded':
      return {
        ...state,
        list: action.payload,
        isLoading: false
      }
    case 'webhooks/changePage':
      return {
        ...state,
        currentPage: action.payload,
        isLoading: true
      }
    case 'webhooks/changeSort':
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
