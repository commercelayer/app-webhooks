import { ErrorNotFound } from '#components/ErrorNotFound'
import { WebhookFormProvider } from '#components/Form/Provider'
import WebhookForm from '#components/Form/WebhookForm'
import { appRoutes } from '#data/routes'
import {
  Button,
  EmptyState,
  PageLayout,
  PageSkeleton,
  useCoreSdkProvider,
  useTokenProvider
} from '@commercelayer/app-elements'
import type { FC } from 'react'
import { Link, useLocation, useRoute } from 'wouter'

export const WebhookEdit: FC = () => {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [, params] = useRoute(appRoutes.editWebhook.path)
  const [, setLocation] = useLocation()

  const webhookId = params == null ? null : params.webhookId

  if (webhookId == null || !canUser('update', 'webhooks')) {
    return (
      <PageLayout
        title='Edit webhook'
        navigationButton={{
          onClick: () => {
            setLocation(appRoutes.list.path)
          },
          label: `Webhooks`,
          icon: 'arrowLeft'
        }}
        mode={settings.mode}
      >
        <EmptyState
          title='Not authorized'
          action={
            <Link href={appRoutes.list.path}>
              <Button variant='primary'>Go back</Button>
            </Link>
          }
        />
      </PageLayout>
    )
  }

  if (sdkClient == null) {
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
            navigationButton={{
              onClick: () => {
                setLocation(appRoutes.list.makePath({ webhookId }))
              },
              label: 'Cancel',
              icon: 'x'
            }}
            overlay
          >
            <WebhookForm webhookData={data} />
          </PageLayout>
        )
      }
    </WebhookFormProvider>
  )
}
