import type { Webhook } from '@commercelayer/sdk'
import type { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'

declare module 'App' {
  export interface ListWebhookContextValue {
    state: ListWebhookContextState
    changePage: (page: number) => void
  }

  export interface ListWebhookContextState {
    list?: ListResponse<Webhook>
    isLoading: boolean
    currentPage: number
    sort: {
      created_at: 'asc' | 'desc'
    }
  }
}
