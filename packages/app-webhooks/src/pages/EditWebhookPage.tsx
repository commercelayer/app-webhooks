import { WebhookFormProvider } from '#components/Form/Provider'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import {
  useTokenProvider,
  PageSkeleton,
  PageLayout
} from '@commercelayer/core-app-elements'
import { useLocation, useRoute } from 'wouter'
import WebhookForm from '#components/Form/WebhookForm'

const EditWebhookPage = (): JSX.Element | null => {
  const { sdkClient } = useTokenProvider()
  const [_match, params] = useRoute(appRoutes.editWebhook.path)
  const [_location, setLocation] = useLocation()

  const webhookId = params == null ? null : params.webhookId

  if (webhookId == null) {
    return null
  }

  if (sdkClient == null) {
    console.warn('Waiting for SDK client')
    return <PageSkeleton hasHeaderDescription />
  }

  return (
    <WebhookFormProvider sdkClient={sdkClient} webhookId={webhookId}>
      {({ state: { isLoading, data } }) =>
        isLoading ? (
          <PageSkeleton layout='details' hasHeaderDescription />
        ) : data == null ? (
          <ErrorNotFound />
        ) : (
          <PageLayout
            title='Edit webhook'
            onGoBack={() => {
              setLocation(appRoutes.details.makePath(webhookId))
            }}
          >
            <WebhookForm webhookId={webhookId} webhookData={data} />
          </PageLayout>
        )
      }
    </WebhookFormProvider>
  )
}

export default EditWebhookPage
