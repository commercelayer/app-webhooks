import { appRoutes } from '#data/routes'
import { Link, useLocation } from 'wouter'
import { ListWebhookProvider } from '#components/List/Provider'
import { getUiStatus } from '#components/List/utils'
import {
  A,
  Button,
  PageSkeleton,
  PageLayout,
  List,
  ListItemTask,
  EmptyState,
  useTokenProvider
} from '@commercelayer/core-app-elements'
import { DescriptionLine } from '#components/List/ItemDescriptionLine'

function ListPage(): JSX.Element {
  const { sdkClient, dashboardUrl } = useTokenProvider()
  const [_location, setLocation] = useLocation()

  if (sdkClient == null) {
    console.warn('Waiting for SDK client')
    return <PageSkeleton />
  }

  return (
    <PageLayout
      title='Webhooks'
      onGoBack={() => {
        window.location.href = dashboardUrl != null ? dashboardUrl : '/'
      }}
    >
      <ListWebhookProvider sdkClient={sdkClient} pageSize={25}>
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
                <EmptyState
                  title='No webhook yet!'
                  description='Create your first webhook'
                  action={
                    <Link href={appRoutes.newWebhook.makePath()}>
                      <Button variant='primary'>New webhook</Button>
                    </Link>
                  }
                />
              </div>
            )
          }

          const isRefetching = currentPage !== list.meta.currentPage
          const { recordCount, recordsPerPage, pageCount } = list.meta

          return (
            <List
              isDisabled={isRefetching}
              title='All webhooks'
              actionButton={
                <Link href={appRoutes.newWebhook.makePath()}>
                  <A>New webhook</A>
                </Link>
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
                const statusUi = getUiStatus(webhook.circuit_state)
                return (
                  <ListItemTask
                    key={webhook.id}
                    status={statusUi}
                    onClick={() => {
                      setLocation(appRoutes.details.makePath(webhook.id))
                    }}
                    progressPercentage={statusUi === 'progress' ? 0 : undefined}
                    title={webhook.name as string}
                    description={<DescriptionLine job={webhook} />}
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
