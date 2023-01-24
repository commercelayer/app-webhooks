import { WebhookDetailsProvider } from '#components/Details/Provider'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import {
  useTokenProvider,
  A,
  PageSkeleton,
  PageLayout,
  Spacer
} from '@commercelayer/core-app-elements'
import { useLocation, useRoute } from 'wouter'
import { WebhookDetails } from '#components/Details/WebhookDetails'
import { WebhookSecret } from '#components/Details/WebhookSecret'
import { WebhookRemoval } from '#components/Details/WebhookRemoval'

const DetailsPage = (): JSX.Element | null => {
  const { sdkClient } = useTokenProvider()
  const [_match, params] = useRoute(appRoutes.details.path)
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
    <WebhookDetailsProvider sdkClient={sdkClient} webhookId={webhookId}>
      {({ state: { isLoading, data } }) =>
        isLoading ? (
          <PageSkeleton layout='details' hasHeaderDescription />
        ) : data == null ? (
          <ErrorNotFound />
        ) : (
          <PageLayout
            title={data.name}
            onGoBack={() => {
              setLocation(appRoutes.list.makePath())
            }}
            actionButton={
              <A
                onClick={() => {
                  setLocation(appRoutes.editWebhook.makePath(webhookId))
                }}
              >
                Edit
              </A>
            }
          >
            <Spacer bottom='12'>
              <WebhookDetails />
            </Spacer>
            <Spacer bottom='12'>
              <WebhookSecret />
            </Spacer>
            <Spacer bottom='12'>
              <WebhookRemoval />
            </Spacer>
          </PageLayout>
        )
      }
    </WebhookDetailsProvider>
  )
}

export default DetailsPage
