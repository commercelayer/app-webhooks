import { CommerceLayerClient } from '@commercelayer/sdk'
import { WebhookDetailsContextValue } from 'App'
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

interface WebhookDetailsProviderProps {
  webhookId: string
  sdkClient: CommerceLayerClient
  children: ((props: WebhookDetailsContextValue) => ReactNode) | ReactNode
}

const POLLING_INTERVAL = 4000

const Context = createContext<WebhookDetailsContextValue>(initialValues)
export const useWebhookDetailsContext = (): WebhookDetailsContextValue =>
  useContext(Context)

export function WebhookDetailsProvider({
  sdkClient,
  webhookId,
  children
}: WebhookDetailsProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  const fetchJob = useCallback(
    async ({ handleLoadingState }: { handleLoadingState: boolean }) => {
      handleLoadingState && dispatch({ type: 'setLoading', payload: true })
      try {
        const webhookDetails = await sdkClient.webhooks.retrieve(webhookId)
        dispatch({ type: 'setData', payload: webhookDetails })
      } catch {
        dispatch({ type: 'setNotFound', payload: true })
        dispatch({ type: 'togglePolling', payload: false })
        dispatch({ type: 'setLoading', payload: false })
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
      void fetchJob({ handleLoadingState: true })
      if (!state.isPolling) {
        return
      }
      intervalId.current = setInterval(() => {
        void fetchJob({ handleLoadingState: false })
      }, POLLING_INTERVAL)

      return () => {
        if (intervalId.current != null) {
          clearInterval(intervalId.current)
        }
      }
    },
    [state.isPolling]
  )

  const value: WebhookDetailsContextValue = {
    state,
    refetch: async () => await fetchJob({ handleLoadingState: false }),
    deleteWebhook
  }

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  )
}
