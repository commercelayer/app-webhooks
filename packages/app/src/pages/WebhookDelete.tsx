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

  return isLoading ? (
    <PageSkeleton layout='details' hasHeaderDescription />
  ) : webhook == null ? (
    <ErrorNotFound />
  ) : (
    <PageLayout
      title={`Permanently delete the ${webhook.name as string} webhook.`}
      mode={settings.mode}
      onGoBack={() => {
        setLocation(appRoutes.details.makePath(webhookId))
      }}
    >
      <ListDetails>
        <Spacer bottom='6'>
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
                setLocation(appRoutes.list.makePath())
              })
              .catch((e: any) => {
                console.log(e)
              })
          }}
        >
          Delete webhook
        </Button>
      </ListDetails>
    </PageLayout>
  )
}
