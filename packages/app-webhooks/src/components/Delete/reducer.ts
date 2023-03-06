import { Webhook } from '@commercelayer/sdk'
import { WebhookDeleteContextState } from 'App'

type Action =
  | { type: 'loadData'; payload: Webhook }
  | { type: 'setNotFound'; payload: boolean }

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
        isNotFound: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}
