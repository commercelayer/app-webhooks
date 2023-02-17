import { WebhookFormProvider } from '#components/Form/Provider'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import {
  useCoreSdkProvider,
  Button,
  EmptyState,
  PageSkeleton,
  PageLayout,
  useTokenProvider
} from '@commercelayer/core-app-elements'
import { Link, useLocation, useRoute } from 'wouter'
import WebhookForm from '#components/Form/WebhookForm'

const EditWebhookPage = (): JSX.Element | null => {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [_match, params] = useRoute(appRoutes.editWebhook.path)
  const [_location, setLocation] = useLocation()

  const webhookId = params == null ? null : params.webhookId

  if (webhookId == null || !canUser('update', 'webhooks')) {
    return (
      <PageLayout
        title='Edit webhook'
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
            mode={settings.mode}
            onGoBack={() => {
              setLocation(appRoutes.details.makePath(webhookId))
            }}
          >
            <WebhookForm webhookData={data} />
          </PageLayout>
        )
      }
    </WebhookFormProvider>
  )
}

export default EditWebhookPage
