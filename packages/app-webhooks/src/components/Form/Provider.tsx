import { CommerceLayerClient } from '@commercelayer/sdk'
import { WebhookFormContextValue } from 'App'
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

interface WebhookFormProviderProps {
  webhookId: string
  sdkClient: CommerceLayerClient
  children: ((props: WebhookFormContextValue) => ReactNode) | ReactNode
}

const POLLING_INTERVAL = 4000

const Context = createContext<WebhookFormContextValue>(initialValues)
export const useWebhookFormContext = (): WebhookFormContextValue =>
  useContext(Context)

export function WebhookFormProvider({
  sdkClient,
  webhookId,
  children
}: WebhookFormProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  const fetchJob = useCallback(
    async ({ handleLoadingState }: { handleLoadingState: boolean }) => {
      handleLoadingState && dispatch({ type: 'setLoading', payload: true })
      try {
        const webhookForm = await sdkClient.webhooks.retrieve(webhookId)
        dispatch({ type: 'setData', payload: webhookForm })
      } catch {
        dispatch({ type: 'setNotFound', payload: true })
        dispatch({ type: 'togglePolling', payload: false })
        dispatch({ type: 'setLoading', payload: false })
      }
      handleLoadingState && dispatch({ type: 'setLoading', payload: false })
    },
    [webhookId]
  )

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

  const value: WebhookFormContextValue = {
    state,
    refetch: async () => await fetchJob({ handleLoadingState: false })
  }

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  )
}
