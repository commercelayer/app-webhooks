import { appRoutes } from '#data/routes'
import { Link, useRoute, useLocation } from 'wouter'
import { ListEventCallbackProvider } from '#components/EventCallbacks/Provider'
import {
  useCoreSdkProvider,
  useTokenProvider,
  Button,
  EmptyState,
  List,
  PageLayout,
  PageSkeleton
} from '@commercelayer/core-app-elements'
import { EventCallbacksTable } from '#components/Common/EventCallbacksTable'

function EventCallbacksPage(): JSX.Element {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [_location, setLocation] = useLocation()
  const [_match, params] = useRoute(appRoutes.webhookEventCallbacks.path)

  const webhookId = params == null ? null : params.webhookId

  if (
    webhookId == null ||
    !canUser('read', 'webhooks') ||
    !canUser('read', 'event_callbacks')
  ) {
    return (
      <PageLayout
        title='Event callbacks'
        onGoBack={() => {
          setLocation(appRoutes.list.makePath())
        }}
        mode={settings.mode}
      >
        <EmptyState
          title='Not authorized'
          action={
            <Link href={appRoutes.list.makePath()}>
              <Button variant='primary'>Go back</Button>
            </Link>
          }
        />
      </PageLayout>
    )
  }

  if (sdkClient == null) {
    console.warn('Waiting for SDK client')
    return <PageSkeleton />
  }

  return (
    <PageLayout
      title='Event Callbacks'
      mode={settings.mode}
      onGoBack={() => {
        setLocation(appRoutes.details.makePath(webhookId))
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
            return <EmptyState title='Unable to load list' />
          }

          if (list.length === 0) {
            return <EmptyState title='No event callbacks yet!' />
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
              <EventCallbacksTable eventCallbacks={list} />
            </List>
          )
        }}
      </ListEventCallbackProvider>
    </PageLayout>
  )
}

export default EventCallbacksPage
