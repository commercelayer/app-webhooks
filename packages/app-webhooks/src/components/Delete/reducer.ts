import { Webhook } from '@commercelayer/sdk'
import { WebhookDeleteContextState } from 'App'

type Action =
  | { type: 'setLoading'; payload: boolean }
  | { type: 'setDeleting'; payload: boolean }
  | { type: 'setNotFound'; payload: boolean }
  | { type: 'setData'; payload: Webhook }
  | { type: 'togglePolling'; payload: boolean }

export const reducer = (
  state: WebhookDeleteContextState,
  action: Action
): WebhookDeleteContextState | never => {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'setDeleting':
      return {
        ...state,
        isDeleting: action.payload
      }
    case 'setNotFound':
      return {
        ...state,
        isNotFound: action.payload
      }
    case 'setData':
      return {
        ...state,
        data: action.payload
      }
    case 'togglePolling':
      return {
        ...state,
        isPolling: action.payload
      }
    default:
      return state
  }
}