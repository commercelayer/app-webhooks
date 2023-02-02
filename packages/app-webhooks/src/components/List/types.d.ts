import { Webhook } from '@commercelayer/sdk'
import { ListResponse } from '@commercelayer/sdk/lib/cjs/resource'

declare module 'App' {
  export interface ListWebhookContextValue {
    state: ListWebhookContextState
    changePage: (page: number) => void
  }

  export type ListWebhookAllowedStatusType =
    | 'completed'
    | 'interrupted'
    | 'in_progress'
    | 'pending'

  export interface ListWebhookContextState {
    list?: ListResponse<Webhook>
    isLoading: boolean
    isPolling: boolean
    currentPage: number
    sort: {
      created_at: 'asc' | 'desc'
    }
  }
}
