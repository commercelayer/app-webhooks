import { CommerceLayerClient, EventCallback } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import {
  ListEventCallbackContextValue,
  ListEventCallbackContextState
} from 'App'
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

interface ListEventCallbackProviderProps {
  pageSize: number
  webhookId?: string | null
  children: ((props: ListEventCallbackContextValue) => ReactNode) | ReactNode
  sdkClient: CommerceLayerClient
}
const POLLING_INTERVAL = 10000

const Context = createContext<ListEventCallbackContextValue>(initialValues)

export const useListContext = (): ListEventCallbackContextValue =>
  useContext(Context)

export function ListEventCallbackProvider({
  children,
  pageSize,
  webhookId,
  sdkClient
}: ListEventCallbackProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const intervalId = useRef<NodeJS.Timer | null>(null)

  const changePage = useCallback(
    (page: number) => dispatch({ type: 'changePage', payload: page }),
    []
  )

  const fetchList = useCallback(
    async ({ handleLoadingState }: { handleLoadingState: boolean }) => {
      handleLoadingState && dispatch({ type: 'setLoading', payload: true })
      if (webhookId != null) {
        try {
          const list = await getAllEventCallbacks({
            cl: sdkClient,
            state,
            webhookId,
            pageSize
          })
          dispatch({ type: 'setList', payload: list })
        } finally {
          handleLoadingState && dispatch({ type: 'setLoading', payload: false })
        }
      }
    },
    [webhookId, state.currentPage]
  )

  useEffect(
    function handleChangePageSkippingFirstRender() {
      if (state.list?.meta.currentPage != null) {
        void fetchList({ handleLoadingState: false })
      }
    },
    [webhookId, state.currentPage]
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

  const value: ListEventCallbackContextValue = {
    state,
    changePage
  }

  return (
    <Context.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </Context.Provider>
  )
}

const getAllEventCallbacks = async ({
  cl,
  state,
  webhookId,
  pageSize
}: {
  cl: CommerceLayerClient
  state: ListEventCallbackContextState
  webhookId: string
  pageSize: number
}): Promise<ListResponse<EventCallback>> => {
  return await cl.event_callbacks.list({
    filters: { webhook_id_eq: webhookId },
    pageNumber: state.currentPage,
    pageSize,
    sort: state.sort
  })
}
