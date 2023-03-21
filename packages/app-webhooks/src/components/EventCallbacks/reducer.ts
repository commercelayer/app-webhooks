import { EventCallback } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import { ListEventCallbackContextState } from 'App'

type Action =
  | { type: 'eventCallbacks/loaded'; payload: ListResponse<EventCallback> }
  | { type: 'eventCallbacks/changePage'; payload: number }
  | { type: 'eventCallbacks/changeSort'; payload: 'asc' | 'desc' }

export const reducer = (
  state: ListEventCallbackContextState,
  action: Action
): ListEventCallbackContextState => {
  switch (action.type) {
    case 'eventCallbacks/loaded':
      return {
        ...state,
        list: action.payload,
        isLoading: false
      }
    case 'eventCallbacks/changePage':
      return {
        ...state,
        currentPage: action.payload,
        isLoading: true
      }
    case 'eventCallbacks/changeSort':
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
