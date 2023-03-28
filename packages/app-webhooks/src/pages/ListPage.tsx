import { Webhook } from '@commercelayer/sdk'
import { appRoutes } from '#data/routes'
import { Link, useLocation } from 'wouter'
import { ListWebhookProvider } from '#components/List/Provider'
import {
  A,
  Button,
  Icon,
  PageSkeleton,
  PageLayout,
  List,
  ListItem,
  EmptyState,
  Text,
  useCoreSdkProvider,
  useTokenProvider
} from '@commercelayer/app-elements'
import { DescriptionLine } from '#components/List/ItemDescriptionLine'

/**
 * Get the relative status based on webhook's circuit state {@link https://docs.commercelayer.io/core/v/api-reference/webhooks/object}
 * @param webhook - The webhook object.
 * @returns a valid StatusUI to be used in the StatusIcon component.
 */
type WebhookListUiIcon = 'x' | 'check'

type WebhookListUiIconBg = 'red' | 'green'

function getListUiIcon(webhook: Webhook): {
  icon: WebhookListUiIcon
  bg: WebhookListUiIconBg
} {
  return webhook?.circuit_state === 'open'
    ? { icon: 'x', bg: 'red' }
    : { icon: 'check', bg: 'green' }
}

function ListPage(): JSX.Element {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const { dashboardUrl } = useTokenProvider()
  const [_location, setLocation] = useLocation()

  if (sdkClient == null) {
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
                // const statusUi = getListUiStatus(webhook)
                return (
                  <ListItem
                    className='items-center'
                    key={webhook.id}
                    icon={
                      <Icon
                        name={getListUiIcon(webhook).icon}
                        gap='large'
                        background={getListUiIcon(webhook).bg}
                      />
                    }
                    onClick={() => {
                      setLocation(appRoutes.details.makePath(webhook.id))
                    }}
                    tag='div'
                  >
                    <div>
                      <Text weight='bold'>{webhook.name}</Text>
                      <DescriptionLine webhook={webhook} />
                    </div>
                    <Icon name='caretRight' />
                  </ListItem>
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
