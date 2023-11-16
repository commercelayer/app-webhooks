import { WebhookDetailsProvider } from '#components/Details/Provider'
import { WebhookCallbackURL } from '#components/Details/WebhookCallbackURL'
import { WebhookCircuit } from '#components/Details/WebhookCircuit'
import { WebhookDetails } from '#components/Details/WebhookDetails'
import { WebhookSecret } from '#components/Details/WebhookSecret'
import { ErrorNotFound } from '#components/ErrorNotFound'
import { appRoutes } from '#data/routes'
import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  EmptyState,
  PageLayout,
  PageSkeleton,
  Section,
  Spacer,
  useCoreSdkProvider,
  useTokenProvider
} from '@commercelayer/app-elements'
import { Link, useLocation, useRoute } from 'wouter'

const DetailsPage = (): JSX.Element | null => {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [, params] = useRoute(appRoutes.details.path)
  const [, setLocation] = useLocation()

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
    return <PageSkeleton layout='details' hasHeaderDescription />
  }

  const contextMenuEdit = canUser('update', 'webhooks') && (
    <DropdownItem
      label='Edit'
      onClick={() => {
        setLocation(appRoutes.editWebhook.makePath(webhookId))
      }}
    />
  )

  const contextMenuDivider = canUser('update', 'webhooks') &&
    canUser('destroy', 'webhooks') && <DropdownDivider />

  const contextMenuDelete = canUser('destroy', 'webhooks') && (
    <DropdownItem
      label='Delete'
      onClick={() => {
        setLocation(appRoutes.deleteWebhook.makePath(webhookId))
      }}
    />
  )

  const contextMenu = (
    <Dropdown
      dropdownItems={
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
      {({ state: { isLoading, data } }) => {
        const showWebhookCircuit =
          data?.last_event_callbacks != null &&
          data?.last_event_callbacks.length > 0
        return isLoading ? (
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
            {showWebhookCircuit && (
              <Spacer bottom='12'>
                <WebhookCircuit />
              </Spacer>
            )}
            <Spacer bottom='12'>
              <WebhookDetails />
            </Spacer>
            <Section title='Callback'>
              <Spacer top='6' bottom='10'>
                <WebhookCallbackURL />
              </Spacer>
              <Spacer bottom='12'>
                <WebhookSecret />
              </Spacer>
            </Section>
          </PageLayout>
        )
      }}
    </WebhookDetailsProvider>
  )
}

export default DetailsPage
