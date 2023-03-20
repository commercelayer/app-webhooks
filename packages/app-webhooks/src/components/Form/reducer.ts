import { Webhook } from '@commercelayer/sdk'
import { WebhookFormContextState } from 'App'

type Action = { type: 'setNotFound' } | { type: 'loadData'; payload: Webhook }

export const reducer = (
  state: WebhookFormContextState,
  action: Action
): WebhookFormContextState | never => {
  switch (action.type) {
    case 'setNotFound':
      return {
        ...state,
        isNotFound: true,
        isLoading: false
      }
    case 'loadData':
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}
