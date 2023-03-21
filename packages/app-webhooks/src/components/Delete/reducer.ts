import { Webhook } from '@commercelayer/sdk'
import { WebhookDeleteContextState } from 'App'

type Action =
  | { type: 'webhook/loaded'; payload: Webhook }
  | { type: 'webhook/onError' }

export const reducer = (
  state: WebhookDeleteContextState,
  action: Action
): WebhookDeleteContextState | never => {
  switch (action.type) {
    case 'webhook/loaded':
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    case 'webhook/onError':
      return {
        ...state,
        isNotFound: true,
        isLoading: false
      }
    default:
      return state
  }
}
