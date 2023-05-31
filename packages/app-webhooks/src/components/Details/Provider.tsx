import type { CommerceLayerClient } from '@commercelayer/sdk'
import type { WebhookDetailsContextValue } from 'App'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { initialState, initialValues } from './data'
import { reducer } from './reducer'

interface WebhookDetailsProviderProps {
  webhookId: string
  sdkClient: CommerceLayerClient
  children:
    | ((props: WebhookDetailsContextValue) => React.ReactNode)
    | React.ReactNode
}

const Context = createContext<WebhookDetailsContextValue>(initialValues)
export const useWebhookDetailsContext = (): WebhookDetailsContextValue =>
  useContext(Context)

export function WebhookDetailsProvider({
  sdkClient,
  webhookId,
  children
}: WebhookDetailsProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchWebhook = useCallback(async () => {
    try {
      const webhook = await sdkClient.webhooks.retrieve(webhookId, {
        include: ['last_event_callbacks']
      })
      dispatch({ type: 'webhook/loaded', payload: webhook })
    } catch {
      dispatch({ type: 'webhook/onError' })
    }
  }, [webhookId])

  const resetWebhookCircuit = useCallback(async (): Promise<void> => {
    await sdkClient.webhooks
      .update(
        { id: webhookId, _reset_circuit: true },
        {
          include: ['last_event_callbacks']
        }
      )
      .then((webhook) => {
        dispatch({ type: 'webhook/loaded', payload: webhook })
      })
      .catch(() => {})
  }, [webhookId])

  useEffect(function init() {
    void fetchWebhook()
  }, [])

  const value: WebhookDetailsContextValue = {
    state,
    refetch: async () => {
      await fetchWebhook()
    },
    resetWebhookCircuit
  }

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  )
}
