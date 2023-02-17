import { CommerceLayerClient } from '@commercelayer/sdk'
import { WebhookDeleteContextValue } from 'App'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef
} from 'react'
import { initialState, initialValues } from './data'
import { reducer } from './reducer'

interface WebhookDeleteProviderProps {
  webhookId: string
  sdkClient: CommerceLayerClient
  children: ((props: WebhookDeleteContextValue) => ReactNode) | ReactNode
}

const POLLING_INTERVAL = 4000

const Context = createContext<WebhookDeleteContextValue>(initialValues)
export const useWebhookDeleteContext = (): WebhookDeleteContextValue =>
  useContext(Context)

export function WebhookDeleteProvider({
  sdkClient,
  webhookId,
  children
}: WebhookDeleteProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  const fetchWebhook = useCallback(
    async ({ handleLoadingState }: { handleLoadingState: boolean }) => {
      handleLoadingState && dispatch({ type: 'setLoading', payload: true })
      try {
        const webhookDelete = await sdkClient.webhooks.retrieve(webhookId)
        dispatch({ type: 'setData', payload: webhookDelete })
      } catch {
        dispatch({ type: 'setNotFound', payload: true })
        dispatch({ type: 'togglePolling', payload: false })
      }
      handleLoadingState && dispatch({ type: 'setLoading', payload: false })
    },
    [webhookId]
  )

  const deleteWebhook = useCallback(async (): Promise<boolean> => {
    dispatch({ type: 'setDeleting', payload: true })
    return await sdkClient.webhooks
      .delete(webhookId)
      .then(() => true)
      .catch(() => {
        dispatch({ type: 'setDeleting', payload: false })
        return false
      })
  }, [webhookId])

  useEffect(
    function startPolling() {
      void fetchWebhook({ handleLoadingState: true })
      if (!state.isPolling) {
        return
      }
      intervalId.current = setInterval(() => {
        void fetchWebhook({ handleLoadingState: false })
      }, POLLING_INTERVAL)

      return () => {
        if (intervalId.current != null) {
          clearInterval(intervalId.current)
        }
      }
    },
    [state.isPolling]
  )

  const value: WebhookDeleteContextValue = {
    state,
    refetch: async () => await fetchWebhook({ handleLoadingState: false }),
    deleteWebhook
  }

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  )
}
