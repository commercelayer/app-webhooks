import { WebhookDeleteProvider } from '#components/Delete/Provider'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import {
  useTokenProvider,
  useCoreSdkProvider,
  PageSkeleton,
  PageLayout
} from '@commercelayer/core-app-elements'
import { useLocation, useRoute } from 'wouter'
import { WebhookRemoval } from '#components/Delete/WebhookRemoval'

const DeleteWebhookPage = (): JSX.Element | null => {
  const { settings } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [_match, params] = useRoute(appRoutes.deleteWebhook.path)
  const [_, setLocation] = useLocation()

  const webhookId = params == null ? null : params.webhookId

  if (webhookId == null) {
    return null
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
