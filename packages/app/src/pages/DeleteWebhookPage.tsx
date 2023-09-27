import { WebhookDeleteProvider } from '#components/Delete/Provider'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import {
  useTokenProvider,
  useCoreSdkProvider,
  Button,
  EmptyState,
  PageSkeleton,
  PageLayout
} from '@commercelayer/app-elements'
import { Link, useLocation, useRoute } from 'wouter'
import { WebhookRemoval } from '#components/Delete/WebhookRemoval'

const DeleteWebhookPage = (): JSX.Element | null => {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [_match, params] = useRoute(appRoutes.deleteWebhook.path)
  const [_, setLocation] = useLocation()

  const webhookId = params == null ? null : params.webhookId

  if (webhookId == null || !canUser('destroy', 'webhooks')) {
    return (
      <PageLayout
        title='Delete webhook'
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

  return (
    <WebhookDeleteProvider sdkClient={sdkClient} webhookId={webhookId}>
      {({ state: { isLoading, data } }) =>
        isLoading ? (
          <PageSkeleton layout='details' hasHeaderDescription />
        ) : data == null ? (
          <ErrorNotFound />
        ) : (
          <PageLayout
            title={`Permanently delete the ${data.name as string} webhook.`}
            mode={settings.mode}
            onGoBack={() => {
              setLocation(appRoutes.details.makePath(webhookId))
            }}
          >
            <WebhookRemoval />
          </PageLayout>
        )
      }
    </WebhookDeleteProvider>
  )
}

export default DeleteWebhookPage
