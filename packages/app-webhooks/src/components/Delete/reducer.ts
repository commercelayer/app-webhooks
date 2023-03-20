import { Webhook } from '@commercelayer/sdk'
import { WebhookDeleteContextState } from 'App'

type Action = { type: 'loadData'; payload: Webhook } | { type: 'setNotFound' }

export const reducer = (
  state: WebhookDeleteContextState,
  action: Action
): WebhookDeleteContextState | never => {
  switch (action.type) {
    case 'loadData':
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    case 'setNotFound':
      return {
        ...state,
        isNotFound: true,
        isLoading: false
      }
    default:
      return state
  }
}
