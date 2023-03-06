import { CommerceLayerClient, Webhook } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'
import { ListWebhookContextValue, ListWebhookContextState } from 'App'
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

interface ListWebhookProviderProps {
  pageSize: number
  children: ((props: ListWebhookContextValue) => ReactNode) | ReactNode
  sdkClient: CommerceLayerClient
}

const Context = createContext<ListWebhookContextValue>(initialValues)

export const useListContext = (): ListWebhookContextValue => useContext(Context)

export function ListWebhookProvider({
  children,
  pageSize,
  sdkClient
}: ListWebhookProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  console.log(state)

  const changePage = useCallback(
    (page: number) => dispatch({ type: 'changePage', payload: page }),
    []
  )

  const fetchList = useCallback(async () => {
    const list = await getAllWebhooks({
      cl: sdkClient,
      state,
      pageSize
    })
    dispatch({ type: 'loadData', payload: list })
  }, [state.currentPage])

  useEffect(
    function handleChangePageSkippingFirstRender() {
      if (state.list?.meta.currentPage != null) {
        void fetchList()
      }
    },
    [state.currentPage]
  )

  useEffect(function init() {
    void fetchList()
  }, [])

  const value: ListWebhookContextValue = {
    state,
    changePage
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
