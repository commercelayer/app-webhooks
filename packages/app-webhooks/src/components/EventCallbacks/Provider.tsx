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
  useContext
} from 'react'

import { initialValues, initialState } from './data'
import { reducer } from './reducer'

interface ListEventCallbackProviderProps {
  pageSize: number
  webhookId?: string | null
  children: ((props: ListEventCallbackContextValue) => ReactNode) | ReactNode
  sdkClient: CommerceLayerClient
}

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

  const changePage = useCallback(
    (page: number) => dispatch({ type: 'changePage', payload: page }),
    []
  )

  const fetchList = useCallback(async () => {
    if (webhookId != null) {
      const eventCallbacks = await getAllEventCallbacks({
        cl: sdkClient,
        state,
        webhookId,
        pageSize
      })
      dispatch({ type: 'loadData', payload: eventCallbacks })
    }
  }, [webhookId, state.currentPage])

  useEffect(
    function handleChangePageSkippingFirstRender() {
      if (state.list?.meta.currentPage != null) {
        void fetchList()
      }
    },
    [webhookId, state.currentPage]
  )

  useEffect(function init() {
    void fetchList()
  }, [])

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
