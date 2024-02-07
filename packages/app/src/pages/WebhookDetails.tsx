import { ErrorNotFound } from '#components/ErrorNotFound'
import { WebhookCallback } from '#components/WebhookCallback'
import { WebhookInfos } from '#components/WebhookInfos'
import { WebhookTopCard } from '#components/WebhookTopCard'
import { appRoutes } from '#data/routes'
import { useWebhookDetails } from '#hooks/useWebhookDetails'
import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  EmptyState,
  PageLayout,
  PageSkeleton,
  Spacer,
  useCoreSdkProvider,
  useTokenProvider
} from '@commercelayer/app-elements'
import type { FC } from 'react'
import { Link, useLocation, useRoute } from 'wouter'

export const WebhookDetails: FC = () => {
  const { settings, canUser } = useTokenProvider()
  const { sdkClient } = useCoreSdkProvider()
  const [, params] = useRoute(appRoutes.details.path)
  const [, setLocation] = useLocation()

  const webhookId = params?.webhookId ?? ''
  const { webhook, isLoading } = useWebhookDetails(webhookId)

  if (webhookId == null || !canUser('read', 'webhooks')) {
    return (
      <PageLayout
        title='Webhook details'
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
    return <PageSkeleton layout='details' hasHeaderDescription />
  }

  const contextMenuEdit = canUser('update', 'webhooks') && (
    <DropdownItem
      label='Edit'
      onClick={() => {
        setLocation(appRoutes.editWebhook.makePath({ webhookId }))
      }}
    />
  )

  const contextMenuDivider = canUser('update', 'webhooks') &&
    canUser('destroy', 'webhooks') && <DropdownDivider />

  const contextMenuDelete = canUser('destroy', 'webhooks') && (
    <DropdownItem
      label='Delete'
      onClick={() => {
        setLocation(appRoutes.deleteWebhook.makePath({ webhookId }))
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

  return isLoading ? (
    <PageSkeleton layout='details' hasHeaderDescription />
  ) : webhook == null ? (
    <ErrorNotFound />
  ) : (
    <PageLayout
      title={webhook.name}
      mode={settings.mode}
      navigationButton={{
        onClick: () => {
          setLocation(appRoutes.list.path)
        },
        label: `Webhooks`,
        icon: 'arrowLeft'
      }}
      actionButton={contextMenu}
    >
      <Spacer bottom='12'>
        <WebhookTopCard />
      </Spacer>
      <Spacer bottom='12'>
        <WebhookInfos webhook={webhook} />
      </Spacer>
      <WebhookCallback webhook={webhook} />
    </PageLayout>
  )
}
