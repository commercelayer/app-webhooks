import { CommerceLayerClient } from '@commercelayer/sdk'
import { WebhookDeleteContextValue } from 'App'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { initialState, initialValues } from './data'
import { reducer } from './reducer'

interface WebhookDeleteProviderProps {
  webhookId: string
  sdkClient: CommerceLayerClient
  children: ((props: WebhookDeleteContextValue) => ReactNode) | ReactNode
}

const Context = createContext<WebhookDeleteContextValue>(initialValues)
export const useWebhookDeleteContext = (): WebhookDeleteContextValue =>
  useContext(Context)

export function WebhookDeleteProvider({
  sdkClient,
  webhookId,
  children
}: WebhookDeleteProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchWebhook = useCallback(async () => {
    try {
      const webhookDelete = await sdkClient.webhooks.retrieve(webhookId)
      dispatch({ type: 'loadData', payload: webhookDelete })
    } catch {
      dispatch({ type: 'setNotFound' })
    }
  }, [webhookId])

  const deleteWebhook = useCallback(async (): Promise<boolean> => {
    return await sdkClient.webhooks
      .delete(webhookId)
      .then(() => true)
      .catch(() => {
        return false
      })
  }, [webhookId])

  useEffect(function init() {
    void fetchWebhook()
  }, [])

  const value: WebhookDeleteContextValue = {
    state,
    refetch: async () => await fetchWebhook(),
    deleteWebhook
  }

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  )
}
