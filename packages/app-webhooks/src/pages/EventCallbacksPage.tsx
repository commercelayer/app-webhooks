import { appRoutes } from '#data/routes'
import { useRoute, useLocation } from 'wouter'
import { ListEventCallbackProvider } from '#components/EventCallbacks/Provider'
import {
  PageSkeleton,
  PageLayout,
  List,
  EmptyState,
  useTokenProvider
} from '@commercelayer/core-app-elements'
import { EventCallbacksTable } from '#components/Common/EventCallbacksTable'

function EventCallbacksPage(): JSX.Element {
  const { sdkClient } = useTokenProvider()
  const [_location, setLocation] = useLocation()
  const [_match, params] = useRoute(appRoutes.webhookEventCallbacks.path)

  const webhookId = params == null ? null : params.webhookId

  if (sdkClient == null) {
    console.warn('Waiting for SDK client')
    return <PageSkeleton />
  }

  return (
    <PageLayout
      title='Event Callbacks'
      onGoBack={() => {
        setLocation(appRoutes.details.makePath(webhookId as string))
      }}
    >
      <ListEventCallbackProvider
        sdkClient={sdkClient}
        webhookId={webhookId}
        pageSize={25}
      >
        {({ state, changePage }) => {
          const { isLoading, currentPage, list } = state

          if (isLoading) {
            return <List isLoading />
          }

          if (list == null) {
            return (
              <div>
                <EmptyState title='Unable to load list' />
              </div>
            )
          }

          if (list.length === 0) {
            return (
              <div>
                <EmptyState title='No event callbacks yet!' />
              </div>
            )
          }

          const isRefetching = currentPage !== list.meta.currentPage
          const { recordCount, recordsPerPage, pageCount } = list.meta

          return (
            <List
              isDisabled={isRefetching}
              title='All event callbacks'
              pagination={{
                recordsPerPage,
                recordCount,
                currentPage,
                onChangePageRequest: changePage,
                pageCount
              }}
            >
              <EventCallbacksTable hideTopBorder eventCallbacks={list} />
            </List>
          )
        }}
      </ListEventCallbackProvider>
    </PageLayout>
  )
}

export default EventCallbacksPage
