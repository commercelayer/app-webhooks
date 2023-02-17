import { WebhookDetailsProvider } from '#components/Details/Provider'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import {
  useTokenProvider,
  useCoreSdkProvider,
  PageSkeleton,
  PageLayout,
  Spacer,
  ContextMenu,
  DropdownMenuItem,
  DropdownMenuDivider
} from '@commercelayer/core-app-elements'
import { useLocation, useRoute } from 'wouter'
import { WebhookCallbackURL } from '#components/Details/WebhookCallbackURL'
import { WebhookCircuit } from '#components/Details/WebhookCircuit'
import { WebhookDetails } from '#components/Details/WebhookDetails'
import { WebhookSecret } from '#components/Details/WebhookSecret'

const DetailsPage = (): JSX.Element | null => {
  const { settings } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
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

  const contextMenu = (
    <ContextMenu
      menuItems={
        <>
          <DropdownMenuItem
            label='Edit'
            onClick={() => {
              setLocation(appRoutes.editWebhook.makePath(webhookId))
            }}
          />
          <DropdownMenuDivider />
          <DropdownMenuItem
            label='Delete'
            onClick={() => {
              setLocation(appRoutes.deleteWebhook.makePath(webhookId))
            }}
          />
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
