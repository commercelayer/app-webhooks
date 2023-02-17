import { Webhook } from '@commercelayer/sdk'
import { appRoutes } from '#data/routes'
import { Link, useLocation } from 'wouter'
import { ListWebhookProvider } from '#components/List/Provider'
import {
  A,
  Button,
  PageSkeleton,
  PageLayout,
  List,
  ListItemTask,
  EmptyState,
  useCoreSdkProvider,
  useTokenProvider
} from '@commercelayer/core-app-elements'
import { StatusUI } from '@commercelayer/core-app-elements/dist/ui/atoms/StatusIcon'
import { DescriptionLine } from '#components/List/ItemDescriptionLine'
import { eventCallbackStatusVariant } from '#utils/eventCallbackStatusVariant'

/**
 * Get the relative status based on webhook's absence or presence of an event callback {@link https://docs.commercelayer.io/core/v/api-reference/webhooks/object}
 * @param webhook - The webhook object.
 * @returns a valid StatusUI to be used in the StatusIcon component.
 */
function getListUiStatus(webhook: Webhook): StatusUI {
  const eventCallback =
    webhook.last_event_callbacks !== undefined &&
    webhook.last_event_callbacks?.length > 0
      ? webhook.last_event_callbacks[0]
      : undefined
  return eventCallbackStatusVariant(eventCallback)
}

function ListPage(): JSX.Element {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const { dashboardUrl } = useTokenProvider()
  const [_location, setLocation] = useLocation()

  if (sdkClient == null) {
    console.warn('Waiting for SDK client')
    return <PageSkeleton />
  }

  if (!canUser('read', 'webhooks')) {
    return (
      <PageLayout
        title='Webhooks'
        mode={settings.mode}
        onGoBack={() => {
          setLocation(appRoutes.list.makePath())
        }}
      >
        <EmptyState title='You are not authorized' />
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title='Webhooks'
      mode={settings.mode}
      onGoBack={() => {
        window.location.href =
          dashboardUrl != null ? `${dashboardUrl}/hub` : '/'
      }}
    >
      <ListWebhookProvider sdkClient={sdkClient} pageSize={25}>
        {({ state, changePage }) => {
          const { isLoading, currentPage, list } = state

          if (isLoading) {
            return <List isLoading />
          }

          if (list == null) {
            return <EmptyState title='Unable to load list' />
          }

          if (list.length === 0) {
            return (
              <EmptyState
                title='No webhook yet!'
                description='Create your first webhook'
                action={
                  canUser('create', 'webhooks') ? (
                    <Link href={appRoutes.newWebhook.makePath()}>
                      <Button variant='primary'>New webhook</Button>
                    </Link>
                  ) : undefined
                }
              />
            )
          }

          const isRefetching = currentPage !== list.meta.currentPage
          const { recordCount, recordsPerPage, pageCount } = list.meta

          return (
            <List
              isDisabled={isRefetching}
              title='All webhooks'
              actionButton={
                canUser('create', 'webhooks') ? (
                  <Link href={appRoutes.newWebhook.makePath()}>
                    <A>New webhook</A>
                  </Link>
                ) : undefined
              }
              pagination={{
                recordsPerPage,
                recordCount,
                currentPage,
                onChangePageRequest: changePage,
                pageCount
              }}
            >
              {list.map((webhook) => {
                const statusUi = getListUiStatus(webhook)
                return (
                  <ListItemTask
                    key={webhook.id}
                    status={statusUi}
                    onClick={() => {
                      setLocation(appRoutes.details.makePath(webhook.id))
                    }}
                    progressPercentage={statusUi === 'progress' ? 0 : undefined}
                    title={webhook.name as string}
                    description={<DescriptionLine webhook={webhook} />}
                  />
                )
              })}
            </List>
          )
        }}
      </ListWebhookProvider>
    </PageLayout>
  )
}

export default ListPage
