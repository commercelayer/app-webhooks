import { WebhookDetailsProvider } from '#components/Details/Provider'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import {
  useTokenProvider,
  useCoreSdkProvider,
  Button,
  EmptyState,
  PageSkeleton,
  PageLayout,
  Spacer,
  ContextMenu,
  DropdownMenuItem,
  DropdownMenuDivider
} from '@commercelayer/app-elements'
import { Link, useLocation, useRoute } from 'wouter'
import { WebhookCallbackURL } from '#components/Details/WebhookCallbackURL'
import { WebhookCircuit } from '#components/Details/WebhookCircuit'
import { WebhookDetails } from '#components/Details/WebhookDetails'
import { WebhookSecret } from '#components/Details/WebhookSecret'

const DetailsPage = (): JSX.Element | null => {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [_match, params] = useRoute(appRoutes.details.path)
  const [_, setLocation] = useLocation()

  const webhookId = params == null ? null : params.webhookId

  if (webhookId == null || !canUser('read', 'webhooks')) {
    return (
      <PageLayout
        title='Webhook details'
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
    return <PageSkeleton layout='details' hasHeaderDescription />
  }

  const contextMenuEdit = canUser('update', 'webhooks') && (
    <DropdownMenuItem
      label='Edit'
      onClick={() => {
        setLocation(appRoutes.editWebhook.makePath(webhookId))
      }}
    />
  )

  const contextMenuDivider = canUser('update', 'webhooks') &&
    canUser('destroy', 'webhooks') && <DropdownMenuDivider />

  const contextMenuDelete = canUser('destroy', 'webhooks') && (
    <DropdownMenuItem
      label='Delete'
      onClick={() => {
        setLocation(appRoutes.deleteWebhook.makePath(webhookId))
      }}
    />
  )

  const contextMenu = (
    <ContextMenu
      menuItems={
        <>
          {contextMenuEdit}
          {contextMenuDivider}
          {contextMenuDelete}
        </>
      }
    />
  )

  return (
    <WebhookDetailsProvider sdkClient={sdkClient} webhookId={webhookId}>
      {({ state: { isLoading, data } }) =>
        isLoading ? (
          <PageSkeleton layout='details' hasHeaderDescription />
        ) : data == null ? (
          <ErrorNotFound />
        ) : (
          <PageLayout
            title={data.name}
            mode={settings.mode}
            onGoBack={() => {
              setLocation(appRoutes.list.makePath())
            }}
            actionButton={contextMenu}
          >
            {data.last_event_callbacks !== undefined &&
              data.last_event_callbacks.length > 0 && (
                <Spacer bottom='12'>
                  <WebhookCircuit />
                </Spacer>
              )}
            <Spacer bottom='12'>
              <WebhookDetails />
            </Spacer>
            <Spacer bottom='12'>
              <WebhookCallbackURL />
            </Spacer>
            <Spacer bottom='12'>
              <WebhookSecret />
            </Spacer>
          </PageLayout>
        )
      }
    </WebhookDetailsProvider>
  )
}

export default DetailsPage
