import { CommerceLayerClient, Webhook } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import { ListWebhookContextValue, ListWebhookContextState } from 'App'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useContext,
  useRef
} from 'react'

import { initialValues, initialState } from './data'
import { reducer } from './reducer'

interface ListWebhookProviderProps {
  pageSize: number
  children: ((props: ListWebhookContextValue) => ReactNode) | ReactNode
  sdkClient: CommerceLayerClient
}
const POLLING_INTERVAL = 10000

const Context = createContext<ListWebhookContextValue>(initialValues)

export const useListContext = (): ListWebhookContextValue => useContext(Context)

export function ListWebhookProvider({
  children,
  pageSize,
  sdkClient
}: ListWebhookProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  const changePage = useCallback(
    (page: number) => dispatch({ type: 'changePage', payload: page }),
    []
  )

  const fetchList = useCallback(
    async ({ handleLoadingState }: { handleLoadingState: boolean }) => {
      handleLoadingState && dispatch({ type: 'setLoading', payload: true })
      try {
        const list = await getAllWebhooks({
          cl: sdkClient,
          state,
          pageSize
        })
        dispatch({ type: 'setList', payload: list })
      } finally {
        handleLoadingState && dispatch({ type: 'setLoading', payload: false })
      }
    },
    [state.currentPage]
  )

  const deleteWebhook = (webhookId: string): void => {
    sdkClient.webhooks
      .delete(webhookId)
      .catch(() => {
        console.error('Webhook not found')
      })
      .finally(() => {
        void fetchList({ handleLoadingState: false })
      })
  }

  useEffect(
    function handleChangePageSkippingFirstRender() {
      if (state.list?.meta.currentPage != null) {
        void fetchList({ handleLoadingState: false })
      }
    },
    [state.currentPage]
  )

  useEffect(
    function handlePollingState() {
      if (state.list == null || state.list.length === 0) {
        return
      }

      const shouldPoll = state.list.some((job) =>
        statusForPolling.includes(job.circuit_state)
      )
      dispatch({ type: 'togglePolling', payload: shouldPoll })
    },
    [state.list]
  )

  useEffect(
    function startPolling() {
      void fetchList({ handleLoadingState: true })
      if (!state.isPolling) {
        return
      }
      // start polling
      intervalId.current = setInterval(() => {
        void fetchList({ handleLoadingState: false })
      }, POLLING_INTERVAL)

      return () => {
        if (intervalId.current != null) {
          clearInterval(intervalId.current)
        }
      }
    },
    [state.isPolling]
  )

  const value: ListWebhookContextValue = {
    state,
    changePage,
    deleteWebhook
  }

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  )
}

const getAllWebhooks = async ({
  cl,
  state,
  pageSize
}: {
  cl: CommerceLayerClient
  state: ListWebhookContextState
  pageSize: number
}): Promise<ListResponse<Webhook>> => {
  return await cl.webhooks.list({
    pageNumber: state.currentPage,
    pageSize,
    sort: state.sort,
    include: ['last_event_callbacks']
  })
}

const statusForPolling: Array<Webhook['circuit_state']> = ['closed', 'open']
