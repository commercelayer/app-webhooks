import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import { useWebhookDetails } from '#hooks/useWebhookDetails'
import {
  Button,
  EmptyState,
  ListDetails,
  PageLayout,
  PageSkeleton,
  Spacer,
  Text,
  useCoreSdkProvider,
  useTokenProvider
} from '@commercelayer/app-elements'
import { useCallback, type FC } from 'react'
import { Link, useLocation, useRoute } from 'wouter'

export const WebhookDelete: FC = () => {
  const { settings, canUser } = useTokenProvider()
  const [, params] = useRoute(appRoutes.deleteWebhook.path)
  const [, setLocation] = useLocation()

  const webhookId = params?.webhookId ?? ''
  const { webhook, isLoading } = useWebhookDetails(webhookId)

  const { sdkClient } = useCoreSdkProvider()

  const deleteWebhook = useCallback(async (): Promise<boolean> => {
    return await sdkClient.webhooks
      .delete(webhookId)
      .then(() => true)
      .catch(() => {
        return false
      })
  }, [webhookId])

  if (webhookId == null || !canUser('destroy', 'webhooks')) {
    return (
      <PageLayout
        title='Delete webhook'
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

  return isLoading ? (
    <PageSkeleton layout='details' hasHeaderDescription />
  ) : webhook == null ? (
    <ErrorNotFound />
  ) : (
    <PageLayout
      title={`Permanently delete the ${webhook.name} webhook.`}
      mode={settings.mode}
      navigationButton={{
        onClick: () => {
          setLocation(appRoutes.details.makePath({ webhookId }))
        },
        label: `Cancel`,
        icon: 'x'
      }}
      gap='only-top'
      overlay
    >
      <ListDetails>
        <Spacer bottom='12'>
          <Text variant='info' weight='medium'>
            This action cannot be undone, proceed with caution.
          </Text>
        </Spacer>
        <Button
          variant='danger'
          size='small'
          onClick={(e) => {
            e.stopPropagation()
            deleteWebhook()
              .then(() => {
                setLocation(appRoutes.list.path)
              })
              .catch((e: any) => {
                console.log(e)
              })
          }}
          fullWidth
        >
          Delete webhook
        </Button>
      </ListDetails>
    </PageLayout>
  )
}
