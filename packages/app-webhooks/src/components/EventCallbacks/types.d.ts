import { EventCallback } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'

declare module 'App' {
  export interface ListEventCallbackContextValue {
    state: ListEventCallbackContextState
    changePage: (page: number) => void
  }

  export interface ListEventCallbackContextState {
    list?: ListResponse<EventCallback>
    isLoading: boolean
    currentPage: number
    sort: {
      created_at: 'asc' | 'desc'
    }
  }
}
