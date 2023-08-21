import type { CommerceLayerClient } from '@commercelayer/sdk'
import type { WebhookFormContextValue } from 'App'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { initialState, initialValues } from './data'
import { reducer } from './reducer'

interface WebhookFormProviderProps {
  webhookId: string
  sdkClient: CommerceLayerClient
  children:
    | ((props: WebhookFormContextValue) => React.ReactNode)
    | React.ReactNode
}

const Context = createContext<WebhookFormContextValue>(initialValues)
export const useWebhookFormContext = (): WebhookFormContextValue =>
  useContext(Context)

export function WebhookFormProvider({
  sdkClient,
  webhookId,
  children
}: WebhookFormProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchJob = useCallback(async () => {
    try {
      const webhook = await sdkClient.webhooks.retrieve(webhookId)
      dispatch({ type: 'webhook/loaded', payload: webhook })
    } catch {
      dispatch({ type: 'webhook/onError' })
    }
  }, [webhookId])

  useEffect(function init() {
    void fetchJob()
  }, [])

  const value: WebhookFormContextValue = {
    state,
    refetch: async () => {
      await fetchJob()
    }
  }

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  )
}
